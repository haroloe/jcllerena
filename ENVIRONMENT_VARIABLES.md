# Variables de Entorno

Este documento describe todas las variables de entorno utilizadas por el proyecto, su funcionalidad y si se exponen en el cliente frontend.

## Archivos de Configuración
* `.env.example`: Plantilla de referencia para el proyecto.
* `.env`: Archivo de configuración local. **Nunca debe subirse al repositorio de control de versiones** (incluido en `.gitignore`).

---

## Detalle de Variables

### 1. Base de Datos MySQL
* **`DATABASE_HOST`**: Servidor donde se encuentra la base de datos (Ej: `localhost` en local, o la IP provista por Hostinger en producción).
* **`DATABASE_PORT`**: Puerto de la base de datos (por defecto, `3306`).
* **`DATABASE_NAME`**: Nombre de la base de datos (Ej: `jcllerena`).
* **`DATABASE_USER`**: Usuario con privilegios de lectura/escritura (Ej: `root` en local).
* **`DATABASE_PASSWORD`**: Contraseña del usuario de base de datos (Ej: `""` en local).

### 2. Autenticación y Seguridad
* **`JWT_SECRET`**: Clave secreta utilizada para firmar los tokens de sesión de los administradores. Debe ser una cadena de texto larga y aleatoria (mínimo de 32 caracteres).

### 3. Configuración Pública de WhatsApp (Prefijo `NEXT_PUBLIC_`)
Next.js expone las variables que inician con `NEXT_PUBLIC_` en el navegador del cliente.
* **`NEXT_PUBLIC_WHATSAPP_NUMBER`**: Número de teléfono con código de país (Ej: `51900000000` para Perú). Se utiliza para el botón flotante y enlaces de contacto directo.

### 4. Enlaces de Redes Sociales (Públicos)
* **`NEXT_PUBLIC_FACEBOOK_URL`**: Enlace a la página de Facebook oficial.
* **`NEXT_PUBLIC_INSTAGRAM_URL`**: Enlace a la página de Instagram oficial.
* **`NEXT_PUBLIC_TIKTOK_URL`**: Enlace a la página de TikTok oficial.
* **`NEXT_PUBLIC_YOUTUBE_URL`**: Enlace al canal de YouTube (dejar vacío si no se cuenta con canal).

### 5. Analítica e Integración de Píxeles (Públicos)
* **`NEXT_PUBLIC_GA_ID`**: ID de medición de Google Analytics 4 (Ej: `G-XXXXXXX`). Dejar vacío si no está activo.
* **`NEXT_PUBLIC_META_PIXEL_ID`**: ID del Meta Pixel (Pixel de Facebook) para rastrear eventos de conversión (Ej: `1234567890`). Dejar vacío si no está activo.
