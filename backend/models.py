from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Time
from sqlalchemy.orm import relationship
from database import Base

class Doctor(Base):
    __tablename__ = "doctores"
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    especialidad=Column(String(100), nullable=False)
    horario_inicio = Column(Time, nullable=False)
    horario_fin = Column(Time, nullable=False)
    dias_disponibles = Column(String(100), nullable=False)
    
    citas = relationship("Cita", back_populates="doctor")
    
class Paciente(Base):
    __tablename__ = "pacientes"
    
    id = Column(Integer,primary_key=True, index=True)
    nombre = Column(String(100), nullable=False, )
    telefono = Column(String(20), nullable=False, unique=True)
    numero_seguro = Column(String(100), nullable=False)
    
    citas = relationship("Cita", back_populates="paciente")
        
class Cita(Base):
    __tablename__ = "citas"
    
    id = Column(Integer, primary_key=True, index=True)
    paciente_id = Column(Integer, ForeignKey("pacientes.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctores.id"), nullable=False)
    fecha= Column(DateTime, nullable=False)
    hora_inicio = Column(Time, nullable=False)
    hora_fin = Column(Time, nullable=False)
    motivo = Column(String(100))
    estado= Column(String(20), default="agendada")
    
    doctor = relationship("Doctor", back_populates="citas")
    paciente = relationship("Paciente", back_populates="citas")