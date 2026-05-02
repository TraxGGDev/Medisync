from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas

router = APIRouter(
    prefix="/doctores",
    tags=["Catalogo de doctores"]
)

#Registrar un nuevo doctor

@router.post("/", response_model=schemas.DoctorResponse)
def crear_doctor(doctor: schemas.DoctorCreate, db: Session = Depends(get_db)):
    
    nuevo_doctor = models.Doctor(
        nombre=doctor.nombre,
        especialidad= doctor.especialidad,
        horario_inicio=doctor.horario_inicio,
        horario_fin=doctor.horario_fin,
        dias_disponibles= doctor.dias_disponibles
        
    )
    
    db.add(nuevo_doctor)
    db.commit()
    db.refresh(nuevo_doctor)
    return nuevo_doctor

#obtener lista de doctores ya registrados
@router.get("/", response_model=list[schemas.DoctorResponse])
def obtener_doctores(db: Session= Depends(get_db)):
    
    doctores = db.query(models.Doctor).all()
    if not doctores:
        raise HTTPException(status_code=404, detail="Aun no hay doctores registrados")
        
    return doctores

#obtener doctor por id
@router.get("/{doctor_id}", response_model=schemas.DoctorResponse)
def obtener_doctor(doctor_id:int,db:Session=Depends(get_db)):
    
    doctor= db.query(models.Doctor).filter(models.Doctor.id == doctor_id).first()
    
    if not doctor:
        raise HTTPException(status_code=404, detail="El doctor no existe")
    
    return doctor


    
    