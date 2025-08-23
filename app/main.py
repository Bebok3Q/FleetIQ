from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import vehicles, telemetry, alerts
from app.utils.db.get_db import engine
from app.models import __init__ as models_init

app = FastAPI(title="FleetIQ API", version="0.1")

# Dodaj middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rejestracja tras
app.include_router(vehicles.router, prefix="/api/vehicles", tags=["vehicles"])
app.include_router(telemetry.router, prefix="/api/telemetry", tags=["telemetry"])
app.include_router(alerts.router, prefix="/api/alerts", tags=["alerts"])

@app.on_event("startup")
def on_startup() -> None:
    # Utwórz tabele jeśli nie istnieją (przydatne w DEV / świeżym środowisku)
    models_init.Base.metadata.create_all(bind=engine)