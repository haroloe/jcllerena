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

// GET: Obtener todas las noticias (para el panel admin)
export async function GET() {
  const user = await checkAuth();
  if (!user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  try {
    const sql = "SELECT * FROM noticias ORDER BY fecha DESC, creado_en DESC";
    const noticias = await query<any[]>(sql);
    return NextResponse.json({ success: true, noticias });
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor." }, { status: 500 });
  }
}

// POST: Crear una nueva noticia (con flujo de aprobación)
export async function POST(request: Request) {
  const user = await checkAuth();
  if (!user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { titulo, resumen, contenido, imagen_principal, fecha, categoria, estado } = body;

    if (!titulo || !resumen || !contenido || !fecha || !categoria) {
      return NextResponse.json({ error: "Todos los campos obligatorios deben ser completados." }, { status: 400 });
    }

    const url_slug = titulo
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Control de roles en la aprobación:
    // Solo administradores y revisores pueden publicar directamente.
    // Los editores (u otros participantes) se fuerzan en estado 'borrador'.
    const finalEstado = (user.rol === "admin" || user.rol === "revisor")
      ? (estado || "borrador")
      : "borrador";

    const sql = `
      INSERT INTO noticias (titulo, url_slug, resumen, contenido, imagen_principal, fecha, autor, categoria, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      titulo.trim(),
      url_slug,
      resumen.trim(),
      contenido.trim(),
      imagen_principal || null,
      fecha,
      user.nombre,
      categoria,
      finalEstado,
    ];

    const result = await query<{ insertId: number }>(sql, values);

    return NextResponse.json({
      success: true,
      message: finalEstado === "publicado" ? "Noticia publicada exitosamente." : "Noticia guardada como borrador (pendiente de aprobación).",
      id: result.insertId,
    }, { status: 201 });
  } catch (error: any) {
    console.error("Error al crear noticia:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "Ya existe una noticia con un título similar." }, { status: 400 });
    }
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}

// PUT: Actualizar una noticia existente (e.g. aprobarla)
export async function PUT(request: Request) {
  const user = await checkAuth();
  if (!user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, titulo, resumen, contenido, imagen_principal, fecha, categoria, estado } = body;

    if (!id || !titulo || !resumen || !contenido || !fecha || !categoria) {
      return NextResponse.json({ error: "Datos insuficientes para actualizar." }, { status: 400 });
    }

    const url_slug = titulo
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Si el usuario es un Editor simple, no puede cambiar el estado a publicado
    // (solo admin/revisor pueden forzar la publicación)
    let finalEstado = estado;
    if (user.rol === "editor" && estado === "publicado") {
      finalEstado = "borrador";
    }

    const sql = `
      UPDATE noticias 
      SET titulo = ?, url_slug = ?, resumen = ?, contenido = ?, imagen_principal = ?, fecha = ?, categoria = ?, estado = ?
      WHERE id = ?
    `;

    const values = [
      titulo.trim(),
      url_slug,
      resumen.trim(),
      contenido.trim(),
      imagen_principal || null,
      fecha,
      categoria,
      finalEstado,
      id,
    ];

    await query(sql, values);

    return NextResponse.json({
      success: true,
      message: "Noticia actualizada correctamente.",
    });
  } catch (error) {
    console.error("Error al actualizar noticia:", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}

// DELETE: Eliminar una noticia
export async function DELETE(request: Request) {
  const user = await checkAuth();
  if (!user || user.rol !== "admin") {
    return NextResponse.json({ error: "No autorizado (Solo Administrador Maestro)." }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID de noticia requerido." }, { status: 400 });
    }

    const sql = "DELETE FROM noticias WHERE id = ?";
    await query(sql, [id]);

    return NextResponse.json({
      success: true,
      message: "Noticia eliminada del sistema.",
    });
  } catch (error) {
    console.error("Error al eliminar noticia:", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}
