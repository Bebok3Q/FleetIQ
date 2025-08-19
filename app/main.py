from fastapi import FastAPI
from app.routes import vehicles, telemetry

app = FastAPI(title="FleetIQ API", version="0.1")

# Rejestracja tras
app.include_router(vehicles.router, prefix="/vehicles", tags=["vehicles"])
app.include_router(telemetry.router, prefix="/telemetry", tags=["telemetry"])