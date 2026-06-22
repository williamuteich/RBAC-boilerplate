import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const fileParts = resolvedParams.path;
    
    // Caminho absoluto para a pasta de uploads
    const filePath = path.join(process.cwd(), "public", "uploads", ...fileParts);

    // Evitar Directory Traversal (segurança)
    const relativePath = path.relative(path.join(process.cwd(), "public", "uploads"), filePath);
    if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
      return new NextResponse("Acesso não autorizado", { status: 403 });
    }

    if (!fs.existsSync(filePath)) {
      return new NextResponse("Arquivo não encontrado", { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    
    // Definir Content-Type correto
    const ext = path.extname(filePath).toLowerCase();
    let contentType = "application/octet-stream";
    if (ext === ".png") contentType = "image/png";
    else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    else if (ext === ".webp") contentType = "image/webp";
    else if (ext === ".gif") contentType = "image/gif";
    else if (ext === ".svg") contentType = "image/svg+xml";
    else if (ext === ".avif") contentType = "image/avif";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Erro ao servir arquivo:", error);
    return new NextResponse("Erro interno ao servir arquivo", { status: 500 });
  }
}
