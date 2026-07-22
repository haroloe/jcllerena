import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son obligatorios." },
        { status: 400 }
      );
    }

    // Buscar al usuario
    const sql = "SELECT * FROM usuarios WHERE email = ? LIMIT 1";
    const users = await query<any[]>(sql, [email.trim()]);

    if (users.length === 0) {
      return NextResponse.json(
        { error: "Credenciales incorrectas." },
        { status: 401 }
      );
    }

    const user = users[0];

    // Verificar contraseña
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Credenciales incorrectas." },
        { status: 401 }
      );
    }

    // Firmar token
    const sessionUser = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
    };

    const token = signToken(sessionUser);

    const response = NextResponse.json({
      success: true,
      message: "Sesión iniciada correctamente.",
      user: sessionUser,
    });

    // Guardar token en HttpOnly cookie
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 8, // 8 horas
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Error en login:", error);
    return NextResponse.json(
      { error: "Ocurrió un error en el servidor." },
      { status: 500 }
    );
  }
}
