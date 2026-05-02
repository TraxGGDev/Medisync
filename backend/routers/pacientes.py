from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas

router = APIRouter(
    prefix="/pacientes",
    tags=["Catalogo de pacientes"]
)

#registrar un nuevo paciente
@router.post("/", response_model=schemas.PacienteResponse)
def crear_paciente(paciente: schemas.PacienteCreate, db: Session=Depends(get_db)):
    
    nuevo_paciente = models.Paciente(
        nombre = paciente.nombre,
        telefono = paciente.telefono,
        numero_seguro = paciente.numero_seguro
    )
    
    db.add(nuevo_paciente)
    db.commit()
    db.refresh(nuevo_paciente)
    return nuevo_paciente

#obtener lista de pacientes
@router.get("/", response_model=list[schemas.PacienteResponse])
def obtener_pacientes(db: Session=Depends(get_db)):
    
    pacientes = db.query(models.Paciente).all()
    
    return pacientes

#obtener paciente por id
@router.get("/{paciente_id}", response_model=schemas.PacienteResponse)
def obtener_paciente(paciente_id: int, db: Session=Depends(get_db)):
    
    paciente = db.query(models.Paciente).filter(models.Paciente.id == paciente_id).first()
    
    if not paciente:
        raise HTTPException(status_code=404, detail="No se encontró el paciente")
    
    return paciente
