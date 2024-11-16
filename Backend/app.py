from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib

app = Flask(__name__)
CORS(app)  # Allow CORS requests from the React frontend

# Email credentials (replace with your actual credentials)
EMAIL_ADDRESS = "dotcomdevelopers5824@gmail.com"
EMAIL_PASSWORD = "eogfvwcceryjqwbm"

@app.route('/send-emails', methods=['POST'])
def send_emails():
    data = request.json.get('data', [])
    if not data:
        return jsonify({"message": "No data provided"}), 400

    try:
        # Set up the SMTP server
        with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
            smtp.starttls()
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)

            for entry in data:
                email = entry.get('Email')
                subject = entry.get('Subject')
                message = entry.get('Message')

                if email and subject and message:
                    msg = f"Subject: {subject}\n\n{message}"
                    smtp.sendmail(EMAIL_ADDRESS, email, msg)

        return jsonify({"message": "Emails sent successfully!"})

    except Exception as e:
        print("Error:", e)
        return jsonify({"message": "Failed to send emails", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
