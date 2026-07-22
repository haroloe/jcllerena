import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { query } from "@/lib/db";

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

// GET: Obtener todas las propuestas ciudadanas
export async function GET() {
  const user = await checkAuth();
  if (!user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  try {
    const sql = "SELECT * FROM propuestas_ciudadanas ORDER BY fecha_envio DESC";
    const propuestas = await query<any[]>(sql);
    return NextResponse.json({ success: true, propuestas });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error en el servidor." }, { status: 500 });
  }
}

// PUT: Actualizar el estado de la propuesta
export async function PUT(request: Request) {
  const user = await checkAuth();
  if (!user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, estado } = body;

    if (!id || !estado) {
      return NextResponse.json({ error: "ID y estado requeridos." }, { status: 400 });
    }

    const sql = "UPDATE propuestas_ciudadanas SET estado = ? WHERE id = ?";
    await query(sql, [estado, id]);

    return NextResponse.json({
      success: true,
      message: "Propuesta actualizada exitosamente.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error en el servidor." }, { status: 500 });
  }
}
