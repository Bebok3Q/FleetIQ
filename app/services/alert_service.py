from sqlalchemy.orm import Session
from app.schemas.telemetry_schema import TelemetryCreate
from app.models.alert import Alert, AlertTypeEnum, SeverityEnum
from app.utils.logger import log_alert_created, log_alert_resolved, log_with_severity, log_alert_escalated




def _severity_rank(severity: SeverityEnum) -> int:
    order = {
        SeverityEnum.LOW: 1,
        SeverityEnum.MEDIUM: 2,
        SeverityEnum.HIGH: 3,
    }
    return order[severity]


def check_alerts(vehicle_id: int, telemetry: TelemetryCreate | dict, db: Session) -> list[Alert]:
    # Ujednolicenie formatu wejściowego
    if isinstance(telemetry, TelemetryCreate):
        data = telemetry.model_dump()
    elif isinstance(telemetry, dict):
        data = telemetry
    else:
        raise ValueError("telemetry must be TelemetryCreate or dict")

    new_alerts: list[Alert] = []

    # Definicje reguł: (warunek, alert_type, severity, message)
    rules = [
        (lambda d: d.get("coolant_temp") is not None and d.get("coolant_temp") > 100, AlertTypeEnum.ENGINE, SeverityEnum.HIGH, "Overheating engine"),
        (lambda d: d.get("rpm") is not None and d.get("rpm") > 6000, AlertTypeEnum.ENGINE, SeverityEnum.HIGH, "High engine RPM"),
        (lambda d: d.get("speed") is not None and d.get("speed") > 140, AlertTypeEnum.ENGINE, SeverityEnum.MEDIUM, "Overspeed detected"),
    ]

    for predicate, alert_type, severity, message in rules:
        if not predicate(data):
            continue

        # Sprawdź, czy istnieje już nierozwiązany alert dla tej reguły
        existing = (
            db.query(Alert)
            .filter(
                Alert.vehicle_id == vehicle_id,
                Alert.alert_type == alert_type,
                Alert.message == message,
                Alert.resolved.is_(False),
            )
            .first()
        )

        if existing is not None:
            # Eskalacja severity tylko w górę
            if _severity_rank(severity) > _severity_rank(existing.severity):
                old_severity = existing.severity
                existing.severity = severity

                log_message = f"Vehicle {vehicle_id} alert escalated: {old_severity} -> {existing.severity} ({message})"
                log_alert_escalated(existing.severity, log_message)
            continue

        # Utwórz nowy alert, nie dodawaj do sesji tutaj (caller zarządza transakcją)
        new_alerts.append(
            Alert(
                vehicle_id=vehicle_id,
                alert_type=alert_type,
                severity=severity,
                message=message,
            )
        )
        log_message = f"Vehicle {vehicle_id} {message}"
        log_alert_created(vehicle_id, message, severity)

    return new_alerts


def resolve_alert(alert_id: int, db: Session) -> Alert:
    alert = db.query(Alert).filter(Alert.id == alert_id).first()

    if alert is None:
        raise ValueError("Alert not found")
    if alert.resolved:
        return alert
    alert.resolved = True
    log_message = f"Alert resolved: id={alert_id}"
    log_alert_resolved(alert.vehicle_id, alert_id, alert.message)
    return alert