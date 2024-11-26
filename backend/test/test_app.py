import pytest # type: ignore
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_verify_identity(client):
    response = client.post('/verify_identity', json={"mosip_id": "12345", "credentials": "test-creds"})
    assert response.status_code in [200, 400]