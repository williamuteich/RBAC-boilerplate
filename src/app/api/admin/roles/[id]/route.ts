import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { checkAdminApi, hasPermission } from "@/src/lib/auth-helpers-server";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await checkAdminApi();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    if (!hasPermission(session, "cargos", "deletar")) {
        return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    const { id } = await params;

    try {
        const roleToDelete = await prisma.adminRole.findUnique({
            where: { id: Number(id) }
        });

        if (roleToDelete?.name === "Admin") {
            return NextResponse.json({ error: "O cargo de Admin não pode ser removido." }, { status: 403 });
        }

        await prisma.adminRole.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Erro ao deletar cargo:", error);
        return NextResponse.json({ error: "Erro ao deletar cargo. Verifique se existem usuários vinculados." }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await checkAdminApi();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    if (!hasPermission(session, "cargos", "editar")) {
        return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    const { id } = await params;

    try {
        const roleToUpdate = await prisma.adminRole.findUnique({
            where: { id: Number(id) }
        });

        if (roleToUpdate?.name === "Admin") {
            return NextResponse.json({ error: "O cargo de Admin não pode ser alterado por aqui." }, { status: 403 });
        }

        const body = await request.json();
        const { name, description, permissions } = body;

        const role = await prisma.$transaction(async (tx) => {
            const updatedRole = await tx.adminRole.update({
                where: { id: Number(id) },
                data: { name, description },
            });

            if (permissions) {
                await tx.adminRolePermission.deleteMany({
                    where: { adminRoleId: Number(id) },
                });

                for (const perm of permissions) {
                    const permission = await tx.adminPermission.upsert({
                        where: {
                            resource_action: {
                                resource: perm.resource,
                                action: perm.action,
                            }
                        },
                        update: {},
                        create: {
                            resource: perm.resource,
                            action: perm.action,
                            description: `${perm.action} ${perm.resource}`,
                        },
                    });

                    await tx.adminRolePermission.create({
                        data: {
                            adminRoleId: updatedRole.id,
                            adminPermissionId: permission.id,
                        },
                    });
                }
            }

            return updatedRole;
        });

        return NextResponse.json(role);
    } catch (error) {
        console.error("Erro ao atualizar cargo:", error);
        return NextResponse.json({ error: "Erro ao atualizar cargo" }, { status: 500 });
    }
}
