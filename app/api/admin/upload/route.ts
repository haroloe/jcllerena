import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import fs from "fs";
import path from "path";

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

    // Convert file Blob to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Create unique filename
    const originalName = (file as any).name || "image.png";
    const extension = path.extname(originalName) || ".png";
    const cleanFilename = `upload_${Date.now()}${extension}`;

    // Target directory: public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Write file to target path
    const filePath = path.join(uploadDir, cleanFilename);
    fs.writeFileSync(filePath, buffer);

    // Return the relative URL to access the uploaded file
    const fileUrl = `/uploads/${cleanFilename}`;
    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error("Error al subir archivo:", error);
    return NextResponse.json({ error: "Error interno del servidor al procesar la subida." }, { status: 500 });
  }
}
