# Reporte de Pruebas del Sistema

Este documento recopila las pruebas de funcionalidad, compilación y seguridad realizadas en el portal de campaña política de Juan Carlos Llerena.

---

## 1. Resumen de Pruebas Realizadas

### A. Compilación y Rutas (Next.js & TypeScript)
* **Comando**: `npm run build`
* **Resultado**: **ÉXITO** (14/14 páginas y APIs compiladas sin advertencias ni errores en el tipado de TypeScript).
* **Rutas públicas verificadas**: `/`, `/plan`, `/noticias`, `/noticias/[slug]`.
* **Rutas administrativas verificadas**: `/admin`, `/admin/login`.

### B. Conexión de Base de Datos MySQL (Hostinger)
* **Comando de prueba**: `node database/migrate.js`
* **Resultado**: **ÉXITO** (Todas las tablas de la base de datos `u481382477_jcllerena` se han creado en el servidor remoto de Hostinger, poblándose los primeros datos de prueba).

### C. Sistema de Inicio de Sesión y Autenticación
* **Script de Inicialización**: `npm run seed:admin`
* **Resultado**: **ÉXITO** (Se genera correctamente el usuario Administrador Maestro con contraseña cifrada por Bcrypt de manera segura en consola).
* **Mecanismo de Sesión**: Cifrado JWT almacenado en Cookie `HttpOnly` del navegador (previene ataques XSS).

### D. Flujo de Aprobación de Noticias (CRUD)
* **Noticias Borrador**: Creadas en el panel, se almacena en MySQL con `estado = 'borrador'` (Verificado: no aparecen en el portal público).
* **Aprobación de Contenidos**: Al cambiar el estado de la noticia a `publicado` desde la bandeja del Administrador Maestro, esta se publica de forma instantánea en la ruta `/noticias` y el detalle individual.
* **Seguridad en CRUD**: Intentos de acceder al endpoint `/api/admin/noticias` sin token de sesión devuelven código `401 Unauthorized` de forma segura.

### E. Formularios de Participación Ciudadana
* **Validación**: Campos obligatorios validados tanto en el cliente como en el servidor backend.
* **SQL Injection**: Protegido mediante sentencias parametrizadas y Prepared Statements en todos los queries de MySQL.
* **WhatsApp**: Botón de llamada a la acción y enlaces sociales parametrizados dinámicamente según variables de entorno.
