from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, relationship
from .__init__ import Base


class Vehicle(Base):
    __tablename__ = "vehicles"
    id = Column(Integer, primary_key=True)
    vin = Column(String, unique=True, nullable=False)
    model = Column(String, nullable=False)
    odometer = Column(Integer, nullable=False)
    year = Column(Integer, nullable=False)

    telemetry_data = relationship("Telemetry", back_populates="vehicle")
    alerts = relationship("Alert", back_populates="vehicle", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Vehicle(vin='{self.vin}', model='{self.model}')>"

