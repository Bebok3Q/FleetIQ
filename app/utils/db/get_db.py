from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

# Budujemy poprawny URL do bazy z zmiennych środowiskowych (preferując DATABASE_URL).
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    postgres_user = os.getenv("POSTGRES_USER", "postgres")
    postgres_password = os.getenv("POSTGRES_PASSWORD", "postgres")
    postgres_db = os.getenv("POSTGRES_DB", "postgres")
    # W kontenerach Docker host bazy to nazwa usługi z docker-compose ("db"), a nie localhost
    postgres_host = os.getenv("POSTGRES_HOST", "db")
    postgres_port = os.getenv("POSTGRES_PORT", "5432")
    DATABASE_URL = f"postgresql://{postgres_user}:{postgres_password}@{postgres_host}:{postgres_port}/{postgres_db}"

# Tworzenie silnika bazy danych
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# Tworzenie klasy SessionLocal. Każda instancja tej klasy będzie nową sesją bazy danych.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """
    Funkcja, która tworzy nową sesję i zamyka ją po użyciu.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()