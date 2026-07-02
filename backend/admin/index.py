import json
import os
import psycopg2
import urllib.request
from psycopg2.extras import RealDictCursor

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p48458750_bankruptcy_steps_vis')

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Session-Id',
}

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def resp(status, body):
    return {'statusCode': status, 'headers': {**CORS, 'Content-Type': 'application/json'}, 'body': json.dumps(body, ensure_ascii=False, default=str)}

def check_session(headers):
    session = headers.get('x-session-id') or headers.get('X-Session-Id', '')
    return session == 'admin-session-valid'

def handler(event: dict, context) -> dict:
    """Административный API: авторизация, заявки, настройки, статистика."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    path = event.get('path', '/')
    headers = event.get('headers') or {}
    body = {}
    if event.get('body'):
        try:
            body = json.loads(event['body'])
        except Exception:
            pass

    # POST login (path or action)
    if method == 'POST' and (path.endswith('/login') or body.get('_action') == 'login'):
        username = body.get('username', '')
        password = body.get('password', '')
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"SELECT * FROM {SCHEMA}.admin_users WHERE username = %s AND password_hash = %s", (username, password))
        user = cur.fetchone()
        conn.close()
        if user:
            return resp(200, {'ok': True, 'session': 'admin-session-valid'})
        return resp(401, {'ok': False, 'error': 'Неверный логин или пароль'})

    # GET /page/:slug публично (рендер кастомной страницы)
    if method == 'GET' and '/page/' in path:
        slug = path.split('/page/')[-1].strip('/')
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"SELECT * FROM {SCHEMA}.pages WHERE slug = %s AND published = true", (slug,))
        page = cur.fetchone()
        conn.close()
        if not page:
            return resp(404, {'error': 'Страница не найдена'})
        return resp(200, {'page': page})

    # GET /settings публично (для фронтенда сайта)
    if method == 'GET' and (path.endswith('/settings') or path in ('/', '')):
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"SELECT key, value FROM {SCHEMA}.site_settings")
        rows = cur.fetchall()
        conn.close()
        settings = {r['key']: r['value'] for r in rows}
        return resp(200, {'settings': settings})

    # Все остальные запросы требуют авторизации
    if not check_session(headers):
        return resp(401, {'error': 'Не авторизован'})

    # GET leads
    if method == 'GET' and (path.endswith('/leads') or body.get('_action') == 'leads'):
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"SELECT * FROM {SCHEMA}.leads ORDER BY created_at DESC LIMIT 100")
        leads = cur.fetchall()
        conn.close()
        return resp(200, {'leads': leads})

    # PUT /admin/leads/<id>/status — обновить статус заявки
    if method == 'PUT' and '/leads/' in path:
        parts = path.split('/')
        lead_id = next((parts[i+1] for i, p in enumerate(parts) if p == 'leads' and i+1 < len(parts)), None)
        status = body.get('status', 'new')
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"UPDATE {SCHEMA}.leads SET status = %s WHERE id = %s", (status, lead_id))
        conn.commit()
        conn.close()
        return resp(200, {'ok': True})

    # POST /admin/settings — сохранить настройки
    if method == 'POST' and path.endswith('/settings'):
        settings = body.get('settings', {})
        conn = get_conn()
        cur = conn.cursor()
        for key, value in settings.items():
            cur.execute(f"""
                INSERT INTO {SCHEMA}.site_settings (key, value, updated_at)
                VALUES (%s, %s, NOW())
                ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
            """, (key, value))
        conn.commit()
        conn.close()
        return resp(200, {'ok': True})

    # GET /admin/stats — статистика просмотров
    if method == 'GET' and path.endswith('/stats'):
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"SELECT COUNT(*) as total FROM {SCHEMA}.page_views")
        total = cur.fetchone()['total']
        cur.execute(f"""
            SELECT path, COUNT(*) as views
            FROM {SCHEMA}.page_views
            GROUP BY path ORDER BY views DESC LIMIT 10
        """)
        pages = cur.fetchall()
        cur.execute(f"""
            SELECT DATE(viewed_at) as day, COUNT(*) as views
            FROM {SCHEMA}.page_views
            WHERE viewed_at >= NOW() - INTERVAL '14 days'
            GROUP BY day ORDER BY day
        """)
        daily = cur.fetchall()
        cur.execute(f"SELECT COUNT(*) as total FROM {SCHEMA}.leads")
        total_leads = cur.fetchone()['total']
        cur.execute(f"SELECT COUNT(*) as new_leads FROM {SCHEMA}.leads WHERE status = 'new'")
        new_leads = cur.fetchone()['new_leads']
        conn.close()
        return resp(200, {
            'total_views': total,
            'total_leads': total_leads,
            'new_leads': new_leads,
            'pages': pages,
            'daily': daily,
        })

    # POST /admin/track — трекинг просмотра страницы
    if method == 'POST' and path.endswith('/track'):
        page_path = body.get('path', '/')
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"INSERT INTO {SCHEMA}.page_views (path) VALUES (%s)", (page_path,))
        conn.commit()
        conn.close()
        return resp(200, {'ok': True})

    # GET /pages — список всех страниц (для админки)
    if method == 'GET' and path.endswith('/pages'):
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"SELECT id, slug, title, subtitle, published, created_at, updated_at FROM {SCHEMA}.pages ORDER BY created_at DESC")
        pages = cur.fetchall()
        conn.close()
        return resp(200, {'pages': pages})

    # POST /pages — создать страницу
    if method == 'POST' and path.endswith('/pages'):
        slug = body.get('slug', '').strip().lower()
        title = body.get('title', '').strip()
        if not slug or not title:
            return resp(400, {'error': 'slug и title обязательны'})
        slug = ''.join(c if c.isalnum() or c in '-_' else '-' for c in slug).strip('-')
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"""
            INSERT INTO {SCHEMA}.pages (slug, title, subtitle, content, seo_title, seo_description, published)
            VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING *
        """, (slug, title, body.get('subtitle', ''), body.get('content', ''),
              body.get('seo_title', title), body.get('seo_description', ''), body.get('published', True)))
        page = cur.fetchone()
        conn.commit()
        conn.close()
        return resp(200, {'ok': True, 'page': page})

    # PUT /pages/:id — обновить страницу
    if method == 'PUT' and '/pages/' in path:
        parts = path.split('/')
        page_id = next((parts[i+1] for i, p in enumerate(parts) if p == 'pages' and i+1 < len(parts)), None)
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"""
            UPDATE {SCHEMA}.pages SET
              title = %s, subtitle = %s, content = %s,
              seo_title = %s, seo_description = %s,
              published = %s, updated_at = NOW()
            WHERE id = %s RETURNING *
        """, (body.get('title', ''), body.get('subtitle', ''), body.get('content', ''),
              body.get('seo_title', ''), body.get('seo_description', ''),
              body.get('published', True), page_id))
        page = cur.fetchone()
        conn.commit()
        conn.close()
        if not page:
            return resp(404, {'error': 'Страница не найдена'})
        return resp(200, {'ok': True, 'page': page})

    # DELETE /pages/:id — удалить страницу
    if method == 'DELETE' and '/pages/' in path:
        parts = path.split('/')
        page_id = next((parts[i+1] for i, p in enumerate(parts) if p == 'pages' and i+1 < len(parts)), None)
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"DELETE FROM {SCHEMA}.pages WHERE id = %s", (page_id,))
        conn.commit()
        conn.close()
        return resp(200, {'ok': True})

    # POST /bitrix24/webhook — входящий вебхук от Битрикс24 (смена статуса)
    if method == 'POST' and path.endswith('/bitrix24/webhook'):
        event_type = body.get('event', '')
        data = body.get('data', {})
        fields = data.get('FIELDS', {})
        bitrix24_id = str(fields.get('ID', ''))
        new_status = fields.get('STATUS_ID', '') or fields.get('STAGE_ID', '')

        if bitrix24_id and new_status and event_type in ('ONCRMLEAD*', 'ONCRMLEADUPDATE', 'ONCRMDEALUPDATE'):
            conn = get_conn()
            cur = conn.cursor()

            # Читаем маппинг статусов из настроек
            cur2 = conn.cursor()
            cur2.execute(f"SELECT key, value FROM {SCHEMA}.site_settings WHERE key LIKE 'bitrix24_status_map_%'")
            status_map = {r[0].replace('bitrix24_status_map_', ''): r[1] for r in cur2.fetchall()}

            # Находим наш статус по битрикс-статусу
            our_status = None
            for our, b24 in status_map.items():
                if b24 == new_status:
                    our_status = our
                    break

            if our_status:
                cur.execute(
                    f"UPDATE {SCHEMA}.leads SET status = %s, bitrix24_status = %s, bitrix24_synced_at = NOW() WHERE bitrix24_id = %s",
                    (our_status, new_status, bitrix24_id)
                )
                conn.commit()
            conn.close()
        return resp(200, {'ok': True})

    # POST /bitrix24/test — проверить подключение к Битрикс24
    if method == 'POST' and path.endswith('/bitrix24/test'):
        webhook_url = os.environ.get('BITRIX24_WEBHOOK_URL', '').strip()
        if not webhook_url:
            return resp(400, {'ok': False, 'error': 'BITRIX24_WEBHOOK_URL не задан в секретах'})
        try:
            url = webhook_url.rstrip('/') + '/app.info'
            req = urllib.request.Request(url, method='GET')
            with urllib.request.urlopen(req, timeout=8) as r:
                result = json.loads(r.read().decode('utf-8'))
            if result.get('result'):
                return resp(200, {'ok': True, 'portal': result['result'].get('PORTAL_URI', ''), 'description': 'Подключение успешно'})
            return resp(200, {'ok': False, 'error': 'Битрикс24 вернул пустой ответ'})
        except Exception as e:
            return resp(200, {'ok': False, 'error': str(e)})

    # GET /bitrix24/leads — лиды с привязкой к Битрикс24
    if method == 'GET' and path.endswith('/bitrix24/leads'):
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"""
            SELECT id, name, phone, status, bitrix24_id, bitrix24_status, bitrix24_synced_at, created_at
            FROM {SCHEMA}.leads ORDER BY created_at DESC LIMIT 100
        """)
        leads = cur.fetchall()
        conn.close()
        return resp(200, {'leads': leads})

    # POST /bitrix24/sync/:id — вручную повторно отправить заявку в Битрикс24
    if method == 'POST' and '/bitrix24/sync/' in path:
        parts = path.split('/')
        lead_id = next((parts[i+1] for i, p in enumerate(parts) if p == 'sync' and i+1 < len(parts)), None)
        webhook_url = os.environ.get('BITRIX24_WEBHOOK_URL', '').strip()
        if not webhook_url:
            return resp(400, {'ok': False, 'error': 'Webhook не настроен'})
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"SELECT * FROM {SCHEMA}.leads WHERE id = %s", (lead_id,))
        lead = cur.fetchone()
        if not lead:
            conn.close()
            return resp(404, {'error': 'Заявка не найдена'})

        cur2 = conn.cursor()
        cur2.execute(f"SELECT key, value FROM {SCHEMA}.site_settings WHERE key LIKE 'bitrix24_%'")
        settings = {r[0]: r[1] for r in cur2.fetchall()}
        entity = settings.get('bitrix24_entity_type', 'lead')
        source = settings.get('bitrix24_source', 'WEB')
        responsible = settings.get('bitrix24_responsible_id', '').strip()

        title = f"Заявка с сайта — {lead['name'] or lead['phone']}"
        comments = f"Телефон: {lead['phone']}\nИмя: {lead['name']}\nСообщение: {lead['message']}\nID заявки на сайте: {lead['id']}"

        if entity == 'deal':
            method_b24 = 'crm.deal.add'
            fields = {'TITLE': title, 'SOURCE_ID': source, 'COMMENTS': comments, 'PHONE': [{'VALUE': lead['phone'], 'VALUE_TYPE': 'WORK'}]}
        else:
            method_b24 = 'crm.lead.add'
            fields = {'TITLE': title, 'NAME': lead['name'], 'PHONE': [{'VALUE': lead['phone'], 'VALUE_TYPE': 'WORK'}], 'SOURCE_ID': source, 'COMMENTS': comments, 'STATUS_ID': 'NEW'}
        if responsible:
            fields['ASSIGNED_BY_ID'] = responsible

        try:
            url = webhook_url.rstrip('/') + '/' + method_b24
            data = json.dumps({'fields': fields}).encode('utf-8')
            req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'}, method='POST')
            with urllib.request.urlopen(req, timeout=10) as r:
                result = json.loads(r.read().decode('utf-8'))
            bitrix24_id = str(result.get('result', ''))
            cur2.execute(
                f"UPDATE {SCHEMA}.leads SET bitrix24_id = %s, bitrix24_status = 'synced', bitrix24_synced_at = NOW() WHERE id = %s",
                (bitrix24_id, lead_id)
            )
            conn.commit()
            conn.close()
            return resp(200, {'ok': True, 'bitrix24_id': bitrix24_id})
        except Exception as e:
            conn.close()
            return resp(200, {'ok': False, 'error': str(e)})

    return resp(404, {'error': 'Not found'})