import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET: Obtener actividades de la agenda pública
export async function GET() {
  try {
    const sql = "SELECT * FROM agenda ORDER BY fecha_hora ASC";
    const agenda = await query<any[]>(sql);
    return NextResponse.json({ success: true, agenda });
  } catch (error) {
    console.error("Error en API de agenda pública:", error);
    return NextResponse.json({ error: "Error al cargar la agenda." }, { status: 500 });
  }
}
