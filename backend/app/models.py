from datetime import date

from sqlmodel import Field, SQLModel


class Trip(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    destination: str
    start_date: date
    end_date: date