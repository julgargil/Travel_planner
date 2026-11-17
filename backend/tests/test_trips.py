VIAJE = {
    "title": "Japón en Navidad",
    "destination": "Tokio",
    "start_date": "2026-12-24",
    "end_date": "2026-12-27",
}


def test_crear_viaje(client):
    respuesta = client.post("/trips", json=VIAJE)
    assert respuesta.status_code == 201
    datos = respuesta.json()
    assert datos["id"] is not None
    assert datos["title"] == "Japón en Navidad"


def test_listar_viajes(client):
    client.post("/trips", json=VIAJE)
    client.post("/trips", json={**VIAJE, "title": "Lisboa"})
    respuesta = client.get("/trips")
    assert respuesta.status_code == 200
    assert len(respuesta.json()) == 2


def test_obtener_viaje_inexistente_da_404(client):
    respuesta = client.get("/trips/99")
    assert respuesta.status_code == 404


def test_fechas_invertidas_da_422(client):
    respuesta = client.post("/trips", json={**VIAJE, "end_date": "2026-12-20"})
    assert respuesta.status_code == 422


def test_editar_viaje(client):
    trip_id = client.post("/trips", json=VIAJE).json()["id"]
    respuesta = client.put(f"/trips/{trip_id}", json={**VIAJE, "title": "Japón 2.0"})
    assert respuesta.status_code == 200
    assert respuesta.json()["title"] == "Japón 2.0"


def test_borrar_viaje(client):
    trip_id = client.post("/trips", json=VIAJE).json()["id"]
    assert client.delete(f"/trips/{trip_id}").status_code == 204
    assert client.get(f"/trips/{trip_id}").status_code == 404