import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// Endpoint seguro para recibir propuestas ciudadanas
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nombre_completo,
      telefono,
      email,
      comunidad_sector,
      categoria,
      descripcion,
      archivo_url,
      acepta_privacidad,
      autoriza_whatsapp,
    } = body;

    // 1. Validaciones básicas en el servidor (Seguridad)
    if (!nombre_completo || !telefono || !comunidad_sector || !categoria || !descripcion) {
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

    // 2. Inserción segura usando Prepared Statements (Protección contra Inyección SQL)
    const sql = `
      INSERT INTO propuestas_ciudadanas (
        nombre_completo, 
        telefono, 
        email, 
        comunidad_sector, 
        categoria, 
        descripcion, 
        archivo_url, 
        acepta_privacidad, 
        autoriza_whatsapp
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      nombre_completo.trim(),
      telefono.trim(),
      email ? email.trim() : null,
      comunidad_sector.trim(),
      categoria.trim(),
      descripcion.trim(),
      archivo_url || null,
      acepta_privacidad ? 1 : 0,
      autoriza_whatsapp ? 1 : 0,
    ];

    const result = await query<{ insertId: number }>(sql, values);

    return NextResponse.json(
      { 
        success: true, 
        message: "Propuesta registrada exitosamente.", 
        id: result.insertId 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error en API de propuestas:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al procesar tu propuesta. Por favor intenta más tarde." },
      { status: 500 }
    );
  }
}
