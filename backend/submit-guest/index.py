import json
import os
import psycopg2
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def handler(event: dict, context) -> dict:
    """Приём заявок на покупку гостевых билетов на премию Я Бренд ДВ"""
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
    tickets = body.get('tickets', '').strip()

    if not name or not phone or not email or not tickets:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Заполните все обязательные поля'})
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        """INSERT INTO t_p17302868_business_award_landi.guest_applications
           (name, phone, email, tickets)
           VALUES (%s, %s, %s, %s)""",
        (name, phone, email, tickets)
    )
    conn.commit()
    cur.close()
    conn.close()

    smtp_user = 'savkina.tsentr@mail.ru'
    smtp_password = os.environ['MAIL']

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка гостя — «Я Бренд ДВ» от {name}'
    msg['From'] = smtp_user
    msg['To'] = smtp_user

    html = f"""
    <html><body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #C9A84C; border-bottom: 1px solid #C9A84C; padding-bottom: 8px;">
        Новый гость — Я Бренд ДВ
      </h2>
      <table style="width:100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; font-weight: bold; width: 160px;">Имя и фамилия:</td><td style="padding: 8px;">{name}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding: 8px; font-weight: bold;">Телефон:</td><td style="padding: 8px;">{phone}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">{email}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding: 8px; font-weight: bold;">Количество билетов:</td><td style="padding: 8px;">{tickets}</td></tr>
      </table>
      <p style="color: #999; font-size: 12px; margin-top: 24px;">
        Заявка получена автоматически с сайта премии «Я Бренд ДВ»
      </p>
    </body></html>
    """

    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, smtp_user, msg.as_string())

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'success': True})
    }
