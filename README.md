# Juan Carlos Llerena - Landing Page de Campaña 2027-2030

Este proyecto es la plataforma web oficial de **Juan Carlos Llerena Huamani**, candidato a la Alcaldía Distrital de Orcopampa por el **Movimiento Regional Arequipa Tradición y Futuro** para el periodo del Plan de Gobierno 2027-2030.

La plataforma está diseñada con una arquitectura moderna de Next.js, totalmente adaptada para teléfonos móviles, optimizada para SEO, accesible y conectada a una base de datos MySQL.

## Tecnologías Utilizadas
* **Next.js 15 (App Router)**
* **TypeScript**
* **Tailwind CSS** (para diseño ágil y responsive)
* **MySQL** (base de datos relacional)
* **BCrypt.js & JWT** (seguridad y sesiones del panel administrativo)

## Estructura de Documentación

El proyecto cuenta con las siguientes guías específicas:
1. **[INSTALLATION.md](file:///c:/xampp/htdocs/jcllerena/INSTALLATION.md)**: Instrucciones detalladas de instalación local.
2. **[DEPLOY_HOSTINGER.md](file:///c:/xampp/htdocs/jcllerena/DEPLOY_HOSTINGER.md)**: Guía paso a paso para el despliegue de la aplicación Next.js y base de datos en Hostinger.
3. **[DATABASE.md](file:///c:/xampp/htdocs/jcllerena/DATABASE.md)**: Manual del esquema de la base de datos MySQL y migraciones.
4. **[ENVIRONMENT_VARIABLES.md](file:///c:/xampp/htdocs/jcllerena/ENVIRONMENT_VARIABLES.md)**: Configuración del archivo `.env`.
5. **[CONTENT_GUIDE.md](file:///c:/xampp/htdocs/jcllerena/CONTENT_GUIDE.md)**: Guía de carga y gestión del plan de gobierno.
6. **[ADMIN_GUIDE.md](file:///c:/xampp/htdocs/jcllerena/ADMIN_GUIDE.md)**: Manual para el uso del panel administrativo.
7. **[PENDIENTES_DE_CONTENIDO.md](file:///c:/xampp/htdocs/jcllerena/PENDIENTES_DE_CONTENIDO.md)**: Control de contenidos pendientes de entrega por parte del equipo político.
8. **[CHANGELOG.md](file:///c:/xampp/htdocs/jcllerena/CHANGELOG.md)**: Registro histórico de modificaciones.
9. **[TEST_REPORT.md](file:///c:/xampp/htdocs/jcllerena/TEST_REPORT.md)**: Reporte y resultados de pruebas del sistema.

## Cómo Ejecutar el Proyecto

### 1. Clonar el repositorio y configurar variables de entorno
Crea tu archivo `.env.local` basado en el archivo `.env.example`:
```bash
cp .env.example .env.local
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Crear y configurar la base de datos
Importa el archivo `/database/schema.sql` en tu gestor de base de datos MySQL local o de Hostinger.

### 4. Inicializar el administrador de sistema
```bash
npm run seed:admin
```

### 5. Iniciar servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).
