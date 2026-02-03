# Guía de Docker

El proyecto ha sido dockerizado completamente, con configuraciones separadas para desarrollo y producción.

## Estructura

La configuración de Docker se encuentra en la carpeta `/docker`:

- `docker/docker-compose.dev.yml`: Entorno de desarrollo local.
- `docker/docker-compose.prod.yml`: Entorno de producción optimizado.

## Desarrollo Local (Hot Reload)

Este comando levanta la base de datos, backend y frontend. Los cambios en el código se reflejan automáticamente (hot reload) gracias al mapeo de volúmenes.

```bash
docker compose -f docker/docker-compose.dev.yml up --build
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Postgres**: Puerto 5432

> **Nota**: La primera vez puede tardar un poco mientras se instalan las dependencias dentro del contenedor.

## Producción (Optimizado)

Este comando construye imágenes optimizadas (multi-stage build) que solo incluyen lo necesario para ejecutar la aplicación (sin dependencias de desarrollo, código fuente innecesario, etc.).

```bash
docker compose -f docker/docker-compose.prod.yml up --build -d
```

- **Frontend**: http://localhost (Puerto 80, servido por Nginx)
- **Backend**: Puerto 3000
- **Restart Policy**: `always` (los contenedores se reinician si fallan o si se reinicia el servidor).

## Comandos Útiles

**Ver logs de desarrollo:**
```bash
docker compose -f docker/docker-compose.dev.yml logs -f
```

**Apagar todo:**
```bash
docker compose -f docker/docker-compose.dev.yml down
```

**Conectarse a la DB desde el host:**
- Host: `localhost`
- Port: `5432`
- User: `user`
- Password: `password` (o lo que hayas puesto en .env)
- DB: `aurarestaurante`
