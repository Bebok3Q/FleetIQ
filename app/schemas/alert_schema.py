from pydantic import BaseModel, Field
from datetime import datetime
from app.models.alert import AlertTypeEnum, SeverityEnum

class AlertBase(BaseModel):
    """
    Schemat bazowy z atrybutami wspólnymi.
    """
    alert_type: AlertTypeEnum
    severity: SeverityEnum
    message: str
    resolved: bool = False

class AlertCreate(AlertBase):
    """
    Schemat do tworzenia nowego alertu.
    """
    vehicle_id: int = Field(..., description="ID of the associated vehicle")

class AlertRead(AlertBase):
    """
    Schemat do odczytu alertu.
    """
    id: int
    vehicle_id: int
    ts: datetime
    
    class Config:
        from_attributes = True