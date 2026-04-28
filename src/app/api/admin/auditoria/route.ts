import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { checkAdminApi, hasPermission } from "@/src/lib/auth-helpers-server";

export async function GET(request: Request) {
    const session = await checkAdminApi();
    if (!session) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    if (!hasPermission(session, "auditoria", "visualizar")) {
        return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? "20")));
    const resource = searchParams.get("resource") || undefined;
    const action = searchParams.get("action") || undefined;
    const userName = searchParams.get("userName") || undefined;
    const administratorId = searchParams.get("administratorId")
        ? Number(searchParams.get("administratorId"))
        : undefined;

    const where = {
        ...(resource && { resource }),
        ...(action && { action: action as any }),
        ...(administratorId && { administratorId }),
        ...(userName && {
            administrator: {
                name: {
                    contains: userName,
                    mode: "insensitive" as const,
                },
            },
        }),
    };

    try {
        const [logs, total] = await Promise.all([
            prisma.logAdmin.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * limit,
                take: limit,
                select: {
                    id: true,
                    action: true,
                    resource: true,
                    resourceId: true,
                    resourceName: true,
                    url: true,
                    createdAt: true,
                    administrator: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            role: {
                                select: { name: true },
                            },
                        },
                    },
                },
            }),
            prisma.logAdmin.count({ where }),
        ]);

        return NextResponse.json({
            logs,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error("Erro ao buscar logs de auditoria:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}
