import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { VisitorCreateSchema } from "@/src/schemas/admin";
import { corsHeaders, preflightResponse } from "@/src/lib/cors";

export async function POST(request: Request) {
    const origin = request.headers.get("origin");

    const body = await request.json();
    const parsed = VisitorCreateSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: "Dados inválidos", details: parsed.error.format() }, { status: 400 });
    }

    const data = parsed.data;

    try {
        const visitor = await prisma.visitor.upsert({
            where: { visitorId: data.visitorId },
            update: {
                gclid: data.gclid,
                utmSource: data.utmSource,
                utmCampaign: data.utmCampaign,
                converted: data.converted ?? false,
                ip: data.ip,
                userAgent: data.userAgent,
                updatedAt: new Date(),
            },
            create: {
                visitorId: data.visitorId,
                gclid: data.gclid,
                utmSource: data.utmSource,
                utmCampaign: data.utmCampaign,
                converted: data.converted ?? false,
                ip: data.ip,
                userAgent: data.userAgent,
            },
        });

        return NextResponse.json(visitor, { headers: corsHeaders(origin) });
    } catch (error) {
        console.error("Erro ao registrar visitante:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500, headers: corsHeaders(origin) });
    }
}

export async function OPTIONS(request: Request) {
    const origin = request.headers.get("origin");
    return preflightResponse(origin) as any;
}
