import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { checkAdminApi, hasPermission } from "@/src/lib/auth-helpers-server";
import { withAudit } from "@/src/lib/audit";
import { encrypt, decrypt } from "@/src/lib/encrypted-fields";
import { odontogramSchema } from "@/src/schemas/odontograma";

type Ctx = { params: Promise<{ id: string }> };
const getId = async (ctx: Ctx) => (await ctx.params).id;

const ENCRYPTED_FIELDS = [
    { name: "customName", action: encrypt, shouldProcess: (val: string) => !val.includes(":") && val.trim() !== "" },
    { name: "notes", action: encrypt, shouldProcess: (val: string) => !val.includes(":") && val.trim() !== "" },
] as const;

const DECRYPT_FIELDS = [
    { name: "customName", action: decrypt, shouldProcess: (val: string) => val.includes(":") && val.trim() !== "" },
    { name: "notes", action: decrypt, shouldProcess: (val: string) => val.includes(":") && val.trim() !== "" },
] as const;

async function processData(data: any, fields: typeof ENCRYPTED_FIELDS | typeof DECRYPT_FIELDS): Promise<any> {
    if (!data) return data;

    if (Array.isArray(data)) {
        return Promise.all(data.map(item => processData(item, fields)));
    }

    const res = { ...data };
    for (const field of fields) {
        const val = res[field.name];
        if (typeof val === "string" && val.trim() !== "" && field.shouldProcess(val)) {
            try {
                res[field.name] = await field.action(val);
            } catch (error) {
                console.error("Erro ao criptografar/descriptografar campo", field.name, "valor", val, "erro", error);
                throw error;
            }
        }
    }
    return res;
}

const encryptData = (data: any) => processData(data, ENCRYPTED_FIELDS);
const decryptData = (data: any) => processData(data, DECRYPT_FIELDS);

export async function GET(_req: Request, ctx: Ctx) {
    const session = await checkAdminApi();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    if (!hasPermission(session, "pacientes", "visualizar")) {
        return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    const id = await getId(ctx);
    const odontogram = await prisma.odontogram.findUnique({
        where: { patientId: id }
    });

    if (!odontogram) {
        return NextResponse.json({ message: "Odontograma não encontrado" }, { status: 404 });
    }

    return NextResponse.json(await decryptData(odontogram));
}

async function _POST(request: Request, ctx: Ctx) {
    const session = await checkAdminApi();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    if (!hasPermission(session, "pacientes", "editar")) {
        return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    try {
        const id = await getId(ctx);
        const body = await request.json();
        const validated = odontogramSchema.safeParse({ ...body, patientId: id });
        if (!validated.success) {
            return NextResponse.json({ error: validated.error.issues[0].message }, { status: 400 });
        }

        const encryptedBody = await encryptData(validated.data);

        const odontogram = await prisma.odontogram.create({
            data: {
                patientId: id,
                ...encryptedBody
            },
        });

        return NextResponse.json(await decryptData(odontogram), { status: 201 });
    } catch (error: any) {
        console.error("Erro ao criar odontograma:", error);
        return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
    }
}

export const POST = withAudit(_POST, {
    resource: "paciente/odontograma",
    getResourceId: getId,
    getResourceName: async (data: any) => {
        const p = await prisma.patient.findUnique({ where: { id: data.patientId }, select: { name: true } });
        return p?.name || "Odontograma";
    },
    getUrl: async (ctx) => {
        const params = await ctx.params;
        return `/admin/pacientes/${params.id}?tab=odontograma`;
    }
});

async function _PUT(request: Request, ctx: Ctx) {
    const session = await checkAdminApi();
    if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    if (!hasPermission(session, "pacientes", "editar")) {
        return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    try {
        const body = await request.json();
        const { odontogramId, ...rest } = body;

        if (!odontogramId || !rest) {
            return NextResponse.json({ error: "Parâmetros inválidos" }, { status: 400 });
        }

        const encryptedBody = await encryptData(rest);

        const updatedOdontogram = await prisma.odontogram.update({
            where: { id: odontogramId },
            data: encryptedBody,
        });

        return NextResponse.json(await decryptData(updatedOdontogram));
    } catch (error: any) {
        console.error("Erro ao atualizar odontograma:", error);
        return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
    }
}

export const PUT = withAudit(_PUT, {
    resource: "paciente/odontograma",
    getResourceId: getId,
    getResourceName: async (data: any) => {
        const p = await prisma.patient.findUnique({ where: { id: data.patientId }, select: { name: true } });
        return p?.name || "Odontograma";
    },
    getUrl: async (ctx) => {
        const params = await ctx.params;
        return `/admin/pacientes/${params.id}?tab=odontograma`;
    }
});

