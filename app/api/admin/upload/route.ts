import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

// Helper to check authentication
async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function POST(request: Request) {
  const user = await checkAuth();
  if (!user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json({ error: "No se encontró ningún archivo para subir." }, { status: 400 });
    }

    // Convert file to Base64 Data URL
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = file.type || "image/png";
    const base64Data = buffer.toString("base64");
    
    // Create base64 data URL
    const dataUrl = `data:${mimeType};base64,${base64Data}`;

    return NextResponse.json({ success: true, url: dataUrl });
  } catch (error) {
    console.error("Error al procesar subida en base64:", error);
    return NextResponse.json({ error: "Error interno del servidor al procesar la subida." }, { status: 500 });
  }
}
