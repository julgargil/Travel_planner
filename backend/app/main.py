from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.routers import trips

from app import models  # noqa: F401  (importa los modelos para que se creen sus tablas)
from app.database import create_db_and_tables


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(title="Travel Planner API", lifespan=lifespan)
app.include_router(trips.router)


@app.get("/")
def raiz():
    return {"mensaje": "Hola, viajero"}