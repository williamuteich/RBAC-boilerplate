import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { checkAdminApi, hasPermission } from "@/src/lib/auth-helpers-server";
import { pacienteSchema, pacienteQuerySchema } from "@/src/schemas/paciente";
import { withAudit } from "@/src/lib/audit";

export async function GET(request: Request) {
    const session = await checkAdminApi();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    if (!hasPermission(session, "pacientes", "visualizar")) {
        return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const validated = pacienteQuerySchema.safeParse(Object.fromEntries(searchParams.entries()));
    if (!validated.success) return NextResponse.json({ error: "Parâmetros inválidos" }, { status: 400 });

    const { page, limit, name, cpf } = validated.data;

    const where = {
        ...(name && { name: { contains: name, mode: "insensitive" as const } }),
        ...(cpf && { cpf: { contains: cpf } }),
    };

    const [pacientes, total] = await Promise.all([
        prisma.paciente.findMany({
            where,
            orderBy: { name: "asc" },
            skip: (page - 1) * limit,
            take: limit,
            select: {
                id: true,
                name: true,
                cpf: true,
                birthDate: true,
                phone: true,
                zipCode: true,
                state: true,
                city: true,
                street: true,
                number: true,
                complement: true,
                active: true,
                createdAt: true,
                updatedAt: true,
            },
        }),
        prisma.paciente.count({ where }),
    ]);

    return NextResponse.json({
        pacientes,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        limit,
    });
}

async function _POST(request: Request) {
    const session = await checkAdminApi();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    if (!hasPermission(session, "pacientes", "criar")) {
        return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    try {
        const body = await request.json();
        const validated = pacienteSchema.safeParse(body);
        if (!validated.success) {
            return NextResponse.json({ error: validated.error.issues[0].message }, { status: 400 });
        }

        const { birthDate, ...rest } = validated.data;
        const paciente = await prisma.paciente.create({
            data: { ...rest, birthDate: new Date(birthDate) },
        });

        return NextResponse.json(paciente, { status: 201 });
    } catch (error: any) {
        if (error.code === "P2002") return NextResponse.json({ error: "CPF já cadastrado" }, { status: 400 });
        console.error("Erro ao criar paciente:", error);
        return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
    }
}

export const POST = withAudit(_POST, {
    resource: "pacientes",
    getResourceName: (data: any) => data.name,
});
