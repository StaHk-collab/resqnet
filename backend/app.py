from flask import Flask, request, jsonify
from flask_cors import CORS # type: ignore
import requests
import geopy.distance # type: ignore
from twilio.rest import Client
from config import TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, MOSIP_AUTH_URL


app = Flask(__name__)
CORS(app)

# Load Configurations
app.config.from_pyfile('config.py')

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# Geolocation Prioritization
def calculate_distance(lat1, lon1, lat2, lon2):
    coords_1 = (lat1, lon1)
    coords_2 = (lat2, lon2)
    return geopy.distance.distance(coords_1, coords_2).km

@app.route('/verify_identity', methods=['POST'])
def verify_identity():
    try:
        # Extract data from the incoming request
        data = request.json
        mosip_id = data.get('mosip_id')
        credentials = data.get('credentials')

        # Validate the input
        if not mosip_id or not credentials:
            return jsonify({"status": "failed", "error": "Missing 'mosip_id' or 'credentials'"}), 400

        # Create the payload for MOSIP authentication API
        auth_payload = {"mosip_id": mosip_id, "credentials": credentials}

        # Make the request to MOSIP authentication API
        response = requests.post(MOSIP_AUTH_URL, json=auth_payload)

        # Check if the MOSIP authentication request was successful
        if response.status_code == 200:
            return jsonify({"status": "verified", "details": response.json()})
        
        # Handle response failure from MOSIP
        return jsonify({"status": "failed", "error": response.json()}), response.status_code

    except requests.RequestException as e:
        # Catch any network-related errors or issues with the request
        return jsonify({"status": "failed", "error": f"Error contacting MOSIP API: {str(e)}"}), 500

    except Exception as e:
        # Catch any other exceptions
        return jsonify({"status": "failed", "error": f"An unexpected error occurred: {str(e)}"}), 500

@app.route('/prioritize_beneficiaries', methods=['POST'])
def prioritize_beneficiaries():
    data = request.json
    aid_center_coords = (data['aid_center_lat'], data['aid_center_lon'])
    beneficiaries = data['beneficiaries']
    for beneficiary in beneficiaries:
        beneficiary['distance'] = calculate_distance(
            aid_center_coords[0], aid_center_coords[1], beneficiary['lat'], beneficiary['lon']
        )
    sorted_beneficiaries = sorted(beneficiaries, key=lambda x: (x['priority'], x['distance']))
    return jsonify(sorted_beneficiaries)

@app.route('/send_sms', methods=['POST'])
def send_sms():
    data = request.json
    phone_number = data['phone_number']
    verification_code = "123456"  # Mock verification code
    try:
        message = client.messages.create(
            body=f"Your verification code is {verification_code}",
            from_=TWILIO_PHONE_NUMBER,
            to=phone_number
        )
        return jsonify({"message_sid": message.sid, "status": "Message Sent!"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)