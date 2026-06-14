import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """Приём заявок на участие в бизнес-премии Я Бренд ДВ"""
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    email = body.get('email', '').strip()
    company = body.get('company', '').strip()
    nomination = body.get('nomination', '').strip()
    about = body.get('about', '').strip()

    if not name or not phone or not email:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': {'error': 'Заполните обязательные поля: имя, телефон, email'}
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        """INSERT INTO t_p17302868_business_award_landi.applications
           (name, phone, email, company, nomination, about)
           VALUES (%s, %s, %s, %s, %s, %s)""",
        (name, phone, email, company, nomination, about)
    )
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': headers,
        'body': {'success': True}
    }