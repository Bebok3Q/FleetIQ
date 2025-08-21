from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.alert_schema import AlertRead
from app.models.alert import Alert
from sqlalchemy.orm import Session
from app.utils.db.get_db import get_db
from app.services.alert_service import resolve_alert

router = APIRouter()

@router.post("/resolve/{id}", response_model=AlertRead)
def alert_resolve(id: int, db: Session = Depends(get_db)):
    # Remember to commit to the db !
    try:
        alert = resolve_alert(id, db)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Alert not found")
    db.commit()
    db.refresh(alert)
    return alert
