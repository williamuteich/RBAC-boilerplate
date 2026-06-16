import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { checkAdminApi, hasPermission } from "@/src/lib/auth-helpers/auth-helpers-server";
import { roleSchema, idParamSchema } from "@/src/schemas/admin";
import { withAudit } from "@/src/lib/auditoria/audit";

async function _DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await checkAdminApi();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    if (!hasPermission(session, "cargos", "deletar")) {
        return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    const validatedParams = idParamSchema.safeParse(await params);
    if (!validatedParams.success) {
        return NextResponse.json({ error: validatedParams.error.issues[0].message }, { status: 400 });
    }
    const { id } = validatedParams.data;

    try {
        const roleToDelete = await prisma.adminRole.findUnique({
            where: { id }
        });

        if (roleToDelete?.name === "Admin") {
            return NextResponse.json({ error: "O cargo de Admin não pode ser removido." }, { status: 403 });
        }

        await prisma.adminRole.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Erro ao deletar cargo:", error);
        return NextResponse.json({ error: "Erro ao deletar cargo. Verifique se existem usuários vinculados." }, { status: 500 });
    }
}

const getIdFromCtx = async (ctx: { params?: Promise<{ id: string }> }) =>
    (await ctx.params!).id;

export const DELETE = withAudit(_DELETE, { resource: "cargos", getResourceId: getIdFromCtx });

async function _PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await checkAdminApi();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    if (!hasPermission(session, "cargos", "editar")) {
        return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    const validatedParams = idParamSchema.safeParse(await params);
    if (!validatedParams.success) {
        return NextResponse.json({ error: validatedParams.error.issues[0].message }, { status: 400 });
    }
    const { id } = validatedParams.data;

    try {
        const roleToUpdate = await prisma.adminRole.findUnique({
            where: { id }
        });

        if (roleToUpdate?.name === "Admin") {
            return NextResponse.json({ error: "O cargo de Admin não pode ser alterado por aqui." }, { status: 403 });
        }

        const body = await request.json();

        const validated = roleSchema.safeParse(body);
        if (!validated.success) {
            return NextResponse.json({ error: validated.error.issues[0].message }, { status: 400 });
        }

        const { name, description, permissions } = validated.data;

        const updatedRole = await prisma.adminRole.update({
            where: { id },
            data: {
                name,
                description,
                permissions: permissions || [],
            },
        });

        const rawPermissions = updatedRole.permissions as Array<{ resource: string, action: string }> || [];
        const roleResponse = {
            id: updatedRole.id,
            name: updatedRole.name,
            description: updatedRole.description,
            permissions: rawPermissions.map(p => ({
                permission: {
                    resource: p.resource,
                    action: p.action
                }
            }))
        };

        return NextResponse.json(roleResponse);
    } catch (error) {
        console.error("Erro ao atualizar cargo:", error);
        return NextResponse.json({ error: "Erro ao atualizar cargo" }, { status: 500 });
    }
}

export const PUT = withAudit(_PUT, { resource: "cargos", getResourceId: getIdFromCtx });
