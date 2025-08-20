from fastapi import status


def create_vehicle(client, vin: str = "VINFORTELEMETRY12") -> int:
    payload = {"vin": vin, "model": "Model Z", "odometer": 10, "year": 2020}
    resp = client.post("/vehicles/", json=payload)
    assert resp.status_code == status.HTTP_201_CREATED
    return resp.json()["id"]


def test_create_telemetry_and_list_for_vehicle(client):
    vehicle_id = create_vehicle(client)

    telemetry_payload = {
        "vehicle_id": vehicle_id,
        "speed": 80,
        "coolant_temp": 90,
        "rpm": 2500,
    }

    # Create telemetry
    resp = client.post("/telemetry/", json=telemetry_payload)
    assert resp.status_code == status.HTTP_201_CREATED
    created = resp.json()
    assert created["vehicle_id"] == vehicle_id
    assert created["id"] > 0

    # List telemetry for vehicle
    resp = client.get(f"/vehicles/{vehicle_id}/telemetry")
    assert resp.status_code == status.HTTP_200_OK
    items = resp.json()
    assert isinstance(items, list)
    assert len(items) == 1
    assert items[0]["vehicle_id"] == vehicle_id

