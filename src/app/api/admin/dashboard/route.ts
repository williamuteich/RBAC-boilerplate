import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { checkAdminApi } from "@/src/lib/auth-helpers/auth-helpers-server";

export async function GET() {
  const session = await checkAdminApi();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const clientsCount = await prisma.saaSClient.count();
    const activeClientsCount = await prisma.saaSClient.count({
      where: { status: "ACTIVE" }
    });
    const adminsCount = await prisma.administrator.count();
    const couponsCount = await prisma.coupon.count();
    const usedCouponsCount = await prisma.coupon.count({
      where: { used: true }
    });

    const totalRevenueAggregate = await prisma.saaSClient.aggregate({
      _sum: {
        lastPaymentValue: true
      }
    });
    const totalRevenue = totalRevenueAggregate._sum.lastPaymentValue || 0;

    const recentLogsRaw = await prisma.logAdmin.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        administrator: {
          select: { name: true, email: true }
        }
      }
    });

    const recentLogs = recentLogsRaw.map(log => ({
      id: log.id,
      action: log.action,
      resource: log.resource,
      resourceName: log.resourceName,
      createdAt: log.createdAt,
      administrator: {
        name: log.administrator.name,
        email: log.administrator.email
      }
    }));

    const now = new Date();
    const monthsData = Array.from({ length: 6 }).map((_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      return {
        monthStart: new Date(d.getFullYear(), d.getMonth(), 1),
        monthEnd: new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59),
        name: d.toLocaleString("pt-BR", { month: "short" }).replace(".", ""),
        clientes: 0
      };
    }).reverse();

    for (const month of monthsData) {
      const count = await prisma.saaSClient.count({
        where: {
          createdAt: {
            gte: month.monthStart,
            lte: month.monthEnd
          }
        }
      });
      month.clientes = count;
    }

    const chartData = monthsData.map(m => ({
      name: m.name.charAt(0).toUpperCase() + m.name.slice(1),
      clientes: m.clientes
    }));

    return NextResponse.json({
      success: true,
      stats: {
        clientsCount,
        activeClientsCount,
        adminsCount,
        couponsCount,
        usedCouponsCount,
        totalRevenue
      },
      recentLogs,
      chartData
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
