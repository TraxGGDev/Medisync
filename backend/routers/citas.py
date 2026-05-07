from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from datetime import datetime
import models
import schemas

router = APIRouter(
    prefix="/citas",
    tags=["Catalogo de citas"]
)

@router.post("/", response_model=schemas.CitaResponse)
def crear_cita(cita: schemas.CitaCreate, db: Session=Depends(get_db)):
    
    #verificar que el doctor existe
    doctor = db.query(models.Doctor).filter(models.Doctor.id == cita.doctor_id).first()
    
    if not doctor:
        raise HTTPException(status_code=404, detail="El doctor no existe")
    
    #verificamos que el paciente exista
    paciente = db.query(models.Paciente).filter(models.Paciente.id == cita.paciente_id).first()
    
    if not paciente:
        raise HTTPException(status_code=404, detail="El paciente no existe")
    
    if not (cita.hora_inicio >= doctor.horario_inicio and cita.hora_fin <= doctor.horario_fin):
        raise HTTPException(status_code=400, detail="Horario no disponible para el doctor")
    
    nueva_cita = models.Cita(
        paciente_id = cita.paciente_id,
        doctor_id = cita.doctor_id,
        fecha = cita.fecha,
        hora_inicio = cita.hora_inicio,
        hora_fin = cita.hora_fin,
        motivo = cita.motivo
    )
    
    db.add(nueva_cita)
    db.commit()
    db.refresh(nueva_cita)
    return nueva_cita


#Obtener todas las citas    
@router.get("/", response_model=list[schemas.CitaResponse])
def obtener_citas(db: Session=Depends(get_db)):
    
    citas= db.query(models.Cita).all()
    
    if not citas:
        raise  HTTPException(status_code=404, detail="No hay citas registradas")
    
    return citas


#obtener cita por la fecha de hoy
@router.get("/hoy", response_model=list[schemas.CitaResponse])
def obtener_citas_hoy(db: Session=Depends(get_db)):
    fecha_hoy = datetime.now().date()
    citas = db.query(models.Cita).filter(models.Cita.fecha == fecha_hoy).all()
    
    if not citas:
        raise HTTPException(status_code=404, detail="No hay citas el dia de hoy")
    
    return citas

#obtener cita por id
@router.get("/{cita_id}", response_model=schemas.CitaResponse)
def obtener_cita(cita_id: int, db:Session=Depends(get_db)):
    
    cita = db.query(models.Cita).filter(models.Cita.id == cita_id).first()
    
    if not cita:
        raise HTTPException(status_code=404, detail="No existe la cita")
    
    return cita

#cambiar status de agendada a cancelada
@router.patch("/{cita_id}/cancelar", response_model=schemas.CitaResponse)
def cancelar_cita(cita_id: int, db: Session=Depends(get_db)):
    
    cita_db = db.query(models.Cita).filter(models.Cita.id == cita_id).first()
    
    if not cita_db:
        raise HTTPException(status_code=404, detail="no se encontró la cita")
    
    if cita_db.estado == "cancelada":
        raise HTTPException(status_code=400, detail="esta cita ya habia sido cancelada")
    
    cita_db.estado = "cancelada"
    db.commit()
    db.refresh(cita_db)
    return cita_db

#modificar una cita
@router.put("/{cita_id}/editar", response_model=schemas.CitaResponse)
def modificar_cita(cita_id:int, cita_actualizada: schemas.CitaUpdate, db: Session=Depends(get_db)):
    
    cita_db = db.query(models.Cita).filter(models.Cita.id == cita_id).first()
    
    if not cita_db:
        raise HTTPException(status_code=404, detail="La cita no existe")
    
    doctor = db.query(models.Doctor).filter(models.Doctor.id == cita_db.doctor_id).first()
    
    
    
    if not (cita_actualizada.hora_inicio >= doctor.horario_inicio and cita_actualizada.hora_fin <= doctor.horario_fin):
        raise HTTPException(status_code=400, detail="Horario no disponible para el doctor")
    
    
    cita_db.fecha = cita_actualizada.fecha
    cita_db.hora_inicio = cita_actualizada.hora_inicio
    cita_db.hora_fin = cita_actualizada.hora_fin
    cita_db.motivo = cita_actualizada.motivo
    
    
    db.commit()
    db.refresh(cita_db)
    return cita_db

#lista de citas filtrado por doctor

@router.get("/{doctor_id}/citas", response_model=list[schemas.CitaResponse])
def obtener_cita_doctor(doctor_id:int, db: Session=Depends(get_db)):
    
    doctor_db = db.query(models.Doctor).filter(models.Doctor.id == doctor_id).first()
    
    if not doctor_db:
        raise HTTPException(status_code=404, detail="No se econtró el doctor")
    
    citas= db.query(models.Cita).filter(models.Cita.doctor_id == doctor_id).all()
    
    return citas

#modificar el status de cada cita
@router.patch("/{cita_id}/estado", response_model= schemas.CitaResponse)
def modificar_estado(cita_id: int, estado_updated: schemas.CitaStatusUpdate, db:Session=Depends(get_db)):
    
    cita_db = db.query(models.Cita).filter(models.Cita.id == cita_id).first()
    
    if not cita_db:
        raise HTTPException(status_code=404, detail="No se encontró la cita")
    
    cita_db.estado = estado_updated.estado
    
    db.commit()
    db.refresh(cita_db)
    return cita_db