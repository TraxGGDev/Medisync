# ── Etapa 1: Build ──────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependencias primero para aprovechar cache de Docker
COPY package*.json ./
RUN npm ci

# Copiar el resto del código
COPY . .

# Build de producción
# VITE_USE_MOCK_API=false para conectar al backend real en producción
ARG VITE_API_URL=http://localhost:8000
ARG VITE_USE_MOCK_API=false
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_USE_MOCK_API=$VITE_USE_MOCK_API

RUN npm run build

# ── Etapa 2: Servidor Nginx ──────────────────────────────────────
FROM nginx:alpine

# Copiar el build al directorio de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuración de Nginx para React Router (SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
