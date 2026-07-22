import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// Endpoint seguro para registrar voluntarios de campaña
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nombre,
      apellidos,
      telefono,
      email,
      comunidad_sector,
      edad,
      profesion_ocupacion,
      forma_participacion,
      disponibilidad,
      comentario,
      acepta_privacidad,
      autoriza_whatsapp,
    } = body;

    // 1. Validaciones básicas en el servidor
    if (!nombre || !apellidos || !telefono || !email || !comunidad_sector || !profesion_ocupacion || !forma_participacion || !disponibilidad) {
      return NextResponse.json(
        { error: "Todos los campos obligatorios deben ser completados." },
        { status: 400 }
      );
    }

    if (!acepta_privacidad) {
      return NextResponse.json(
        { error: "Debe aceptar las políticas de privacidad." },
        { status: 400 }
      );
    }

    // 2. Inserción segura con Prepared Statements
    const sql = `
      INSERT INTO voluntarios (
        nombre,
        apellidos,
        telefono,
        email,
        comunidad_sector,
        edad,
        profesion_ocupacion,
        forma_participacion,
        disponibilidad,
        comentario,
        acepta_privacidad,
        autoriza_whatsapp
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const parsedEdad = edad ? parseInt(edad, 10) : null;

    const values = [
      nombre.trim(),
      apellidos.trim(),
      telefono.trim(),
      email.trim(),
      comunidad_sector.trim(),
      isNaN(Number(parsedEdad)) ? null : parsedEdad,
      profesion_ocupacion.trim(),
      forma_participacion.trim(),
      disponibilidad.trim(),
      comentario ? comentario.trim() : null,
      acepta_privacidad ? 1 : 0,
      autoriza_whatsapp ? 1 : 0,
    ];

    const result = await query<{ insertId: number }>(sql, values);

    return NextResponse.json(
      { 
        success: true, 
        message: "Te has registrado exitosamente como voluntario. ¡Gracias por sumarte!", 
        id: result.insertId 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error en API de voluntarios:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al procesar tu registro. Por favor intenta más tarde." },
      { status: 500 }
    );
  }
}
