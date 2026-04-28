import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { checkAdminApi, hasPermission } from "@/src/lib/auth-helpers-server";
import { adminSchema } from "@/src/schemas/admin";
import { withAudit } from "@/src/lib/audit";

export async function GET() {
    const session = await checkAdminApi();
    if (!session) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    if (!hasPermission(session, "usuarios", "visualizar")) {
        return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    try {
        const admins = await prisma.administrator.findMany({
            orderBy: { createdAt: "asc" },
            select: {
                id: true,
                email: true,
                name: true,
                active: true,
                lastLogin: true,
                createdAt: true,
                role: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return NextResponse.json(admins);
    } catch (error) {
        console.error("Erro ao buscar administradores:", error);
        return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
    }
}

async function _POST(request: Request) {
    const session = await checkAdminApi();
    if (!session) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    if (!hasPermission(session, "usuarios", "criar")) {
        return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    try {
        const body = await request.json();

        const validated = adminSchema.safeParse(body);
        if (!validated.success) {
            return NextResponse.json({ error: validated.error.issues[0].message }, { status: 400 });
        }

        const { email, name, roleId } = validated.data;

        const exists = await prisma.administrator.findUnique({
            where: { email },
        });

        if (exists) {
            return NextResponse.json({ error: "E-mail já cadastrado" }, { status: 400 });
        }

        const admin = await prisma.administrator.create({
            data: {
                email,
                name,
                roleId: roleId ? Number(roleId) : null,
            },
            select: {
                id: true,
                email: true,
                name: true,
                active: true,
                createdAt: true,
            },
        });

        return NextResponse.json(admin, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar administrador:", error);
        return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
    }
}

export const POST = withAudit(_POST, { resource: "usuarios" });