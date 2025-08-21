import logging
from app.models.alert import SeverityEnum

# Minimal log: WARNING: Vehicle 12 overheating

severity_map = {
    SeverityEnum.LOW: logging.INFO,
    SeverityEnum.MEDIUM: logging.WARNING,
    SeverityEnum.HIGH: logging.ERROR,
}

logger = logging.Logger("app.alerts")
logger.setLevel(logging.INFO)

# Zapobiega duplikacji logów
if not logger.handlers:
    # handler kierujący logi na stdout
    console_handler = logging.StreamHandler()
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s', datefmt='%Y-%m-%d %H:%M:%S')
    
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)

def log_with_severity(severity: SeverityEnum, message: str):
    log_level = severity_map.get(severity, logging.INFO)
    logger.log(log_level, message)

def log_alert_created(vehicle_id: int, message: str, severity: SeverityEnum):
    log_with_severity(severity, f"Vehicle {vehicle_id} {message}")
   
def log_alert_resolved(vehicle_id: int, alert_id: int, message: str):
    logger.info(f"Vehicle {vehicle_id} alert resolved: id={alert_id} ({message})")

def log_alert_escalated(vehicle_id: int, old_severity: SeverityEnum, new_severity: SeverityEnum, message: str):
    logger.warning(f"Vehicle {vehicle_id} alert escalated: {old_severity} -> {new_severity} ({message})")