from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, SessionLocal
import models as models
import schemas as schemas
from routers import doctores, pacientes, citas

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Medisync", version="1.0")

# --- CONFIGURACIÓN CORS---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # url del front
    allow_credentials=True,
    allow_methods=["*"], # Permite GET, POST, PATCH, DELETE
    allow_headers=["*"],
)

app.include_router(doctores.router)
app.include_router(pacientes.router)
app.include_router(citas.router)