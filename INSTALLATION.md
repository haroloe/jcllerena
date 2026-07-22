# Guía de Instalación Local

Este documento guía paso a paso al desarrollador para instalar y ejecutar el proyecto de forma local.

## Requisitos Previos
* **Node.js**: Versión 18.x, 20.x o 22.x (versión recomendada LTS).
* **NPM**: Incluido con Node.js.
* **MySQL Server**: Versión 8.0 o posterior (XAMPP es ideal para desarrollo local en Windows).

---

## Paso 1: Descargar/Clonar el Proyecto
Clona el repositorio en tu servidor local (por ejemplo, dentro de `C:\xampp\htdocs\jcllerena`):
```bash
git clone https://github.com/haroloe/jcllerena.git
```

---

## Paso 2: Instalar Dependencias del Servidor
Ejecuta el siguiente comando en la carpeta raíz del proyecto para instalar todas las dependencias requeridas (incluyendo Tailwind, TypeScript, conector MySQL y dependencias de seguridad):
```bash
npm install
```

---

## Paso 3: Configurar Base de Datos MySQL (XAMPP)
1. Inicia **Apache** y **MySQL** en el Panel de Control de XAMPP.
2. Abre tu navegador web e ingresa a `http://localhost/phpmyadmin`.
3. Crea una nueva base de datos llamada `jcllerena`.
4. Importa el archivo `/database/schema.sql` que se encuentra en la carpeta del proyecto para crear las tablas necesarias.

---

## Paso 4: Configurar Variables de Entorno
Crea un archivo `.env` o `.env.local` en la raíz del proyecto y completa los parámetros de conexión correspondientes:
```env
# Configuración del servidor y puertos
PORT=3000

# Base de datos MySQL
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=jcllerena
DATABASE_USER=root
DATABASE_PASSWORD=""

# Token JWT y seguridad
JWT_SECRET="tu_clave_secreta_super_segura_aqui"

# Configuración de Redes de la Campaña (Públicas)
NEXT_PUBLIC_WHATSAPP_NUMBER="51900000000"
NEXT_PUBLIC_FACEBOOK_URL="https://facebook.com/jcllerena"
NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/jcllerena"
NEXT_PUBLIC_TIKTOK_URL="https://tiktok.com/@jcllerena"
NEXT_PUBLIC_YOUTUBE_URL=""

# Analítica y tracking
NEXT_PUBLIC_GA_ID=""
NEXT_PUBLIC_META_PIXEL_ID=""
```

---

## Paso 5: Generar el Administrador Inicial
Para crear el primer usuario administrativo de la plataforma, ejecuta el script de siembra preconfigurado:
```bash
npm run seed:admin
```
Este script creará un usuario administrador por defecto:
* **Email**: `admin@jcllerena.com`
* **Password**: Generado de manera dinámica e impreso en consola para cambiarlo en el primer inicio.

---

## Paso 6: Ejecutar en Entorno de Desarrollo
Para levantar el servidor local de Next.js con recarga en caliente:
```bash
npm run dev
```
Abre tu navegador en [http://localhost:3000](http://localhost:3000).
