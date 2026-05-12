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

#buscar pacientes
@router.get("/buscar", response_model=list[schemas.PacienteResponse])
def buscar_paciente(nombre: str, db: Session = Depends(get_db)):
    
    pacientes = db.query(models.Paciente).filter(models.Paciente.nombre.ilike(f"%{nombre}%")).all()
    
    if not pacientes:
        raise HTTPException(status_code=404, detail="No se encontraron pacientes")
    
    return pacientes


#obtener paciente por id
@router.get("/{paciente_id}", response_model=schemas.PacienteResponse)
def obtener_paciente(paciente_id: int, db: Session=Depends(get_db)):
    
    paciente = db.query(models.Paciente).filter(models.Paciente.id == paciente_id).first()
    
    if not paciente:
        raise HTTPException(status_code=404, detail="No se encontró el paciente")
    
    return paciente

#Editar paciente
@router.put("/{paciente_id}/editar", response_model=schemas.PacienteResponse)
def editar_paciente(paciente_id: int, paciente_actualizado: schemas.PacienteUpdate, db: Session=Depends(get_db)):
    
    #verificamos que el paciente exista
    paciente_db = db.query(models.Paciente).filter(models.Paciente.id == paciente_id).first()
    
    if not paciente_db:
        raise HTTPException(status_code=404, detail="El paciente no existe en la base de datos")
    
    paciente_db.nombre = paciente_actualizado.nombre
    paciente_db.telefono = paciente_actualizado.telefono
    
    db.commit()
    db.refresh(paciente_db)
    return paciente_db

#lista de citas filtrado por paciente
@router.get("/{paciente_id}/citas", response_model=list[schemas.CitaResponse])
def obtener_cita_paciente(paciente_id:int, db:Session=Depends(get_db)):
    
    paciente_db = db.query(models.Paciente).filter(models.Paciente.id == paciente_id).first()
    
    if not paciente_db:
        raise HTTPException(status_code=404, detail="El paciente no existe")
    
    citas_paciente = db.query(models.Cita).filter(models.Cita.paciente_id == paciente_id).all()
    
    return citas_paciente