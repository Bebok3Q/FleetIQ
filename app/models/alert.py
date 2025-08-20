from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.types import Enum as SQLAlchemyEnum
from sqlalchemy import ForeignKey
from .__init__ import Base
from datetime import datetime
from enum import Enum

class AlertTypeEnum(str, Enum):
    ENGINE = "Engine"
    BRAKE = "Brake"
    COLLISION = "Collision"
    LOW_FUEL = "Low Fuel"
    LOW_BATTERY = "Low Battery"

class SeverityEnum(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"


class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True)
    vehicle_id = Column(Integer, ForeignKey("vehicles.id", ondelete="CASCADE"), index=True, nullable=False)
    ts = Column(DateTime, nullable=False, index=True, default=datetime.utcnow)
    alert_type = Column(SQLAlchemyEnum(AlertTypeEnum, name="alert_type"), nullable=False)
    severity = Column(SQLAlchemyEnum(SeverityEnum, name="severity"), nullable=False)
    message = Column(String, nullable=False)
    resolved = Column(Boolean, default=False, nullable=False, index=True)

    vehicle = relationship("Vehicle", back_populates="alerts")

    def __repr__(self):
        return f"<Alert(id='{self.id}', vehicle_id='{self.vehicle_id}', alert_type='{self.alert_type}', severity='{self.severity}', resolved='{self.resolved}')>"
