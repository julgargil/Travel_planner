# 🧳 Travel Planner

Planificador de viajes: itinerario, tareas, gastos y documentos en un solo sitio.

Proyecto de Ingeniería del Software · Universidad de Sevilla · Curso 26/27

## Estructura
- `backend/` — API con FastAPI + SQLite
- `frontend/` — aplicación React + Vite

//ISSUE 5 DAVID(decir a julia que revise esto)
## 🚀 Cómo arrancar el proyecto en desarrollo local

Este proyecto está dividido en dos partes: el Backend (API) y el Frontend (UI). Para ejecutarlo en tu ordenador sin Docker, necesitas abrir **dos terminales diferentes**.

### 1. Levantar el Backend (FastAPI + SQLite)
Abre una terminal en la raíz del proyecto y ejecuta:

```bash
cd backend
python -m venv venv
# En Windows:
venv\Scripts\activate
# En Mac/Linux:
# source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload