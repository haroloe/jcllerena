# Guía de Despliegue en Hostinger

Hostinger ofrece la funcionalidad de **"Implementar aplicación web"** con soporte para Node.js, lo que permite hospedar aplicaciones Next.js. A continuación se detallan los pasos para configurar, compilar y desplegar esta landing page de campaña.

---

## 1. Conectar con GitHub
1. Entra a tu cuenta en GitHub y asegúrate de que el repositorio `jcllerena` esté en modo **Público** o **Privado** con tu clave SSH de Hostinger vinculada.
2. Sube todos los archivos locales confirmando que el archivo `.env` **no** esté en el repositorio (debe figurar en `.gitignore`).

---

## 2. Configurar el Subdominio
1. En el panel hPanel de Hostinger, ve a la sección de **Dominios** > **Subdominios**.
2. Crea el subdominio:
   `jcllerena.avancedtechnology.com`
3. Asegúrate de habilitar **SSL** (HTTPS) en el subdominio desde el panel de seguridad de Hostinger.

---

## 3. Crear Base de Datos MySQL en Hostinger
1. Dirígete a **Bases de datos** > **Bases de datos MySQL**.
2. Crea una base de datos nueva (anota el nombre, usuario y contraseña generados).
3. Entra a **phpMyAdmin** desde Hostinger e importa el archivo `/database/schema.sql` que se encuentra en la carpeta raíz del repositorio.

---

## 4. Configurar e Instalar la Aplicación Node.js en Hostinger
1. En el panel de control (hPanel), ve a la sección **Avanzado** > **Administrador de Node.js**.
2. Haz clic en **Configurar aplicación**.
3. Selecciona la carpeta raíz o el subdominio `jcllerena.avancedtechnology.com`.
4. Elige una versión de Node.js compatible (Node 18 o 20).
5. **Configura el script de inicio**:
   * Archivo de inicio de la aplicación: `node_modules/next/dist/bin/next` o usa el comando de inicio de Hostinger.
   * Alternativamente, compila localmente con `npm run build` y sube los archivos de producción (`.next`, `package.json`, `node_modules`, `public`).
6. **Variables de Entorno**: Agrega cada una de las variables requeridas (ver `ENVIRONMENT_VARIABLES.md`) en la sección de configuración de variables de entorno del hPanel para evitar exponer datos.

---

## 5. Compilación del Proyecto
Si tu hosting de Hostinger permite terminal SSH:
1. Conéctate vía SSH a tu hosting.
2. Navega al directorio del proyecto:
   ```bash
   cd domains/avancedtechnology.com/public_html/jcllerena
   ```
3. Instala dependencias:
   ```bash
   npm install --production
   ```
4. Compila el frontend:
   ```bash
   npm run build
   ```
5. Si no cuentas con consola SSH en tu plan de hosting:
   * Compila localmente en tu computadora con `npm run build`.
   * Comprime y sube la carpeta `.next`, `public`, `package.json` y `node_modules` vía FTP / Administrador de archivos de Hostinger.

---

## 6. Monitoreo y logs
1. Para revisar errores o logs de ejecución de la aplicación, accede al archivo de logs en el directorio de la aplicación, generalmente en `/logs/` o a través del botón **Ver Logs** en el administrador de Node.js de Hostinger.
2. Si realizas cambios en el repositorio, puedes usar el botón de **Git Pull** desde Hostinger para actualizar y volver a ejecutar la compilación.

---

## 7. Reversión de Versiones
Si un despliegue falla:
1. Identifica el commit estable anterior en tu repositorio de GitHub.
2. En la consola SSH del hosting, ejecuta:
   ```bash
   git reset --hard <ID_COMMIT_ESTABLE>
   npm run build
   ```
3. Reinicia la aplicación desde el panel de Node.js de Hostinger.
