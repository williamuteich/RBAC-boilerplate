import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { checkAdminApi, hasPermission } from "@/src/lib/auth-helpers/auth-helpers-server";
import { getClientesQuerySchema } from "@/src/schemas/clientes";

export async function GET(request: Request) {
  const session = await checkAdminApi();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  if (!hasPermission(session, "clientes", "visualizar")) {
    return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
  }

  try {
    const queryParams = Object.fromEntries(new URL(request.url).searchParams.entries());
    const validated = getClientesQuerySchema.safeParse(queryParams);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error.issues[0].message }, { status: 400 });
    }

    const { page, limit, search, status, plan } = validated.data;

    const where = {
      AND: [
        search ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
            { tributeId: { contains: search, mode: "insensitive" as const } }
          ]
        } : {},
        status ? { status } : {},
        plan ? { plan } : {}
      ]
    };

    const [clients, total, totalCount, activeCount, activeClientsPayments] = await Promise.all([
      prisma.saaSClient.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.saaSClient.count({ where }),
      prisma.saaSClient.count(),
      prisma.saaSClient.count({ where: { status: "ACTIVE" } }),
      prisma.saaSClient.findMany({
        where: { status: "ACTIVE" },
        select: { plan: true, lastPaymentValue: true }
      })
    ]);

    let mrr = 0;
    for (const client of activeClientsPayments) {
      const val = client.lastPaymentValue || 0;
      if (client.plan === "7_DAYS") {
        mrr += val * (30 / 7);
      } else if (client.plan === "14_DAYS") {
        mrr += val * (30 / 14);
      } else if (client.plan === "30_DAYS") {
        mrr += val;
      }
    }

    const activePercentage = totalCount > 0 ? (activeCount / totalCount) * 100 : 0;

    return NextResponse.json({
      clients,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      stats: {
        totalClientes: totalCount,
        mrr,
        activePercentage
      }
    });
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
