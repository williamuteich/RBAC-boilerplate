import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { z } from "zod";
import { PageLimitSchema } from "@/src/schemas/admin";

export async function GET(request: Request) {
    const provided = request.headers.get("x-api-key") || request.headers.get("authorization");
    const secret = process.env.PRIVATE_API_KEY || "";

    if (!secret || !provided || (provided !== secret && provided !== `Bearer ${secret}`)) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);

    const raw: any = Object.fromEntries(searchParams.entries());
    const parsed = PageLimitSchema.safeParse(raw);
    if (!parsed.success) {
        return NextResponse.json({ error: "Parâmetros inválidos", details: parsed.error.format() }, { status: 400 });
    }

    const { page, limit } = parsed.data;

    try {
        const [items, total] = await Promise.all([
            prisma.visitor.findMany({
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.visitor.count(),
        ]);

        return NextResponse.json({ items, total, page, totalPages: Math.ceil(total / limit) });
    } catch (error) {
        console.error("Erro ao buscar visitantes (private):", error);
        return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
    }
}
