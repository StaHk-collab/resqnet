# ResQNet - a network focused on rescue and relief

ResQNet is a digital aid distribution platform designed to enhance the delivery of emergency relief, leveraging digital identity verification and geolocation-based beneficiary prioritization. The system integrates with the MOSIP (Modular Open Source Identity Platform) for identity verification and uses OpenRouteService for geolocation-based optimization.

## Features

- Identity Verification: Secure and efficient authentication of beneficiaries via MOSIP.
- Geolocation-based Prioritization: Sorting beneficiaries based on proximity to the aid center.
- SMS Verification: For offline or low-connectivity environments, SMS-based identity verification.
- Real-Time Aid Distribution: Ensures that aid reaches beneficiaries quickly and fairly.
- Extensible: Easily integrates with existing systems like inventory tracking and logistics.


## Tech Stack

- Backend: Python, Flask
- Frontend: React.js
- Geolocation: OpenRouteService API
- SMS: Twilio
- Database: SQLite (for local development)

## Prerequisites
### Backend Setup

- Python (version 3.x)
- Flask for the API server
- Twilio account (for SMS-based verification)
- OpenRouteService API Key (for geolocation)

## Installation
### Backend Setup

#### 1. Clone the repository:
```
git clone https://github.com/StaHk-collab/resqnet.git
cd resqnet/backend
```

#### 2. Set up a virtual environment:
```
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### 3. Install the required Python dependencies:
```
pip install -r requirements.txt
```

#### 4. Configure environment variables:

Create a .env file in the backend directory with the following content:
```
MOSIP_AUTH_URL="https://your-mosip-api-url.com/api/authenticate"
TWILIO_ACCOUNT_SID="your_twilio_account_sid"
TWILIO_AUTH_TOKEN="your_twilio_auth_token"
TWILIO_PHONE_NUMBER="your_twilio_phone_number"
ORS_API_KEY="your_openrouteservice_api_key"
```

#### 5. Run the Flask application:
```
python app.py
```
#### The backend should now be running at http://localhost:5000.

### Frontend Setup

#### 1. Navigate to the frontend directory:
```
cd resqnet/frontend
```

#### 2. Install Node.js dependencies:

Ensure you have Node.js installed, then run:
```
npm install
```

#### 3. Run the React app:
```
npm start
```

#### The frontend should now be running at http://localhost:3000.

## Usage
### Endpoints

#### 1. POST /verify_identity:

Verifies the identity of a beneficiary using MOSIP authentication.

#### Request Body:
```
{
    "mosip_id": "12345",
    "credentials": "test-credentials"
}
```
#### Response:

- Success: Returns a verification status and details of the user.
- Failure: Returns an error message if authentication fails.

#### 2. POST /prioritize_beneficiaries

Prioritizes beneficiaries based on proximity to an aid center and their priority level.

#### Request Body:
```
{
    "aid_center_lat": 37.7749,
    "aid_center_lon": -122.4194,
    "beneficiaries": [
        {"id": 1, "lat": 37.7749, "lon": -122.4194, "priority": 2},
        {"id": 2, "lat": 34.0522, "lon": -118.2437, "priority": 1},
        {"id": 3, "lat": 36.1699, "lon": -115.1398, "priority": 3}
    ]
}
```
#### Response:

- Returns a sorted list of beneficiaries based on distance and priority.

#### 3. POST /send_sms
Sends an SMS to a phone number with a verification code.

#### Request Body:
```
{
    "phone_number": "+1234567890"
}
```
#### Response:
- Returns the SID of the sent message.

## Testing

### 1. Backend Tests:
    To test the backend, you can use Postman or cURL to send requests to the endpoints.

Example cURL for /send_sms:

```
curl --location 'http://localhost:5000/send_sms' \
--header 'Content-Type: application/json' \
--data '{
  "phone_number": "+916370515118"
}'
```

Example cURL for /prioritize_beneficiaries:
```
curl -X POST http://localhost:5000/prioritize_beneficiaries \
-H "Content-Type: application/json" \
-d '{
    "aid_center_lat": 37.7749,
    "aid_center_lon": -122.4194,
    "beneficiaries": [
        {"id": 1, "lat": 37.7749, "lon": -122.4194, "priority": 2},
        {"id": 2, "lat": 34.0522, "lon": -118.2437, "priority": 1},
        {"id": 3, "lat": 36.1699, "lon": -115.1398, "priority": 3}
    ]
}'
```

### 2. Frontend Tests:

- Run the React app (npm start), then use the UI to interact with the endpoints.


## Contributing

We welcome contributions to improve this project! Here's how you can get started:
```
1. Fork the repository.
2. Create a new branch (git checkout -b feature-name).
3. Make your changes.
4. Commit your changes (git commit -am 'Add new feature').
5. Push to your branch (git push origin feature-name).
6. Create a pull request.
```

## License
```
This project is licensed under the MIT License - see the LICENSE file for details.
```

## Acknowledgements
```
MOSIP: Modular Open Source Identity Platform.

OpenRouteService: Provides geolocation and routing services.

Twilio: Used for SMS-based verification.

React: Frontend framework for building the UI.

Flask: Backend framework for the API.
```

## Folder Structure
```
ResQNet/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── config.py
│   └── test/
│       ├── test_app.py
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── services/
│   │       ├── api.js
│   │       └── geolocation.js
│   ├── package.json
│   └── .env
├── docs/
│   ├── README.md
│   └── architecture-diagram.png
└── .gitignore
```