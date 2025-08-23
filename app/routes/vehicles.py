from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.models.telemetry import Telemetry
from app.utils.db.get_db import get_db
from app.models.vehicle import Vehicle
from app.schemas.vehicle_schema import VehicleCreate, VehicleRead, VehicleWithTelemetryAndAlerts
from app.schemas.telemetry_schema import TelemetryCreate, TelemetryRead
from app.schemas.alert_schema import AlertRead
from app.models.alert import Alert

router = APIRouter()

@router.post("/", response_model=VehicleRead, status_code=status.HTTP_201_CREATED)
def create_vehicle(vehicle: VehicleCreate, db: Session = Depends(get_db)):
    new_vehicle = Vehicle(**vehicle.model_dump())
    db.add(new_vehicle)
    db.commit()
    db.refresh(new_vehicle)
    return new_vehicle

@router.get("/", response_model=List[VehicleWithTelemetryAndAlerts])
def get_vehicles(db: Session = Depends(get_db)):
    vehicles = db.query(Vehicle).all()
    
    # Dla każdego pojazdu pobierz najnowsze dane telemetrii i alertów
    for vehicle in vehicles:
        # Najnowsza telemetria
        latest_telemetry = db.query(Telemetry).filter(
            Telemetry.vehicle_id == vehicle.id
        ).order_by(desc(Telemetry.timestamp)).first()
        
        if latest_telemetry:
            vehicle.latest_telemetry = {
                "speed": latest_telemetry.speed,
                "coolant_temp": latest_telemetry.coolant_temp,
                "rpm": latest_telemetry.rpm,
                "timestamp": latest_telemetry.timestamp.isoformat()
            }
        
        # Najnowszy alert (nierozwiązany)
        latest_alert = db.query(Alert).filter(
            Alert.vehicle_id == vehicle.id,
            Alert.resolved == False
        ).order_by(desc(Alert.ts)).first()
        
        if latest_alert:
            vehicle.latest_alert = {
                "severity": latest_alert.severity.value,
                "alert_type": latest_alert.alert_type.value,
                "message": latest_alert.message,
                "ts": latest_alert.ts.isoformat()
            }
    
    return vehicles

@router.get("/{id}", response_model=VehicleRead)
def get_vehicle(id: int, db: Session = Depends(get_db)):
    vehicle = db.get(Vehicle, id)
    if vehicle is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found")
    return vehicle

@router.get("/{id}/telemetry", response_model=List[TelemetryRead])
def get_telemetry(id: int, db: Session = Depends(get_db)):
    telemetry_records = db.query(Telemetry).filter(Telemetry.vehicle_id == id).all()
    return telemetry_records

@router.get("/{id}/alerts", response_model=List[AlertRead])
def get_alerts(id: int, db: Session = Depends(get_db)):
    alerts = db.query(Alert).filter(Alert.vehicle_id == id).all()
    return alerts