import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { checkAdminApi, hasPermission } from "@/src/lib/auth-helpers-server";
import { pacienteSchema } from "@/src/schemas/paciente";
import { withAudit } from "@/src/lib/audit";

type Ctx = { params: Promise<{ id: string }> };
const getId = async (ctx: Ctx) => (await ctx.params).id;

export async function GET(_req: Request, ctx: Ctx) {
    const session = await checkAdminApi();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    if (!hasPermission(session, "pacientes", "visualizar")) {
        return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    const id = await getId(ctx);
    const paciente = await prisma.paciente.findUnique({
        where: { id },
    });

    if (!paciente) return NextResponse.json({ error: "Paciente não encontrado" }, { status: 404 });
    return NextResponse.json(paciente);
}

async function _PUT(request: Request, ctx: Ctx) {
    const session = await checkAdminApi();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    if (!hasPermission(session, "pacientes", "editar")) {
        return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    try {
        const id = await getId(ctx);
        const body = await request.json();
        const validated = pacienteSchema.safeParse(body);
        if (!validated.success) {
            return NextResponse.json({ error: validated.error.issues[0].message }, { status: 400 });
        }

        const { dataNascimento, ...rest } = validated.data;
        const paciente = await prisma.paciente.update({
            where: { id },
            data: { ...rest, dataNascimento: new Date(dataNascimento) },
        });

        return NextResponse.json(paciente);
    } catch (error: any) {
        if (error.code === "P2002") return NextResponse.json({ error: "CPF já cadastrado" }, { status: 400 });
        if (error.code === "P2025") return NextResponse.json({ error: "Paciente não encontrado" }, { status: 404 });
        return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
    }
}

async function _DELETE(_req: Request, ctx: Ctx) {
    const session = await checkAdminApi();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    if (!hasPermission(session, "pacientes", "deletar")) {
        return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    const id = await getId(ctx);
    try {
        await prisma.paciente.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Paciente não encontrado" }, { status: 404 });
    }
}

export const PUT = withAudit(_PUT, { resource: "pacientes", getResourceId: getId });
export const DELETE = withAudit(_DELETE, { resource: "pacientes", getResourceId: getId });
