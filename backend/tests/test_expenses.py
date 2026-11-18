#ISSUE 2 DAVID
def test_crud_expenses(client):
    # 1. Crear un viaje falso para poder asignarle gastos
    trip_data = {
        "title": "Viaje a Tokio",
        "destination": "Japón",
        "start_date": "2026-12-24",
        "end_date": "2026-12-27"
    }
    response_trip = client.post("/trips/", json=trip_data)
    trip_id = response_trip.json()["id"]

    # 2. Crear un gasto asociado a ese viaje
    expense_data = {
        "description": "Vuelo Tigerair",
        "amount": 420.0,
        "category": "Transporte",
        "trip_id": trip_id
    }
    response_post = client.post(f"/trips/{trip_id}/expenses", json=expense_data)
    assert response_post.status_code == 200
    expense_id = response_post.json()["id"]

    # 3. Leer los gastos del viaje
    response_get = client.get(f"/trips/{trip_id}/expenses")
    assert response_get.status_code == 200
    assert len(response_get.json()) == 1
    assert response_get.json()[0]["amount"] == 420.0

    # 4. Comprobar los totales
    response_totals = client.get(f"/trips/{trip_id}/expenses/totals")
    assert response_totals.status_code == 200
    assert response_totals.json()["Total"] == 420.0
    assert response_totals.json()["Transporte"] == 420.0

    # 5. Borrar el gasto
    response_delete = client.delete(f"/trips/expenses/{expense_id}")
    assert response_delete.status_code == 200
    
    # 6. Comprobar que se ha borrado
    response_get_after = client.get(f"/trips/{trip_id}/expenses")
    assert len(response_get_after.json()) == 0