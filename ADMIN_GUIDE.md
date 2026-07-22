# Guía del Panel de Administración

Este documento describe las funcionalidades y modos de uso del panel administrativo protegido de la plataforma web de Juan Carlos Llerena.

---

## 1. Acceso al Panel
El acceso se realiza mediante la ruta `/admin` en tu navegador.
* **Usuario por defecto**: `admin@jcllerena.com`
* **Contraseña**: Impresa en consola al ejecutar el script de inicialización (`npm run seed:admin`).

> [!WARNING]
> Se recomienda cambiar la contraseña inmediatamente después del primer inicio de sesión para mantener la seguridad del panel de administración.

---

## 2. Gestión de Contenidos

### A. Noticias y Comunicados
* **Crear Noticia**: Haz clic en "Nueva Noticia", completa el título (se generará automáticamente una URL amigable/slug), el resumen, el contenido HTML (mediante el editor enriquecido) y carga una imagen principal.
* **Estados**:
  * *Borrador*: Solo visible en el panel.
  * *Publicado*: Visible para todos los usuarios en la landing page.

### B. Agenda del Candidato
* Permite programar reuniones y visitas.
* Cada evento cuenta con fecha, hora, lugar, anexo (comunidad seleccionada) y enlace de ubicación de Google Maps o transmisión en vivo de Facebook/YouTube.

### C. Bandeja de Formularios
* **Propuestas Ciudadanas**: Permite leer y responder de forma interna a las propuestas y necesidades enviadas por los ciudadanos.
* **Voluntarios**: Muestra la lista de colaboradores con sus teléfonos, especialidad o forma de participación, y estado de disponibilidad.

---

## 3. Roles de Usuarios
1. **Administrador**: Acceso total al sistema, creación de usuarios, visualización de registros de voluntariado y propuestas.
2. **Editor**: Permiso de edición de noticias, agenda y carga de archivos en la galería. No puede gestionar usuarios.
3. **Revisor**: Rol con privilegios de lectura y aprobación de borradores.
