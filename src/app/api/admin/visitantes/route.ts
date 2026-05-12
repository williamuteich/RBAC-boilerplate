import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { checkAdminApi, hasPermission } from "@/src/lib/auth-helpers-server";
import { VisitorListQuerySchema } from "@/src/schemas/admin";

export async function GET(request: Request) {
    const session = await checkAdminApi();
    if (!session) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    if (!hasPermission(session, "visitantes", "visualizar")) {
        return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);

    const raw: any = Object.fromEntries(searchParams.entries());
    const parsed = VisitorListQuerySchema.safeParse(raw);
    if (!parsed.success) {
        return NextResponse.json({ error: "Parâmetros inválidos", details: parsed.error.format() }, { status: 400 });
    }

    const { page, limit, visitorId, gclid, converted } = parsed.data;
    const convertedBool = converted === undefined ? undefined : converted === "true";

    const where: any = {
        ...(visitorId && { visitorId: { contains: visitorId, mode: "insensitive" } }),
        ...(gclid && { gclid: { contains: gclid, mode: "insensitive" } }),
        ...(typeof convertedBool !== "undefined" && { converted: convertedBool }),
    };

    try {
        const [items, total] = await Promise.all([
            prisma.visitor.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * limit,
                take: limit,
                select: {
                    id: true,
                    visitorId: true,
                    gclid: true,
                    utmSource: true,
                    utmCampaign: true,
                    converted: true,
                    ip: true,
                    userAgent: true,
                    createdAt: true,
                },
            }),
            prisma.visitor.count({ where }),
        ]);

        return NextResponse.json({ items, total, page, totalPages: Math.ceil(total / limit) });
    } catch (error) {
        console.error("Erro ao buscar visitantes:", error);
        return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
    }
}
