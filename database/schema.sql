-- Esquema de Base de Datos para Landing Page Juan Carlos Llerena
-- Base de datos: jcllerena

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Tabla de Usuarios Administradores
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `rol` ENUM('admin', 'editor', 'revisor') NOT NULL DEFAULT 'editor',
  `fecha_registro` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Tabla de Propuestas Ciudadanas
DROP TABLE IF EXISTS `propuestas_ciudadanas`;
CREATE TABLE `propuestas_ciudadanas` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre_completo` VARCHAR(150) NOT NULL,
  `telefono` VARCHAR(20) NOT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `comunidad_sector` VARCHAR(100) NOT NULL,
  `categoria` VARCHAR(50) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `archivo_url` VARCHAR(255) DEFAULT NULL,
  `acepta_privacidad` TINYINT(1) NOT NULL DEFAULT 0,
  `autoriza_whatsapp` TINYINT(1) NOT NULL DEFAULT 0,
  `fecha_envio` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Tabla de Voluntarios
DROP TABLE IF EXISTS `voluntarios`;
CREATE TABLE `voluntarios` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(100) NOT NULL,
  `apellidos` VARCHAR(100) NOT NULL,
  `telefono` VARCHAR(20) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `comunidad_sector` VARCHAR(100) NOT NULL,
  `edad` INT DEFAULT NULL,
  `profesion_ocupacion` VARCHAR(150) NOT NULL,
  `forma_participacion` VARCHAR(100) NOT NULL,
  `disponibilidad` VARCHAR(100) NOT NULL,
  `comentario` TEXT DEFAULT NULL,
  `acepta_privacidad` TINYINT(1) NOT NULL DEFAULT 0,
  `autoriza_whatsapp` TINYINT(1) NOT NULL DEFAULT 0,
  `fecha_registro` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Tabla de Noticias
DROP TABLE IF EXISTS `noticias`;
CREATE TABLE `noticias` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `titulo` VARCHAR(255) NOT NULL,
  `url_slug` VARCHAR(255) NOT NULL UNIQUE,
  `resumen` TEXT NOT NULL,
  `contenido` LONGTEXT NOT NULL,
  `imagen_principal` VARCHAR(255) DEFAULT NULL,
  `fecha` DATE NOT NULL,
  `autor` VARCHAR(100) NOT NULL,
  `categoria` VARCHAR(50) NOT NULL,
  `estado` ENUM('borrador', 'publicado') NOT NULL DEFAULT 'borrador',
  `creado_en` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Tabla de Agenda
DROP TABLE IF EXISTS `agenda`;
CREATE TABLE `agenda` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `titulo` VARCHAR(255) NOT NULL,
  `fecha_hora` DATETIME NOT NULL,
  `lugar` VARCHAR(255) NOT NULL,
  `comunidad_sector` VARCHAR(100) NOT NULL,
  `descripcion` TEXT DEFAULT NULL,
  `imagen_url` VARCHAR(255) DEFAULT NULL,
  `ubicacion_url` VARCHAR(255) DEFAULT NULL,
  `transmision_url` VARCHAR(255) DEFAULT NULL,
  `estado` ENUM('programado', 'concluido', 'cancelado') NOT NULL DEFAULT 'programado'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar Datos de Prueba Iniciales para Noticias y Agenda
INSERT INTO `noticias` (`titulo`, `url_slug`, `resumen`, `contenido`, `imagen_principal`, `fecha`, `autor`, `categoria`, `estado`) VALUES
('Gran Presentación de nuestro Candidato en Orcopampa', 'gran-presentacion-candidato-orcopampa', 'Juan Carlos Llerena expuso los pilares clave del Plan de Gobierno 2027-2030 ante miles de vecinos.', '<p>En una jornada llena de entusiasmo, civismo e identidad regional, el candidato Juan Carlos Llerena Huamani expuso las principales propuestas del Plan de Gobierno de la agrupación Tradición y Futuro para el desarrollo sostenible del distrito de Orcopampa.</p><p>Los ejes prioritarios expuestos se enfocaron en la infraestructura de agua potable y alcantarillado, así como en la creación del Hospital Distrital y el programa integral de fomento de empleo temporal.</p>', '/images/placeholders/noticia_presentacion.jpg', '2026-07-22', 'Prensa', 'Campaña', 'publicado');

INSERT INTO `agenda` (`titulo`, `fecha_hora`, `lugar`, `comunidad_sector`, `descripcion`, `estado`) VALUES
('Reunión con Productores Alpaqueros', '2026-07-25 10:00:00', 'Local Comunal de Vizcacuto', 'Vizcacuto', 'Mesa de diálogo técnica para abordar el mejoramiento genético de camélidos sudamericanos y siembra de agua.', 'programado'),
('Presentación del Eje de Salud y Educación', '2026-07-28 16:00:00', 'Plaza de Armas de Orcopampa', 'Orcopampa', 'Exposición del hospital distrital de categoría II-1 y programa de becas de Orcopampa Joven.', 'programado');

SET FOREIGN_KEY_CHECKS = 1;
