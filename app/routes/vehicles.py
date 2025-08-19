from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.utils.db.get_db import get_db
from app.models.vehicle import Vehicle
from app.schemas.vehicle_schema import VehicleCreate

router = APIRouter()

@router.post("/", response_model=VehicleCreate)
def create_vehicle(vehicle: VehicleCreate, db: Session = Depends(get_db)):
    new_vehicle = Vehicle(vehicle.model_dump())
    # new_vehicle = Vehicle(**vehicle.dict())
    db.add(new_vehicle)
    db.commit()
    db.refresh(new_vehicle)
    return new_vehicle