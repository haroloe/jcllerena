const mysql = require('mysql2/promise');
require('dotenv').config();

async function run() {
  console.log('--- Modificando esquema para agregar tipo de medio y URL de video a noticias ---');
  
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '3306', 10),
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  });

  try {
    // 1. Agregar tipo_medio
    console.log('Agregando columna tipo_medio a noticias...');
    await connection.execute(`
      ALTER TABLE noticias 
      ADD COLUMN IF NOT EXISTS tipo_medio ENUM('foto', 'video') NOT NULL DEFAULT 'foto'
    `);

    // 2. Agregar video_url
    console.log('Agregando columna video_url a noticias...');
    await connection.execute(`
      ALTER TABLE noticias 
      ADD COLUMN IF NOT EXISTS video_url VARCHAR(255) DEFAULT NULL
    `);

    console.log('¡Columnas de video y tipo de medio añadidas exitosamente!');
  } catch (error) {
    console.error('Error al modificar tabla noticias:', error);
  } finally {
    await connection.end();
  }
}

run();
