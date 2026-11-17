from datetime import date

from sqlmodel import Field, SQLModel


class TripBase(SQLModel):
    title: str
    destination: str
    start_date: date
    end_date: date


class Trip(TripBase, table=True):
    id: int | None = Field(default=None, primary_key=True)


class TripCreate(TripBase):
    pass