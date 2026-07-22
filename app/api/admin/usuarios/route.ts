import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";

// Helper para verificar la autenticación y rol de administrador
async function checkAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  const user = verifyToken(token);
  if (!user || user.rol !== "admin") return null; // Solo administradores maestros
  return user;
}

// GET: Obtener todos los usuarios del panel
export async function GET() {
  const admin = await checkAdminAuth();
  if (!admin) {
    return NextResponse.json({ error: "No autorizado (Requiere rol de Administrador)." }, { status: 403 });
  }

  try {
    const sql = "SELECT id, nombre, email, rol, fecha_registro FROM usuarios ORDER BY nombre ASC";
    const usuarios = await query<any[]>(sql);
    return NextResponse.json({ success: true, usuarios });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error en el servidor." }, { status: 500 });
  }
}

// POST: Registrar un nuevo usuario administrador/editor
export async function POST(request: Request) {
  const admin = await checkAdminAuth();
  if (!admin) {
    return NextResponse.json({ error: "No autorizado." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { nombre, email, password, rol } = body;

    if (!nombre || !email || !password || !rol) {
      return NextResponse.json({ error: "Todos los campos (nombre, email, contraseña, rol) son obligatorios." }, { status: 400 });
    }

    // Cifrar la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const sql = "INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES (?, ?, ?, ?)";
    const result = await query<{ insertId: number }>(sql, [
      nombre.trim(),
      email.trim().toLowerCase(),
      passwordHash,
      rol,
    ]);

    return NextResponse.json({
      success: true,
      message: "Usuario creado exitosamente.",
      id: result.insertId,
    }, { status: 201 });
  } catch (error: any) {
    console.error("Error al crear usuario:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "El correo electrónico ya está registrado." }, { status: 400 });
    }
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}

// PUT: Modificar un usuario existente
export async function PUT(request: Request) {
  const admin = await checkAdminAuth();
  if (!admin) {
    return NextResponse.json({ error: "No autorizado." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { id, nombre, email, password, rol } = body;

    if (!id || !nombre || !email || !rol) {
      return NextResponse.json({ error: "ID, nombre, email y rol son requeridos." }, { status: 400 });
    }

    let sql = "";
    let values = [];

    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      sql = "UPDATE usuarios SET nombre = ?, email = ?, password_hash = ?, rol = ? WHERE id = ?";
      values = [nombre.trim(), email.trim().toLowerCase(), passwordHash, rol, id];
    } else {
      sql = "UPDATE usuarios SET nombre = ?, email = ?, rol = ? WHERE id = ?";
      values = [nombre.trim(), email.trim().toLowerCase(), rol, id];
    }

    await query(sql, values);

    return NextResponse.json({
      success: true,
      message: "Usuario actualizado correctamente.",
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}

// DELETE: Eliminar un usuario del sistema
export async function DELETE(request: Request) {
  const admin = await checkAdminAuth();
  if (!admin) {
    return NextResponse.json({ error: "No autorizado." }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID de usuario requerido." }, { status: 400 });
    }

    // Evitar que el administrador maestro se elimine a sí mismo
    if (parseInt(id, 10) === admin.id) {
      return NextResponse.json({ error: "No puedes eliminar tu propio usuario administrador." }, { status: 400 });
    }

    const sql = "DELETE FROM usuarios WHERE id = ?";
    await query(sql, [id]);

    return NextResponse.json({
      success: true,
      message: "Usuario eliminado del sistema.",
    });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}
