from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.utils.db.get_db import get_db
from app.models.telemetry import Telemetry
from app.schemas.telemetry_schema import TelemetryCreate, TelemetryRead

router = APIRouter()

@router.post("/", response_model=TelemetryRead, status_code=status.HTTP_201_CREATED)
def create_telemetry(telemetry: TelemetryCreate, db: Session = Depends(get_db)):
    new_telemetry = Telemetry(**telemetry.model_dump())
    db.add(new_telemetry)
    db.commit()
    db.refresh(new_telemetry)
    return new_telemetry