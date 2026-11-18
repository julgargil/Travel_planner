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

#ISSUE 1 DAVID:
class ExpenseBase(SQLModel):
    description: str
    amount: float
    category: str
    trip_id: int = Field(foreign_key="trip.id")

class Expense(ExpenseBase, table=True):
    id: int | None = Field(default=None, primary_key=True)

class ExpenseCreate(ExpenseBase):
    pass
#FIN