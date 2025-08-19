from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.utils.db.get_db import get_db
from app.models.telemetry import Telemetry
from app.schemas.telemetry_schema import TelemetryCreate

router = APIRouter()

@router.post("/", response_model=TelemetryCreate)
def create_telemetry(telemetry: TelemetryCreate, db: Session = Depends(get_db)):
    new_telemetry = Telemetry(telemetry.model_dump())
    # new_telemetry = Vehicle(**vehicle.dict())
    db.add(new_telemetry)
    db.commit()
    db.refresh(new_telemetry)
    return new_telemetry