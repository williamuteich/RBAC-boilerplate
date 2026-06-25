import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { checkAdminApi, hasPermission } from "@/src/lib/auth-helpers/auth-helpers-server";
import { getCuponsQuerySchema, generateCouponsSchema } from "@/src/schemas/cupons";
import { withAudit } from "@/src/lib/auditoria/audit";

export async function GET(request: Request) {
  const session = await checkAdminApi();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  if (!hasPermission(session, "cupons", "visualizar")) {
    return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
  }

  try {
    const queryParams = Object.fromEntries(new URL(request.url).searchParams.entries());
    const validated = getCuponsQuerySchema.safeParse(queryParams);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error.issues[0].message }, { status: 400 });
    }

    const { page, limit, search, status } = validated.data;
    const now = new Date();

    const where: any = {};

    if (search) {
      where.OR = [
        { code: { contains: search, mode: "insensitive" } },
        { usedBy: { contains: search, mode: "insensitive" } }
      ];
    }

    if (status === "used") {
      where.used = true;
    } else if (status === "active") {
      where.used = false;
      where.OR = [
        { expiresAt: null },
        { expiresAt: { gt: now } }
      ];
    } else if (status === "expired") {
      where.used = false;
      where.expiresAt = { lte: now };
    }

    const [coupons, total, totalCupons, usedCupons, activeCupons] = await Promise.all([
      prisma.coupon.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" }
      }),
      prisma.coupon.count({ where }),
      prisma.coupon.count(),
      prisma.coupon.count({ where: { used: true } }),
      prisma.coupon.count({
        where: {
          used: false,
          OR: [
            { expiresAt: null },
            { expiresAt: { gt: now } }
          ]
        }
      })
    ]);

    return NextResponse.json({
      coupons,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
      stats: {
        totalCupons,
        usedCupons,
        activeCupons
      }
    });
  } catch (error) {
    console.error("Erro ao buscar cupons:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

async function _POST(request: Request) {
  const session = await checkAdminApi();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  if (!hasPermission(session, "cupons", "criar")) {
    return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const validated = generateCouponsSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error.issues[0].message }, { status: 400 });
    }

    const { quantity, prefix, expiresInDays } = validated.data;
    const durationDays = expiresInDays || 7;

    const createdCodes: string[] = [];
    const dataToCreate: any[] = [];

    for (let i = 0; i < quantity; i++) {
      const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();
      const code = `${prefix.toUpperCase()}-${randomHex}`;

      dataToCreate.push({
        code,
        used: false,
        durationDays,
        expiresAt: null
      });
      createdCodes.push(code);
    }

    await prisma.coupon.createMany({
      data: dataToCreate,
      skipDuplicates: true
    });

    return NextResponse.json({ success: true, codes: createdCodes }, { status: 201 });
  } catch (error) {
    console.error("Erro ao gerar cupons:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

export const POST = withAudit(_POST, { resource: "cupons" });
