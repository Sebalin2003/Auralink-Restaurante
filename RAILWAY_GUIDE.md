# Guía de Despliegue en Railway

Esta aplicación está lista para ser desplegada en Railway utilizando su estructura de monorepo.

## Estrategia de Despliegue

La mejor estrategia es crear **2 servicios separados** en Railway (uno para Frontend y otro para Backend) dentro del mismo proyecto, compartiendo una base de datos PostgreSQL.

### 1. Base de Datos (PostgreSQL)
1.  En tu Dashboard de Railway, crea un `New Project` > `Provision PostgreSQL`.
2.  Copia la `DATABASE_URL` (Variables de entorno).

### 2. Backend (NestJS)
1.  Crea un `New Service` > `GitHub Repo`.
2.  Selecciona este repositorio.
3.  Ve a **Settings** > **Root Directory** y pon `/backend`.
4.  Ve a **Variables**:
    *   `DATABASE_URL`: Pega la URL de tu base de datos de Railway.
    *   `NODE_ENV`: `production`
    *   `JWT_SECRET`: Define una clave segura.
    *   `CORS_ORIGIN`: La URL de tu frontend (ej: `https://web-production-xyz.up.railway.app`).
    *   `PORT`: `3000` (Railway suele inyectar PORT, pero asegúrate).
5.  Railway detectará automáticamente el `Dockerfile` en la carpeta `backend/` y construirá la imagen.

### 3. Frontend (Vite + Nginx)
1.  Crea otro `New Service` > `GitHub Repo`.
2.  Selecciona este repositorio.
3.  Ve a **Settings** > **Root Directory** y pon `/frontend`.
4.  Ve a **Variables**:
    *   `VITE_API_URL`: La URL pública de tu servicio Backend (ej: `https://backend-production-xyz.up.railway.app`).
5.  Railway detectará el `Dockerfile` en `frontend/` y desplegará Nginx.
    *   *Nota*: Asegúrate de que el puerto expuesto sea `80` (Railway a veces espera 3000 o 8080, puedes configurar `PORT` a `80` en Railway variables si falla).

## Verificación

1.  Abre la URL del Frontend.
2.  Intenta hacer Login.
3.  Verifica los logs en Railway si hay errores de conexión.

## Logs de Despliegue

*   **2026-02-05**: Actualización de dependencias (`nestjs-pino`) y corrección de tipos en usuarios. Commit forzado para asegurar sincronización en Railway.
