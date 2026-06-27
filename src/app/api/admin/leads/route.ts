import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { checkAdminApi, hasPermission } from "@/src/lib/auth-helpers/auth-helpers-server";

export async function GET() {
  const session = await checkAdminApi();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  if (!hasPermission(session, "clientes", "visualizar")) {
    return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
  }

  try {
    const usedCoupons = await prisma.coupon.findMany({
      where: { used: true },
      orderBy: { usedAt: "desc" }
    });

    const emails = usedCoupons.map(c => c.usedBy).filter((e): e is string => !!e);

    const clients = await prisma.saaSClient.findMany({
      where: { email: { in: emails } }
    });

    const clientMap = new Map(clients.map(c => [c.email, c]));

    const leads = usedCoupons.map(coupon => {
      const client = coupon.usedBy ? clientMap.get(coupon.usedBy) : null;
      return {
        id: coupon.id,
        name: client?.name || "Sem Nome",
        email: coupon.usedBy,
        emailHash: client?.emailHash || "",
        origem: coupon.origem,
        usedAt: coupon.usedAt,
        code: coupon.code
      };
    });

    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error("Erro ao buscar leads:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
