from pydantic import BaseModel, Field
from datetime import datetime


class TelemetryBase(BaseModel):
    """
    Schemat bazowy z atrybutami wspólnymi.
    """
    speed: int
    coolant_temp: int
    rpm: int


class TelemetryCreate(TelemetryBase):
    """
    Schemat do tworzenia nowego rekordu telemetrycznego.
    """
    vehicle_id: int = Field(..., description="ID of the associated vehicle")


class TelemetryRead(TelemetryBase):
    """
    Schemat do odczytu danych telemetrycznych.
    """
    id: int
    vehicle_id: int
    timestamp: datetime

    class Config:
        from_attributes = True