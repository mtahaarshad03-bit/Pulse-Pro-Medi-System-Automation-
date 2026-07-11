from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import re

app = Flask(__name__)
# Production mein '*' ko specific frontend origin se replace karein
CORS(app, resources={r"/api/*": {"origins": "*"}})

# TODO: Apni actual n8n Webhook URL yahan paste karein
N8N_WEBHOOK_URL = "https://tom321.app.n8n.cloud/webhook/4d5366a8-1892-4998-b79b-69d524016d0d"

EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
PHONE_REGEX = r'^\+?[0-9\s\-]{10,15}$'

@app.route('/api/book-appointment', methods=['POST'])
def book_appointment():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "Missing request body"}), 400

        # Required fields extraction
        name = data.get('fullName', '').strip()
        phone = data.get('phone', '').strip()
        email = data.get('email', '').strip()
        doctor = data.get('doctorName', '').strip()
        specialization = data.get('specialization', '').strip()
        date = data.get('appointmentDate', '').strip()
        time = data.get('appointmentTime', '').strip()
        notes = data.get('notes', '').strip()

        # Server-side Validation
        if not all([name, phone, email, doctor, specialization, date, time]):
            return jsonify({"status": "error", "message": "All required fields must be filled."}), 400

        if not re.match(EMAIL_REGEX, email):
            return jsonify({"status": "error", "message": "Invalid email address format."}), 400

        if not re.match(PHONE_REGEX, phone):
            return jsonify({"status": "error", "message": "Invalid phone number format."}), 400

        # Payload building for n8n
        payload = {
            "fullName": name,
            "phone": phone,
            "email": email,
            "doctorName": doctor,
            "specialization": specialization,
            "appointmentDate": date,
            "appointmentTime": time,
            "notes": notes if notes else "No additional notes provided."
        }

        # Forwarding to n8n workflow
        response = requests.post(N8N_WEBHOOK_URL, json=payload, timeout=10)

        if response.status_code in [200, 201]:
            return jsonify({
                "status": "success",
                "message": "Appointment successfully routed and scheduled via automated workflow."
            }), 200
        else:
            return jsonify({
                "status": "error",
                "message": f"Automation engine responded with an error status: {response.status_code}"
            }), 502

    except requests.exceptions.Timeout:
        return jsonify({"status": "error", "message": "Automation gateway timeout. Please try again."}), 504
    except Exception as e:
        return jsonify({"status": "error", "message": f"Internal Server Error: {str(e)}"}), 500

if __name__ == '__main__':
    # Development mode setup
    app.run(host='0.0.0.0', port=5000, debug=True)