# Configuración de Entornos

Este proyecto ha sido configurado para soportar múltiples entornos de ejecución: Development, Staging y Production.

## Archivos de Entorno

### Backend (`/backend`)
Se han creado los siguientes archivos (ignorados por git):
- `.env.development`: Entorno local. Defaults: `NODE_ENV=development`
- `.env.staging`: Entorno de pruebas. Defaults: `NODE_ENV=staging`
- `.env.production`: Entorno de producción. Defaults: `NODE_ENV=production`

### Frontend (`/frontend`)
Se han creado los siguientes archivos (ignorados por git):
- `.env.development`: `VITE_ENV=development`
- `.env.staging`: `VITE_ENV=staging`
- `.env.production`: `VITE_ENV=production`

## Comandos

### Backend
Para ejecutar el backend en un entorno específico:

```bash
# Desarrollo (default)
npm run start:dev

# Staging
npm run start:staging

# Producción
npm run start:prod
```

### Frontend
Para construir el frontend para un entorno específico:

```bash
# Desarrollo (default)
npm run dev

# Staging
npm run build:staging

# Producción
npm run build:prod
```

## Docker Compose
El archivo `docker-compose.yml` ahora utiliza variables de entorno para secretos. Asegúrate de tener un archivo `.env` en la raíz (o configurar las variables en tu sistema CI/CD) si deseas sobreescribir los valores por defecto.

Variables soportadas:
- `POSTGRES_PASSWORD`
- `DATABASE_URL`
