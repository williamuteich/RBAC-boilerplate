import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { VisitorConfirmSchema } from "@/src/schemas/admin";
import { corsHeaders, preflightResponse } from "@/src/lib/cors";

export async function POST(request: Request) {
    const origin = request.headers.get("origin");
    const body = await request.json();
    console.log("[public/visitor/confirm] request received", {
        origin,
        body,
    });

    const parsed = VisitorConfirmSchema.safeParse(body);

    if (!parsed.success) {
        console.warn("[public/visitor/confirm] invalid payload", {
            origin,
            issues: parsed.error.issues,
        });
        return NextResponse.json(
            { error: "Dados inválidos", details: parsed.error.format() },
            { status: 400 }
        );
    }

    const data = parsed.data;
    console.log("[public/visitor/confirm] parsed payload", {
        origin,
        visitorId: data.visitorId,
        gclid: data.gclid,
        utmSource: data.utmSource,
        utmCampaign: data.utmCampaign,
        converted: true,
    });

    try {
        const visitor = await prisma.visitor.upsert({
            where: { visitorId: data.visitorId },
            update: {
                gclid: data.gclid,
                utmSource: data.utmSource,
                utmCampaign: data.utmCampaign,
                converted: true,
                ip: data.ip,
                userAgent: data.userAgent,
            },
            create: {
                visitorId: data.visitorId,
                gclid: data.gclid,
                utmSource: data.utmSource,
                utmCampaign: data.utmCampaign,
                converted: true,
                ip: data.ip,
                userAgent: data.userAgent,
            },
        });

        console.log("[public/visitor/confirm] saved confirmation", {
            visitorId: visitor.visitorId,
            converted: visitor.converted,
        });

        return NextResponse.json(visitor, { headers: corsHeaders(origin) });
    } catch (error) {
        console.error("Erro ao confirmar visitante:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500, headers: corsHeaders(origin) });
    }
}

export async function OPTIONS(request: Request) {
    const origin = request.headers.get("origin");
    return preflightResponse(origin) as any;
}
