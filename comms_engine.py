import os
from flask import Flask, request, json
import smtplib
from email.message import EmailMessage

app = Flask(__name__)

# --- SOVEREIGN CONFIGURATION ---
SENDER_EMAIL = "tundetronics@gmail.com"
SENDER_PASSWORD = "your-app-password-here" # Use Google App Password
BRAND_NAME = "Owo-Nexus x Tundetronics"

def send_alliance_welcome(customer_email, customer_name, product_name):
    msg = EmailMessage()
    msg['Subject'] = f"Authentication Successful: Welcome to the {product_name} Alliance"
    msg['From'] = f"{BRAND_NAME} <{SENDER_EMAIL}>"
    msg['To'] = customer_email

    # High-Status Industrial Template
    content = f"""
    Dear {customer_name},

    Your transaction has been verified by the Sovereign Hub. 
    You have successfully secured access to: {product_name}.

    LOGISTICS & FULFILLMENT:
    1. Your digital blueprints are now available in your Success Portal.
    2. A technical auditor will review your Sovereign Audit within 24 hours.
    3. Your credentials are now active for the Master Key Archive.

    We do not just provide services; we engineer sovereignty. 

    Welcome to the Alliance.

    Regards,
    Prince Babatunde Adesina Jalaruru
    Lead Architect | Owo-Nexus x Tundetronics
    """
    msg.set_content(content)

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(SENDER_EMAIL, SENDER_PASSWORD)
            smtp.send_message(msg)
        print(f"SUCCESS: Dispatch sent to {customer_email}")
    except Exception as e:
        print(f"COMM ERROR: {e}")

@app.route('/webhook', methods=['POST'])
def handle_payment_webhook():
    payload = request.get_json()
    
    # Paystack Logic: Check for 'charge.success'
    if payload.get('event') == 'charge.success':
        data = payload['data']
        customer_email = data['customer']['email']
        # Metadata allows us to see what they bought
        product = data.get('metadata', {}).get('project', 'Sovereign Asset')
        
        send_alliance_welcome(customer_email, "Sovereign Partner", product)
        return "Acknowledged", 200

    return "Ignored", 200

if __name__ == '__main__':
    app.run(port=5000)