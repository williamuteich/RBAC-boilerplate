import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { checkAdminApi, hasPermission } from "@/src/lib/auth-helpers/auth-helpers-server";
import { adminSchema, idParamSchema } from "@/src/schemas/admin";
import { withAudit } from "@/src/lib/auditoria/audit";

async function _DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await checkAdminApi();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    if (!hasPermission(session, "usuarios", "deletar")) {
        return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    const validatedParams = idParamSchema.safeParse(await params);
    if (!validatedParams.success) {
        return NextResponse.json({ error: validatedParams.error.issues[0].message }, { status: 400 });
    }
    const { id } = validatedParams.data;

    try {
        const adminToDelete = await prisma.administrator.findUnique({
            where: { id },
            include: { role: true }
        });

        if (adminToDelete?.role?.name === "Admin") {
            return NextResponse.json({ error: "O cargo de Admin não pode ser removido." }, { status: 403 });
        }

        await prisma.administrator.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Erro ao deletar administrador:", error);
        return NextResponse.json({ error: "Erro ao deletar" }, { status: 500 });
    }
}

const getIdFromCtx = async (ctx: { params?: Promise<{ id: string }> }) =>
    (await ctx.params!).id;

export const DELETE = withAudit(_DELETE, { resource: "usuarios", getResourceId: getIdFromCtx });

async function _PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await checkAdminApi();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    if (!hasPermission(session, "usuarios", "editar")) {
        return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    const validatedParams = idParamSchema.safeParse(await params);
    if (!validatedParams.success) {
        return NextResponse.json({ error: validatedParams.error.issues[0].message }, { status: 400 });
    }
    const { id } = validatedParams.data;

    try {
        const adminToUpdate = await prisma.administrator.findUnique({
            where: { id },
            include: { role: true }
        });

        if (adminToUpdate?.role?.name === "Admin") {
            return NextResponse.json({ error: "O cargo de Admin não pode ser alterado por aqui." }, { status: 403 });
        }

        const body = await request.json();

        const validated = adminSchema.safeParse(body);
        if (!validated.success) {
            return NextResponse.json({ error: validated.error.issues[0].message }, { status: 400 });
        }

        const { email, name, roleId, active } = validated.data;

        const currentAdminId = Number(session.user.id);
        const isMasterAdmin = session.user.permissions?.includes("all:all");

        if (id === currentAdminId) {
            if (roleId && Number(roleId) !== adminToUpdate?.roleId) {
                return NextResponse.json({ error: "Você não pode alterar seu próprio cargo." }, { status: 400 });
            }
            if (active !== undefined && active !== adminToUpdate?.active) {
                return NextResponse.json({ error: "Você não pode alterar seu próprio status de atividade." }, { status: 400 });
            }
        }

        if (roleId && Number(roleId) !== adminToUpdate?.roleId) {
            const targetRole = await prisma.adminRole.findUnique({
                where: { id: Number(roleId) }
            });
            if (targetRole?.name === "Admin" && !isMasterAdmin) {
                return NextResponse.json({ error: "Apenas administradores masters podem atribuir o cargo de Admin." }, { status: 403 });
            }
        }

        const admin = await prisma.administrator.update({
            where: { id },
            data: {
                email,
                name,
                roleId: roleId ? Number(roleId) : null,
                active,
            },
        });

        return NextResponse.json(admin);
    } catch (error) {
        console.error("Erro ao atualizar administrador:", error);
        return NextResponse.json({ error: "Erro ao atualizar" }, { status: 500 });
    }
}

export const PUT = withAudit(_PUT, { resource: "usuarios", getResourceId: getIdFromCtx });
