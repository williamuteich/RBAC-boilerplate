import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { prisma } from "@/src/lib/prisma";

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

    const client = await prisma.saaSClient.findUnique({ where: { id: clientId } });
    if (!client) {
      return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 });
    }
    if (client.status === "ACTIVE") {
      return NextResponse.json({ error: "Sua conta já está ativa" }, { status: 400 });
    }
    if (client.status === "CANCELLED") {
      return NextResponse.json({ error: "Conta cancelada, entre em contato com o suporte" }, { status: 403 });
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

    await prisma.$transaction([
      prisma.coupon.update({
        where: { id: coupon.id },
        data: {
          used: true,
          usedAt: new Date(),
          usedBy: client.email,
        },
      }),
      prisma.saaSClient.update({
        where: { id: clientId },
        data: { status: "ACTIVE" },
      }),
    ]);

    return NextResponse.json({ success: true, message: "Cupom resgatado com sucesso! Sua conta está ativa." });
  } catch (error) {
    console.error("Erro ao resgatar cupom:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
