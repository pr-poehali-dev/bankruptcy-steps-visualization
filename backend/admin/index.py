import json
import os
import psycopg2
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

    # GET /admin/settings — все настройки
    if method == 'GET' and path.endswith('/settings'):
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"SELECT key, value FROM {SCHEMA}.site_settings")
        rows = cur.fetchall()
        conn.close()
        settings = {r['key']: r['value'] for r in rows}
        return resp(200, {'settings': settings})

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

    return resp(404, {'error': 'Not found'})