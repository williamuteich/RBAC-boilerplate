import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { prisma } from "@/src/lib/prisma";
import { cookies } from "next/headers";

async function getClientEmailFromSession(session: any) {
  if (session.user.tipo === "ADMINISTRATOR") {
    const cookieStore = await cookies();
    return cookieStore.get("impersonated_client_email")?.value || null;
  }
  return session.user.email || null;
}

export async function GET() {
  const session = await getServerSession(auth);
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const clientEmail = await getClientEmailFromSession(session);
  if (!clientEmail) {
    return NextResponse.json({ error: "Cliente não especificado ou não autorizado" }, { status: 401 });
  }

  const client = await prisma.saaSClient.findUnique({
    where: { email: clientEmail }
  });

  if (!client) {
    return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 });
  }

  return NextResponse.json({
    partnerA: client.partnerA,
    partnerB: client.partnerB,
    anniversary: client.anniversary,
    theme: client.theme,
    songTitle: client.songTitle,
    songArtist: client.songArtist,
    songUrl: client.songUrl,
    letterTitle: client.letterTitle,
    letterBody: client.letterBody,
    photos: client.photos
  });
}

export async function PUT(req: Request) {
  const session = await getServerSession(auth);
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const clientEmail = await getClientEmailFromSession(session);
  if (!clientEmail) {
    return NextResponse.json({ error: "Cliente não especificado ou não autorizado" }, { status: 401 });
  }

  const body = await req.json();

  const client = await prisma.saaSClient.findUnique({
    where: { email: clientEmail }
  });

  if (!client) {
    return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 });
  }

  await prisma.saaSClient.update({
    where: { id: client.id },
    data: {
      partnerA: body.partnerA ?? client.partnerA,
      partnerB: body.partnerB ?? client.partnerB,
      anniversary: body.anniversary ?? client.anniversary,
      theme: body.theme ?? client.theme,
      songTitle: body.songTitle ?? client.songTitle,
      songArtist: body.songArtist ?? client.songArtist,
      songUrl: body.songUrl ?? client.songUrl,
      letterTitle: body.letterTitle ?? client.letterTitle,
      letterBody: body.letterBody ?? client.letterBody,
      photos: body.photos ?? client.photos,
      photosCount: body.photos ? body.photos.length : client.photosCount
    }
  });

  return NextResponse.json({ success: true });
}
