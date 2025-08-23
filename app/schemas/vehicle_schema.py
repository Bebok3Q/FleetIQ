from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class VehicleBase(BaseModel):
    """
    Schemat bazowy z atrybutami wspólnymi.
    """
    vin: str = Field(..., max_length=17, description="Vehicle Identification Number")
    model: str
    odometer: int
    year: int


class VehicleCreate(VehicleBase):
    """
    Schemat do tworzenia nowego pojazdu.
    """
    pass


class VehicleRead(VehicleBase):
    """
    Schemat do odczytu danych pojazdu, z dodatkowym polem 'id'.
    """
    id: int

    class Config:
        from_attributes = True


class VehicleWithTelemetryAndAlerts(VehicleBase):
    """
    Schemat do odczytu pojazdu z najnowszymi danymi telemetrii i alertów.
    """
    id: int
    latest_telemetry: Optional[dict] = None
    latest_alert: Optional[dict] = None

    class Config:
        from_attributes = True