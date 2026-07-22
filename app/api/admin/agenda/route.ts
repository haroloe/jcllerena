import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { query } from "@/lib/db";

// Helper para verificar la autenticación
async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

// GET: Obtener todos los eventos (incluyendo pasados)
export async function GET() {
  const user = await checkAuth();
  if (!user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  try {
    const sql = "SELECT * FROM agenda ORDER BY fecha_hora DESC";
    const agenda = await query<any[]>(sql);
    return NextResponse.json({ success: true, agenda });
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor." }, { status: 500 });
  }
}

// POST: Crear un nuevo evento en la agenda
export async function POST(request: Request) {
  const user = await checkAuth();
  if (!user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { titulo, fecha_hora, lugar, comunidad_sector, descripcion, imagen_url, ubicacion_url, transmision_url, estado } = body;

    if (!titulo || !fecha_hora || !lugar || !comunidad_sector) {
      return NextResponse.json({ error: "Los campos título, fecha y hora, lugar y sector son obligatorios." }, { status: 400 });
    }

    const sql = `
      INSERT INTO agenda (titulo, fecha_hora, lugar, comunidad_sector, descripcion, imagen_url, ubicacion_url, transmision_url, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      titulo.trim(),
      fecha_hora,
      lugar.trim(),
      comunidad_sector,
      descripcion ? descripcion.trim() : null,
      imagen_url || null,
      ubicacion_url || null,
      transmision_url || null,
      estado || "programado",
    ];

    const result = await query<{ insertId: number }>(sql, values);

    return NextResponse.json({
      success: true,
      message: "Actividad de la agenda creada correctamente.",
      id: result.insertId,
    }, { status: 201 });
  } catch (error) {
    console.error("Error al crear evento de agenda:", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}

// PUT: Actualizar un evento existente
export async function PUT(request: Request) {
  const user = await checkAuth();
  if (!user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, titulo, fecha_hora, lugar, comunidad_sector, descripcion, imagen_url, ubicacion_url, transmision_url, estado } = body;

    if (!id || !titulo || !fecha_hora || !lugar || !comunidad_sector) {
      return NextResponse.json({ error: "Datos insuficientes para actualizar." }, { status: 400 });
    }

    const sql = `
      UPDATE agenda 
      SET titulo = ?, fecha_hora = ?, lugar = ?, comunidad_sector = ?, descripcion = ?, imagen_url = ?, ubicacion_url = ?, transmision_url = ?, estado = ?
      WHERE id = ?
    `;

    const values = [
      titulo.trim(),
      fecha_hora,
      lugar.trim(),
      comunidad_sector,
      descripcion ? descripcion.trim() : null,
      imagen_url || null,
      ubicacion_url || null,
      transmision_url || null,
      estado,
      id,
    ];

    await query(sql, values);

    return NextResponse.json({
      success: true,
      message: "Actividad de la agenda actualizada correctamente.",
    });
  } catch (error) {
    console.error("Error al actualizar evento de agenda:", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}

// DELETE: Eliminar un evento de la agenda
export async function DELETE(request: Request) {
  const user = await checkAuth();
  if (!user || user.rol !== "admin") {
    return NextResponse.json({ error: "No autorizado (Solo Administrador Maestro)." }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID de evento requerido." }, { status: 400 });
    }

    const sql = "DELETE FROM agenda WHERE id = ?";
    await query(sql, [id]);

    return NextResponse.json({
      success: true,
      message: "Actividad de la agenda eliminada.",
    });
  } catch (error) {
    console.error("Error al eliminar evento de agenda:", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}
