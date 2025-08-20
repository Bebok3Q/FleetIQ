from fastapi import status


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

