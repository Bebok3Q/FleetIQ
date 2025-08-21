from fastapi import status

from app.models import vehicle


def test_create_and_list_vehicles(client):
    payload = {
        "vin": "TESTVIN123456789",
        "model": "Model X",
        "odometer": 1000,
        "year": 2024,
    }

    # Create
    resp = client.post("/vehicles/", json=payload)
    assert resp.status_code == status.HTTP_201_CREATED
    created = resp.json()
    assert created["vin"] == payload["vin"]
    assert created["id"] > 0

    # List
    resp = client.get("/vehicles/")
    assert resp.status_code == status.HTTP_200_OK
    items = resp.json()
    assert isinstance(items, list)
    assert len(items) == 1
    assert items[0]["vin"] == payload["vin"]


def test_get_vehicle_by_id(client):
    payload = {
        "vin": "TESTVIN987654321",
        "model": "Model Y",
        "odometer": 500,
        "year": 2023,
    }
    created = client.post("/vehicles/", json=payload).json()
    vehicle_id = created["id"]

    resp = client.get(f"/vehicles/{vehicle_id}")
    assert resp.status_code == status.HTTP_200_OK
    data = resp.json()
    assert data["id"] == vehicle_id
    assert data["vin"] == payload["vin"]


def test_get_vehicle_not_found(client):
    resp = client.get("/vehicles/9999")
    assert resp.status_code == status.HTTP_404_NOT_FOUND


def test_check_alerts(client):
    payload = {
        "vin": "TESTVIN9876543210",
        "model": "Model YZZ",
        "odometer": 300,
        "year": 2002,
    }
    created = client.post("/vehicles/", json=payload).json()
    vehicle_id = int(created["id"])
    resp = client.get(f"/vehicles/{vehicle_id}/alerts")
    assert resp.status_code == status.HTTP_200_OK
    data = resp.json()
    assert len(data) == 0

    # Generate alerts
    payload_alerts = {
        "vehicle_id": vehicle_id,
        "speed": 150,
        "coolant_temp": 200,
        "rpm": 7000
    }
    tele_alert = client.post("/telemetry/", json=payload_alerts)
    assert tele_alert.status_code == status.HTTP_201_CREATED
    resp_alert = client.get(f"/vehicles/{vehicle_id}/alerts")
    assert resp_alert.status_code == status.HTTP_200_OK
    data = resp_alert.json()
    assert isinstance(data, list)
    assert len(data) == 3
    required_keys = {"id", "vehicle_id", "ts", "alert_type", "severity", "message", "resolved"}
    for alert in data:
        assert required_keys.issubset(alert.keys())
        assert alert["vehicle_id"] == vehicle_id
        assert alert["resolved"] is False

    expected_messages = {"Overheating engine", "High engine RPM", "Overspeed detected"}
    assert {a["message"] for a in data} == expected_messages
