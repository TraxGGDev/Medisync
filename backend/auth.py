from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hashear_password(password: str):
    return pwd_context.hash(password)

def verificar_password(password: str, hash: str):
    return pwd_context.verify(password, hash)

def crear_token(data: dict):
    datos = data.copy()
    expiracion = datetime.utcnow() + timedelta(hours=8)
    datos.update({"exp": expiracion})
    return jwt.encode(datos, SECRET_KEY, algorithm=ALGORITHM)