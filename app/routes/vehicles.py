from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.models.telemetry import Telemetry
from app.utils.db.get_db import get_db
from app.models.vehicle import Vehicle
from app.schemas.vehicle_schema import VehicleCreate, VehicleRead
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

@router.get("/", response_model=List[VehicleRead])
def get_vehicles(db: Session = Depends(get_db)):
    return db.query(Vehicle).all()

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