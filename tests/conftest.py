import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from fastapi.testclient import TestClient

from app.main import app
from app.utils.db.get_db import get_db as real_get_db
from app.models import __init__ as models_init
from app.models import vehicle as vehicle_model  # ensure mappers are imported
from app.models import telemetry as telemetry_model  # ensure mappers are imported


# In-memory SQLite shared across threads
testing_engine = create_engine(
    "sqlite://",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=testing_engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture(autouse=True)
def setup_and_teardown_db():
    # Prevent app startup hook from touching the real DB engine
    app.router.on_startup.clear()
    # Fresh schema for every test
    models_init.Base.metadata.drop_all(bind=testing_engine)
    models_init.Base.metadata.create_all(bind=testing_engine)
    yield
    models_init.Base.metadata.drop_all(bind=testing_engine)


@pytest.fixture()
def client():
    app.dependency_overrides[real_get_db] = override_get_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


