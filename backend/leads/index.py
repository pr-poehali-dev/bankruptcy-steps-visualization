import json
import os
import psycopg2
import urllib.request

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p48458750_bankruptcy_steps_vis')

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}

def ok_resp(body):
    return {'statusCode': 200, 'headers': {**CORS, 'Content-Type': 'application/json'}, 'body': json.dumps(body, ensure_ascii=False)}

def err_resp(status, msg):
    return {'statusCode': status, 'headers': {**CORS, 'Content-Type': 'application/json'}, 'body': json.dumps({'ok': False, 'error': msg}, ensure_ascii=False)}


def get_settings(conn):
    cur = conn.cursor()
    cur.execute(f"SELECT key, value FROM {SCHEMA}.site_settings WHERE key LIKE 'bitrix24_%'")
    return {r[0]: r[1] for r in cur.fetchall()}


def send_to_bitrix24(webhook_url, settings, lead_id, name, phone, message):
    """Создаёт лид или сделку в Битрикс24 и возвращает ID созданной записи."""
    entity = settings.get('bitrix24_entity_type', 'lead')
    source = settings.get('bitrix24_source', 'WEB')
    responsible = settings.get('bitrix24_responsible_id', '').strip()

    title = f'Заявка с сайта — {name or phone}'
    comments = f'Телефон: {phone}\nИмя: {name}\nСообщение: {message}\nID заявки на сайте: {lead_id}'

    if entity == 'deal':
        method = 'crm.deal.add'
        fields = {
            'TITLE': title,
            'SOURCE_ID': source,
            'COMMENTS': comments,
            'PHONE': [{'VALUE': phone, 'VALUE_TYPE': 'WORK'}],
        }
        if responsible:
            fields['ASSIGNED_BY_ID'] = responsible
    else:
        method = 'crm.lead.add'
        fields = {
            'TITLE': title,
            'NAME': name,
            'PHONE': [{'VALUE': phone, 'VALUE_TYPE': 'WORK'}],
            'SOURCE_ID': source,
            'COMMENTS': comments,
            'STATUS_ID': 'NEW',
        }
        if responsible:
            fields['ASSIGNED_BY_ID'] = responsible

    url = webhook_url.rstrip('/') + '/' + method
    data = json.dumps({'fields': fields}).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'}, method='POST')
    with urllib.request.urlopen(req, timeout=10) as r:
        result = json.loads(r.read().decode('utf-8'))
    return str(result.get('result', ''))


def notify_bitrix24(webhook_url, bitrix24_id, entity_type, name, phone):
    """Отправляет уведомление в чат Битрикс24 (im.notify.system.add)."""
    text = f'📩 Новая заявка с сайта!\nИмя: {name or "—"}\nТелефон: {phone}'
    url = webhook_url.rstrip('/') + '/im.notify.system.add'
    data = json.dumps({'MESSAGE': text}).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'}, method='POST')
    try:
        urllib.request.urlopen(req, timeout=5)
    except Exception:
        pass  # уведомление — не критично


def handler(event: dict, context) -> dict:
    """Сохранение заявки с формы обратной связи + интеграция с Битрикс24."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    body = {}
    if event.get('body'):
        try:
            body = json.loads(event['body'])
        except Exception:
            pass

    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    message = body.get('message', '').strip()

    if not phone:
        return err_resp(400, 'Телефон обязателен')

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    # Сохраняем заявку в БД
    cur.execute(
        f"INSERT INTO {SCHEMA}.leads (name, phone, message) VALUES (%s, %s, %s) RETURNING id",
        (name, phone, message)
    )
    lead_id = cur.fetchone()[0]
    conn.commit()

    # Интеграция с Битрикс24
    webhook_url = os.environ.get('BITRIX24_WEBHOOK_URL', '').strip()
    settings = get_settings(conn)
    bitrix24_enabled = settings.get('bitrix24_enabled', 'false') == 'true'

    if webhook_url and bitrix24_enabled:
        try:
            bitrix24_id = send_to_bitrix24(webhook_url, settings, lead_id, name, phone, message)
            cur.execute(
                f"UPDATE {SCHEMA}.leads SET bitrix24_id = %s, bitrix24_synced_at = NOW() WHERE id = %s",
                (bitrix24_id, lead_id)
            )
            conn.commit()
            notify_bitrix24(webhook_url, bitrix24_id, settings.get('bitrix24_entity_type', 'lead'), name, phone)
        except Exception as e:
            # Ошибка интеграции не должна ломать сохранение заявки
            cur.execute(
                f"UPDATE {SCHEMA}.leads SET bitrix24_status = %s WHERE id = %s",
                (f'error: {str(e)[:200]}', lead_id)
            )
            conn.commit()

    conn.close()
    return ok_resp({'ok': True, 'id': lead_id})
