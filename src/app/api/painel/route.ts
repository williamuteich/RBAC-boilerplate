import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { prisma } from "@/src/lib/prisma";
import { revalidateTag } from "next/cache";
import { painelUpdateSchema } from "@/src/schemas/painel";

export async function GET() {
  const session = await getServerSession(auth);
  if (!session || session.user.tipo !== "USER") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const clientEmail = session.user.email;
  if (!clientEmail) {
    return NextResponse.json({ error: "Cliente não especificado" }, { status: 401 });
  }

  const client = await prisma.saaSClient.findUnique({
    where: { email: clientEmail }
  });

  if (!client) {
    return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 });
  }

  const isExpired = client.expirationDate && new Date(client.expirationDate) < new Date();

  if (client.status === "PENDING" || client.status === "SUSPENDED") {
    return NextResponse.json({ error: "Sua conta está pendente ou suspensa. Resgate um cupom para ativar." }, { status: 403 });
  }

  if (isExpired) {
    if (client.status === "ACTIVE") {
      await prisma.saaSClient.update({
        where: { id: client.id },
        data: { status: "SUSPENDED" },
      });
    }
    return NextResponse.json({ error: "Seu plano expirou. Resgate um novo cupom para reativar o acesso." }, { status: 403 });
  }

  return NextResponse.json({
    id: client.id,
    tributeId: client.tributeId,
    partnerA: client.partnerA,
    partnerB: client.partnerB,
    anniversary: client.anniversary,
    theme: client.theme,
    songTitle: client.songTitle,
    songArtist: client.songArtist,
    songUrl: client.songUrl,
    letterTitle: client.letterTitle,
    letterBody: client.letterBody,
    photos: client.photos,
    expirationDate: client.expirationDate,
    plan: client.plan,
  });
}

export async function PUT(req: Request) {
  const session = await getServerSession(auth);
  if (!session || session.user.tipo !== "USER") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const clientEmail = session.user.email;
  if (!clientEmail) {
    return NextResponse.json({ error: "Cliente não especificado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validated = painelUpdateSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error.issues[0].message }, { status: 400 });
    }

    const client = await prisma.saaSClient.findUnique({
      where: { email: clientEmail }
    });

    if (!client) {
      return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 });
    }

    const isExpired = client.expirationDate && new Date(client.expirationDate) < new Date();

    if (client.status === "PENDING" || client.status === "SUSPENDED") {
      return NextResponse.json({ error: "Sua conta está pendente ou suspensa. Resgate um cupom para ativar." }, { status: 403 });
    }

    if (isExpired) {
      if (client.status === "ACTIVE") {
        await prisma.saaSClient.update({ where: { id: client.id }, data: { status: "SUSPENDED" } });
      }
      return NextResponse.json({ error: "Seu plano expirou. Resgate um novo cupom para reativar o acesso." }, { status: 403 });
    }

    const data = validated.data;

    await prisma.saaSClient.update({
      where: { id: client.id },
      data: {
        partnerA: data.partnerA,
        partnerB: data.partnerB,
        anniversary: data.anniversary,
        theme: data.theme,
        songTitle: data.songTitle,
        songArtist: data.songArtist,
        songUrl: data.songUrl,
        letterTitle: data.letterTitle,
        letterBody: data.letterBody,
        photos: data.photos,
        photosCount: data.photos.length
      }
    });

    revalidateTag(`tribute-${client.tributeId}`, 'max');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao salvar dados do painel:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
