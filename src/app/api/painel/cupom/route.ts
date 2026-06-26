import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { prisma } from "@/src/lib/prisma";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const session = await getServerSession(auth);
  if (!session || session.user.tipo !== "USER") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const clientId = Number(session.user.id);
  if (!clientId) {
    return NextResponse.json({ error: "Usuário inválido" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const code = String(body.code || "").trim().toUpperCase();

    if (!code) {
      return NextResponse.json({ error: "Código do cupom é obrigatório" }, { status: 400 });
    }

    const client = await prisma.saaSClient.findUnique({
      where: { id: clientId },
      include: { tribute: true }
    });
    if (!client) {
      return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 });
    }

    const isExpired = client.expirationDate && new Date(client.expirationDate) < new Date();
    const canRedeem =
      client.status === "PENDING" ||
      client.status === "SUSPENDED" ||
      (client.status === "ACTIVE" && isExpired);

    if (!canRedeem) {
      return NextResponse.json(
        { error: "Sua conta ainda está ativa. Você pode resgatar um novo cupom após o término do seu plano atual." },
        { status: 400 }
      );
    }

    const coupon = await prisma.coupon.findUnique({ where: { code } });

    if (!coupon) {
      return NextResponse.json({ error: "Cupom inválido ou não encontrado" }, { status: 404 });
    }
    if (coupon.used) {
      return NextResponse.json({ error: "Este cupom já foi utilizado" }, { status: 400 });
    }
    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      return NextResponse.json({ error: "Este cupom está expirado" }, { status: 400 });
    }

    const now = new Date();
    const baseDate =
      client.expirationDate && new Date(client.expirationDate) > now
        ? new Date(client.expirationDate)
        : now;

    const newExpirationDate = new Date(baseDate.getTime() + coupon.durationDays * 24 * 60 * 60 * 1000);

    await prisma.$transaction([
      prisma.coupon.update({
        where: { id: coupon.id },
        data: {
          used: true,
          usedAt: now,
          usedBy: client.email,
        },
      }),
      prisma.saaSClient.update({
        where: { id: clientId },
        data: {
          status: "ACTIVE",
          plan: `${coupon.durationDays}_DAYS`,
          expirationDate: newExpirationDate,
        },
      }),
    ]);

    if (client.tribute) {
      revalidateTag(`tribute-${client.tribute.tributeId}`, 'max');
    }

    const formattedDate = newExpirationDate.toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return NextResponse.json({
      success: true,
      message: `Cupom resgatado com sucesso! Seu acesso está ativo até ${formattedDate}.`,
    });
  } catch (error) {
    console.error("Erro ao resgatar cupom:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
