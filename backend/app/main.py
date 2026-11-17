from fastapi import FastAPI

app = FastAPI(title="Travel Planner API")


@app.get("/")
def raiz():
    return {"mensaje": "Hola, viajero"}