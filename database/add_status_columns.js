const mysql = require('mysql2/promise');
require('dotenv').config();

async function run() {
  console.log('--- Modificando esquema para agregar estado a propuestas y voluntarios ---');
  
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '3306', 10),
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  });

  try {
    // 1. Agregar columna estado a propuestas_ciudadanas
    console.log('Agregando columna estado a propuestas_ciudadanas...');
    await connection.execute(`
      ALTER TABLE propuestas_ciudadanas 
      ADD COLUMN IF NOT EXISTS estado ENUM('pendiente', 'tomada_en_cuenta', 'archivada') NOT NULL DEFAULT 'pendiente'
    `);

    // 2. Agregar columna estado a voluntarios
    console.log('Agregando columna estado a voluntarios...');
    await connection.execute(`
      ALTER TABLE voluntarios 
      ADD COLUMN IF NOT EXISTS estado ENUM('pendiente', 'aprobado', 'rechazado') NOT NULL DEFAULT 'pendiente'
    `);

    console.log('¡Columnas de estado añadidas exitosamente!');
  } catch (error) {
    console.error('Error al modificar tablas:', error);
  } finally {
    await connection.end();
  }
}

run();
