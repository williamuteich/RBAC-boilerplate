import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { checkAdminApi, hasPermission } from "@/src/lib/auth-helpers/auth-helpers-server";
import { AdminActionType } from "@/generated/prisma/client";
import { getAuditoriaQuerySchema } from "@/src/schemas/admin";

export async function GET(request: Request) {
    const session = await checkAdminApi();
    if (!session) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    if (!hasPermission(session, "auditoria", "visualizar")) {
        return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    const queryParams = Object.fromEntries(new URL(request.url).searchParams.entries());
    const validated = getAuditoriaQuerySchema.safeParse(queryParams);
    if (!validated.success) {
        return NextResponse.json({ error: validated.error.issues[0].message }, { status: 400 });
    }
    const { page, limit, resource, action, administratorId } = validated.data;

    const where = {
        ...(resource && { resource }),
        ...(action && { action: action as AdminActionType }),
        ...(administratorId && { administratorId }),
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
