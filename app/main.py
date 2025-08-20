from fastapi import FastAPI
from app.routes import vehicles, telemetry
from app.utils.db.get_db import engine
from app.models import __init__ as models_init

app = FastAPI(title="FleetIQ API", version="0.1")

# Rejestracja tras
app.include_router(vehicles.router, prefix="/vehicles", tags=["vehicles"])
app.include_router(telemetry.router, prefix="/telemetry", tags=["telemetry"])

@app.on_event("startup")
def on_startup() -> None:
    # Utwórz tabele jeśli nie istnieją (przydatne w DEV / świeżym środowisku)
    models_init.Base.metadata.create_all(bind=engine)