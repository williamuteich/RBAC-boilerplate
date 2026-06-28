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
    where: { email: clientEmail },
    include: { tribute: true }
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
    tributeId: client.tribute?.tributeId ?? "",
    partnerA: client.tribute?.partnerA ?? "Lucas",
    partnerB: client.tribute?.partnerB ?? "Gabriela",
    anniversary: client.tribute?.anniversary ?? "12/06/2023",
    theme: client.tribute?.theme ?? "spotify",
    songTitle: client.tribute?.songTitle ?? "Nossa Música",
    songArtist: client.tribute?.songArtist ?? "Nossa História",
    songUrl: client.tribute?.songUrl ?? "https://www.youtube.com/watch?v=yKNxeF4Kxyc",
    letterTitle: client.tribute?.letterTitle ?? "Para Minha Vida,",
    letterBody: client.tribute?.letterBody ?? "",
    photos: client.tribute?.photos ?? [],
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
      where: { email: clientEmail },
      include: { tribute: true }
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

    const updatedTribute = await prisma.tribute.upsert({
      where: { saasClientId: client.id },
      create: {
        saasClientId: client.id,
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
      },
      update: {
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

    revalidateTag(`tribute-${updatedTribute.tributeId}`, 'max');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao salvar dados do painel:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
