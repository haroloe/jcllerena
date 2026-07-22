# Estructura de la Base de Datos

El sistema utiliza una base de datos relacional MySQL para almacenar información dinámica de la campaña política.

## Configuración y Acceso
Las credenciales de conexión se configuran mediante las siguientes variables de entorno:
* `DATABASE_HOST`
* `DATABASE_PORT`
* `DATABASE_NAME`
* `DATABASE_USER`
* `DATABASE_PASSWORD`

---

## Esquema de Tablas (schema.sql)

La base de datos consta de las siguientes tablas principales:

### 1. `usuarios` (Administradores de la plataforma)
Almacena las cuentas de acceso al panel administrativo protegido.
* `id` (INT, PK, AUTO_INCREMENT)
* `nombre` (VARCHAR(100))
* `email` (VARCHAR(100), UNIQUE)
* `password_hash` (VARCHAR(255))
* `rol` (ENUM('admin', 'editor', 'revisor'))
* `fecha_registro` (TIMESTAMP)

### 2. `propuestas_ciudadanas` (Propuestas enviadas por los vecinos)
Almacena los aportes y necesidades registradas por los pobladores de Orcopampa.
* `id` (INT, PK, AUTO_INCREMENT)
* `nombre_completo` (VARCHAR(150))
* `telefono` (VARCHAR(20))
* `email` (VARCHAR(100), NULL)
* `comunidad_sector` (VARCHAR(100))
* `categoria` (VARCHAR(50))
* `descripcion` (TEXT)
* `archivo_url` (VARCHAR(255), NULL)
* `acepta_privacidad` (TINYINT(1))
* `autoriza_whatsapp` (TINYINT(1))
* `fecha_envio` (TIMESTAMP)

### 3. `voluntarios` (Fichas de registro de colaboradores)
Registra la información de simpatizantes que desean sumarse al equipo.
* `id` (INT, PK, AUTO_INCREMENT)
* `nombre` (VARCHAR(100))
* `apellidos` (VARCHAR(100))
* `telefono` (VARCHAR(20))
* `email` (VARCHAR(100))
* `comunidad_sector` (VARCHAR(100))
* `edad` (INT, NULL)
* `profesion_ocupacion` (VARCHAR(150))
* `forma_participacion` (VARCHAR(100))
* `disponibilidad` (VARCHAR(100))
* `comentario` (TEXT, NULL)
* `acepta_privacidad` (TINYINT(1))
* `autoriza_whatsapp` (TINYINT(1))
* `fecha_registro` (TIMESTAMP)

### 4. `noticias` (Entradas de blog y comunicados oficiales)
Notas de prensa, actividades y anuncios de campaña.
* `id` (INT, PK, AUTO_INCREMENT)
* `titulo` (VARCHAR(255))
* `url_slug` (VARCHAR(255), UNIQUE)
* `resumen` (TEXT)
* `contenido` (LONGTEXT)
* `imagen_principal` (VARCHAR(255), NULL)
* `fecha` (DATE)
* `autor` (VARCHAR(100))
* `categoria` (VARCHAR(50))
* `estado` (ENUM('borrador', 'publicado'))
* `creado_en` (TIMESTAMP)

### 5. `agenda` (Actividades públicas del candidato)
Reuniones, visitas a comunidades y transmisiones en vivo.
* `id` (INT, PK, AUTO_INCREMENT)
* `titulo` (VARCHAR(255))
* `fecha_hora` (DATETIME)
* `lugar` (VARCHAR(255))
* `comunidad_sector` (VARCHAR(100))
* `descripcion` (TEXT, NULL)
* `imagen_url` (VARCHAR(255), NULL)
* `ubicacion_url` (VARCHAR(255), NULL)
* `transmision_url` (VARCHAR(255), NULL)
* `estado` (ENUM('programado', 'concluido', 'cancelado'))

---

## Migraciones e Inicialización
El archivo del esquema se encuentra en la carpeta `/database/schema.sql`. Puedes importarlo directamente usando la línea de comandos de MySQL:
```bash
mysql -u usuario -p base_de_datos < database/schema.sql
```
O bien importándolo desde la pestaña "Importar" en phpMyAdmin.
