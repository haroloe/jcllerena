const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createAdmin() {
  console.log('--- Creando Administrador Maestro ---');
  
  const host = process.env.DATABASE_HOST;
  const dbName = process.env.DATABASE_NAME;
  
  if (!host || !dbName) {
    console.error('Error: Las variables de entorno de base de datos no están configuradas.');
    process.exit(1);
  }

  const connection = await mysql.createConnection({
    host: host,
    port: parseInt(process.env.DATABASE_PORT || '3306', 10),
    database: dbName,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  });

  try {
    const adminEmail = 'admin@jcllerena.com';
    const adminName = 'Administrador Maestro';
    
    // Generar una contraseña aleatoria segura de 12 caracteres
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let rawPassword = '';
    for (let i = 0; i < 12; i++) {
      rawPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(rawPassword, salt);

    // Verificar si el usuario ya existe
    const [existing] = await connection.execute('SELECT id FROM usuarios WHERE email = ?', [adminEmail]);
    if (existing.length > 0) {
      console.log('El usuario administrador ya existe. Actualizando contraseña...');
      await connection.execute(
        'UPDATE usuarios SET password_hash = ? WHERE email = ?',
        [passwordHash, adminEmail]
      );
    } else {
      console.log('Insertando nuevo administrador maestro...');
      await connection.execute(
        'INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES (?, ?, ?, ?)',
        [adminName, adminEmail, passwordHash, 'admin']
      );
    }

    console.log('----------------------------------------------------');
    console.log('¡Administrador Maestro Generado Con Éxito!');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${rawPassword}`);
    console.log('----------------------------------------------------');
    console.log('GUARDA ESTA CONTRASEÑA EN UN LUGAR SEGURO.');
  } catch (error) {
    console.error('Error al generar el administrador:', error);
  } finally {
    await connection.end();
  }
}

createAdmin();
