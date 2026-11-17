from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from app.database import get_session
from app.models import Trip, TripCreate

router = APIRouter(prefix="/trips", tags=["Viajes"])


def comprobar_fechas(datos: TripCreate):
    if datos.end_date < datos.start_date:
        raise HTTPException(status_code=422, detail="La fecha de fin no puede ser anterior a la de inicio")


def obtener_o_404(session: Session, trip_id: int) -> Trip:
    trip = session.get(Trip, trip_id)
    if not trip:
        raise HTTPException(status_code=404, detail="Viaje no encontrado")
    return trip


@router.get("", response_model=list[Trip])
def listar_viajes(session: Session = Depends(get_session)):
    return session.exec(select(Trip)).all()


@router.get("/{trip_id}", response_model=Trip)
def obtener_viaje(trip_id: int, session: Session = Depends(get_session)):
    return obtener_o_404(session, trip_id)


@router.post("", response_model=Trip, status_code=201)
def crear_viaje(datos: TripCreate, session: Session = Depends(get_session)):
    comprobar_fechas(datos)
    trip = Trip.model_validate(datos)
    session.add(trip)
    session.commit()
    session.refresh(trip)
    return trip


@router.put("/{trip_id}", response_model=Trip)
def editar_viaje(trip_id: int, datos: TripCreate, session: Session = Depends(get_session)):
    comprobar_fechas(datos)
    trip = obtener_o_404(session, trip_id)
    trip.sqlmodel_update(datos.model_dump())
    session.add(trip)
    session.commit()
    session.refresh(trip)
    return trip


@router.delete("/{trip_id}", status_code=204)
def borrar_viaje(trip_id: int, session: Session = Depends(get_session)):
    trip = obtener_o_404(session, trip_id)
    session.delete(trip)
    session.commit()