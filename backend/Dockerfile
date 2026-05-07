FROM python:3.11-slim

WORKDIR /app

# Instalar dependencias del sistema necesarias para pymysql
RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Copiar e instalar dependencias Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código del backend
COPY . .

EXPOSE 8000

# Uvicorn como servidor ASGI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
