from pydantic import BaseModel, Field


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