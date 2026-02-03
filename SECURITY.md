# Seguridad del Proyecto

Se han implementado las siguientes medidas de seguridad "Mínimas Viables" para proteger la aplicación.

## 1. Autenticación y Autorización
- **JWT (JSON Web Tokens)**: Se utiliza para el manejo de sesiones stateless.
- **Passport.js**: Implementación de estrategias `local` (email/password) y `jwt` (bearer token).
- **Hashing de Contraseñas**: Se utiliza `bcrypt` (salt rounds: 10) para hashear las contraseñas antes de guardarlas en la base de datos.

## 2. Protección HTTP
- **Helmet**: Se ha configurado el middleware `helmet` para establecer headers de seguridad HTTP adecuados (HSTS, X-Frame-Options, etc.).
- **CORS**: Configuración restrictiva en producción (solo permite dominio `aurarestaurante.com`) y permisiva en desarrollo.

## 3. Validación y Sanitización
- **ValidationPipe**: Activado globalmente con `whitelist: true` y `forbidNonWhitelisted: true`. Esto elimina automáticamente cualquier propiedad que no esté definida en los DTOs, previniendo inyección de datos masiva.
- **DTOs**: Se utilizan clases con decoradores `class-validator` para asegurar tipos de datos correctos.

## 4. Protección contra Abusos
- **Rate Limiting**: Se utiliza `@nestjs/throttler` globalmente.
    - Límite: 10 peticiones
    - Ventana de tiempo: 60 segundos (TTL)
    - Esto ayuda a mitigar ataques de fuerza bruta y DDoS básicos.

## 5. HTTPS
- **Producción**: El terminación SSL/TLS debe ser manejada por el proveedor de infraestructura (Railway, AWS LB, Nginx, Cloudflare). La aplicación espera tráfico en puerto 3000 pero no maneja certificados internamente.
- **Desarrollo**: HTTP estándar.

## Notas para Desarrolladores
- **NUNCA** guardar contraseñas en texto plano.
- Usar siempre DTOs para nuevos endpoints.
- Rotar `JWT_SECRET` en producción regularmente.
