const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function runMigration() {
  console.log('--- Iniciando Migración de Base de Datos en Hostinger ---');
  console.log('Host:', process.env.DATABASE_HOST);
  console.log('Database:', process.env.DATABASE_NAME);

  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '3306', 10),
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    multipleStatements: true, // Habilitar múltiples sentencias
  });

  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const sqlContent = fs.readFileSync(schemaPath, 'utf8');

    console.log('Leyendo archivo schema.sql...');
    
    // Ejecutar el script SQL completo de manera atómica
    await connection.query(sqlContent);
    
    console.log('¡Tablas creadas y datos iniciales insertados de manera exitosa en Hostinger!');
  } catch (error) {
    console.error('Error durante la migración:', error);
  } finally {
    await connection.end();
    console.log('--- Migración Finalizada ---');
  }
}

runMigration();
