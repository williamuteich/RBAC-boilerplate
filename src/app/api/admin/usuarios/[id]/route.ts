import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { checkAdminApi, hasPermission } from "@/src/lib/auth-helpers-server";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await checkAdminApi();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    if (!hasPermission(session, "usuarios", "deletar")) {
        return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    const { id } = await params;

    try {
        const adminToDelete = await prisma.administrator.findUnique({
            where: { id: Number(id) },
            include: { role: true }
        });

        if (adminToDelete?.role?.name === "Admin") {
            return NextResponse.json({ error: "O cargo de Admin não pode ser removido." }, { status: 403 });
        }

        await prisma.administrator.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Erro ao deletar administrador:", error);
        return NextResponse.json({ error: "Erro ao deletar" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await checkAdminApi();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    if (!hasPermission(session, "usuarios", "editar")) {
        return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    const { id } = await params;

    try {
        const adminToUpdate = await prisma.administrator.findUnique({
            where: { id: Number(id) },
            include: { role: true }
        });

        if (adminToUpdate?.role?.name === "Admin") {
            return NextResponse.json({ error: "O cargo de Admin não pode ser alterado por aqui." }, { status: 403 });
        }

        const body = await request.json();
        const { email, name, roleId, active } = body;

        const admin = await prisma.administrator.update({
            where: { id: Number(id) },
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
