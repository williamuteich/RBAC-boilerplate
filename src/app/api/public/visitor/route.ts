import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { VisitorCreateSchema } from "@/src/schemas/admin";

export async function POST(request: Request) {
    const body = await request.json();

    const parsed = VisitorCreateSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: "Dados inválidos", details: parsed.error.format() }, { status: 400 });
    }

    const data = parsed.data;

    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = (request as any).ip || 
               request.headers.get("cf-connecting-ip") ||
               (forwardedFor ? forwardedFor.split(',')[0].trim() : null) || 
               request.headers.get("x-real-ip") || 
               data.ip || 
               "0.0.0.0";

    try {
        const visitor = await prisma.visitor.upsert({
            where: { visitorId: data.visitorId },
            update: {
                gclid: data.gclid,
                utmSource: data.utmSource,
                utmCampaign: data.utmCampaign,
                converted: data.converted === true ? true : undefined,
                ip: ip,
                userAgent: data.userAgent,
                updatedAt: new Date(),
            },
            create: {
                visitorId: data.visitorId,
                gclid: data.gclid,
                utmSource: data.utmSource,
                utmCampaign: data.utmCampaign,
                converted: data.converted === true,
                ip: ip,
                userAgent: data.userAgent,
            },
        });

        return NextResponse.json(visitor);
    } catch {
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}

export async function OPTIONS() {
    return new NextResponse(null, { status: 204 });
}
