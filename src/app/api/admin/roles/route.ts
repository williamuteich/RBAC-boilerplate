import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { checkAdminApi, hasPermission } from "@/src/lib/auth-helpers/auth-helpers-server";
import { roleSchema } from "@/src/schemas/admin";
import { withAudit } from "@/src/lib/auditoria/audit";

export async function GET() {
    const session = await checkAdminApi();
    if (!session) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    try {
        const roles = await prisma.adminRole.findMany({
            orderBy: { name: "asc" }
        });

        const mappedRoles = roles.map(role => {
            const rawPermissions = role.permissions as Array<{ resource: string, action: string }> || [];
            return {
                id: role.id,
                name: role.name,
                description: role.description,
                permissions: rawPermissions.map(p => ({
                    permission: {
                        resource: p.resource,
                        action: p.action
                    }
                }))
            };
        });

        return NextResponse.json(mappedRoles);
    } catch (error) {
        console.error("Erro ao buscar cargos:", error);
        return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
    }
}

async function _POST(request: Request) {
    const session = await checkAdminApi();
    if (!session) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    if (!hasPermission(session, "cargos", "criar")) {
        return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    try {
        const body = await request.json();

        const validated = roleSchema.safeParse(body);
        if (!validated.success) {
            return NextResponse.json({ error: validated.error.issues[0].message }, { status: 400 });
        }

        const { name, description, permissions } = validated.data;

        const newRole = await prisma.adminRole.create({
            data: { 
                name, 
                description,
                permissions: permissions || []
            },
        });

        const rawPermissions = newRole.permissions as Array<{ resource: string, action: string }> || [];
        const roleResponse = {
            id: newRole.id,
            name: newRole.name,
            description: newRole.description,
            permissions: rawPermissions.map(p => ({
                permission: {
                    resource: p.resource,
                    action: p.action
                }
            }))
        };

        return NextResponse.json(roleResponse, { status: 201 });
    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "Cargo já existe" }, { status: 400 });
        }
        console.error("Erro ao criar cargo:", error);
        return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
    }
}

export const POST = withAudit(_POST, { resource: "cargos" });