import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET: Obtener las noticias publicadas para el público
export async function GET() {
  try {
    const sql = "SELECT * FROM noticias WHERE estado = 'publicado' ORDER BY fecha DESC, creado_en DESC";
    const noticias = await query<any[]>(sql);
    return NextResponse.json({ success: true, noticias });
  } catch (error) {
    console.error("Error en API de noticias públicas:", error);
    return NextResponse.json({ error: "Error al cargar noticias." }, { status: 500 });
  }
}
