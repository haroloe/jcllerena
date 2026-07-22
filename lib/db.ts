import mysql from "mysql2/promise";

// Estructura para prevenir múltiples conexiones en desarrollo por Hot Reload
const globalForDb = globalThis as unknown as {
  conn: mysql.Pool | undefined;
};

export const db =
  globalForDb.conn ??
  mysql.createPool({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || "3306", 10),
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

if (process.env.NODE_ENV !== "production") globalForDb.conn = db;

// Helper genérico para consultas
export async function query<T>(sql: string, params?: any[]): Promise<T> {
  try {
    const [results] = await db.execute(sql, params);
    return results as T;
  } catch (error) {
    console.error("Error ejecutando consulta en MySQL:", error);
    throw error;
  }
}
