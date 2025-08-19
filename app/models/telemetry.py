from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from datetime import datetime
from .__init__ import Base


# id, vehicle_id (FK), timestamp, speed, coolant_temp, rpm

class Telemetry(Base):
    __tablename__ = "telemetry"
    id = Column(Integer, primary_key=True)
    vehicle_id = Column(Integer, ForeignKey('vehicles.id'), nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)
    speed = Column(Integer, nullable=False)
    coolant_temp = Column(Integer, nullable=False)
    rpm = Column(Integer, nullable=False)

    vehicle = relationship("Vehicle", back_populates="telemetry_data")

    def __repr__(self):
        return f"<Telemetry(speed='{self.speed}', rpm='{self.rpm}')>"
