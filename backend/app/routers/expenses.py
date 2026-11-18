#ISSUE 1 DAVID
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.database import get_session
from app.models import Expense, ExpenseCreate

router = APIRouter(prefix="/trips", tags=["Expenses"])

@router.get("/{trip_id}/expenses", response_model=list[Expense])
def get_expenses(trip_id: int, session: Session = Depends(get_session)):
    gastos = session.exec(select(Expense).where(Expense.trip_id == trip_id)).all()
    return gastos

@router.post("/{trip_id}/expenses", response_model=Expense)
def create_expense(trip_id: int, expense: ExpenseCreate, session: Session = Depends(get_session)):
    expense.trip_id = trip_id
    db_expense = Expense.model_validate(expense)
    session.add(db_expense)
    session.commit()
    session.refresh(db_expense)
    return db_expense

@router.delete("/expenses/{expense_id}")
def delete_expense(expense_id: int, session: Session = Depends(get_session)):
    expense = session.get(Expense, expense_id)
    if not expense:
        raise HTTPException(status_code=404, detail="Gasto no encontrado")
    session.delete(expense)
    session.commit()
    return {"ok": True}