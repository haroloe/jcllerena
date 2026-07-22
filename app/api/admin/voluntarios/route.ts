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

// GET: Obtener todos los voluntarios registrados
export async function GET() {
  const user = await checkAuth();
  if (!user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  try {
    const sql = "SELECT * FROM voluntarios ORDER BY fecha_registro DESC";
    const voluntarios = await query<any[]>(sql);
    return NextResponse.json({ success: true, voluntarios });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error en el servidor." }, { status: 500 });
  }
}

// PUT: Actualizar el estado del voluntario
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

    const sql = "UPDATE voluntarios SET estado = ? WHERE id = ?";
    await query(sql, [estado, id]);

    return NextResponse.json({
      success: true,
      message: "Voluntario actualizado correctamente.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error en el servidor." }, { status: 500 });
  }
}
