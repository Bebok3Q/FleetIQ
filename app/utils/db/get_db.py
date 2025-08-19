from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# URL połączenia z bazą danych.
# Pamiętaj o użyciu zmiennej środowiskowej
# w prawdziwych aplikacjach produkcyjnych.
DATABASE_URL = "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}"

# Tworzenie silnika bazy danych
engine = create_engine(DATABASE_URL)

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