import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { prisma } from "@/src/lib/prisma";
import { cookies } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/avif"];
const ALLOWED_EXTENSIONS = [".png", ".jpeg", ".jpg", ".webp", ".avif"];

async function getClientEmailFromSession(session: any) {
  if (session.user.tipo === "ADMINISTRATOR") {
    const cookieStore = await cookies();
    return cookieStore.get("impersonated_client_email")?.value || null;
  }
  return session.user.email || null;
}

export async function POST(req: Request) {
  const session = await getServerSession(auth);
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const clientEmail = await getClientEmailFromSession(session);
  if (!clientEmail) {
    return NextResponse.json({ error: "Cliente não especificado" }, { status: 401 });
  }

  const client = await prisma.saaSClient.findUnique({
    where: { email: clientEmail }
  });

  if (!client) {
    return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Arquivo muito grande. O limite máximo permitido é 5MB." },
        { status: 400 }
      );
    }

    const fileExtension = path.extname(file.name).toLowerCase();
    const mimeType = file.type.toLowerCase();

    if (!ALLOWED_MIME_TYPES.includes(mimeType) || !ALLOWED_EXTENSIONS.includes(fileExtension)) {
      return NextResponse.json(
        { error: "Tipo de arquivo inválido. Apenas imagens PNG, JPG, JPEG, WEBP ou AVIF são permitidas." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads", "clients", String(client.id));
    await mkdir(uploadDir, { recursive: true });

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}${fileExtension}`;
    const filePath = path.join(uploadDir, filename);

    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/clients/${client.id}/${filename}`;

    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Erro no upload de imagem:", error);
    return NextResponse.json({ error: "Erro interno ao processar upload" }, { status: 500 });
  }
}
