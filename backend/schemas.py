from pydantic import BaseModel
from datetime import datetime, time


class DoctorCreate(BaseModel):
    nombre:str
    especialidad:str
    horario_inicio: time
    horario_fin: time
    dias_disponibles: str
    
class DoctorResponse(BaseModel):
    id:int
    nombre:str
    especialidad:str
    horario_inicio: time
    horario_fin: time
    dias_disponibles: str
    
    class Config:
        from_attributes=True
        
class PacienteCreate(BaseModel):
    nombre:str
    telefono:str
    numero_seguro:str
    
class PacienteResponse(BaseModel):
    id:int
    nombre:str
    telefono:str
    numero_seguro:str
    
    class Config:
        from_attributes=True

class CitaCreate(BaseModel):
    paciente_id:int
    doctor_id:int
    fecha:datetime
    hora_inicio:time
    hora_fin:time
    motivo:str

class DoctorMini(BaseModel):
    nombre:str
    especialidad:str
    
    class Config:
        from_attributes=True
        
class PacienteMini(BaseModel):
    nombre:str
    
    class Config:
        from_attributes=True
    
class CitaResponse(BaseModel):
    id:int
    fecha:datetime
    hora_inicio:time
    hora_fin:time
    motivo:str
    estado:str
    doctor: DoctorMini
    paciente: PacienteMini
    
    class Config:
        from_attributes=True
    
    
    
    