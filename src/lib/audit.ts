import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { checkAdminApi } from "@/src/lib/auth-helpers-server";

type AnyContext = { params?: Promise<Record<string, string>> };
type RouteHandler<Ctx extends AnyContext = AnyContext> = (
    req: Request,
    ctx: Ctx
) => Promise<NextResponse>;

interface AuditOptions<Ctx extends AnyContext = AnyContext> {
    resource: string;
    getResourceId?: (ctx: Ctx) => Promise<string | undefined> | string | undefined;
    getResourceName?: (data: unknown) => string | undefined;
}

const METHOD_TO_ACTION: Record<string, string | undefined> = {
    POST: "CREATE",
    PUT: "UPDATE",
    PATCH: "UPDATE",
    DELETE: "DELETE",
};

export function withAudit<Ctx extends AnyContext = AnyContext>(
    handler: RouteHandler<Ctx>,
    options: AuditOptions<Ctx>
): RouteHandler<Ctx> {
    return async (req: Request, ctx: Ctx): Promise<NextResponse> => {
        const response = await handler(req, ctx);

        const action = METHOD_TO_ACTION[req.method];
        const isSuccess = response.status >= 200 && response.status < 300;

        if (action && isSuccess) {
            const session = await checkAdminApi();

            if (session?.user?.id) {
                const administratorId = session.user.id; // already a string (ObjectId)
                const resourceId = options.getResourceId
                    ? await options.getResourceId(ctx)
                    : undefined;

                let resourceName: string | undefined;
                try {
                    const data = await response.clone().json();
                    resourceName = options.getResourceName
                        ? options.getResourceName(data)
                        : ((data as Record<string, unknown>)?.name as string ||
                          (data as Record<string, unknown>)?.email as string);
                } catch (_e) {}

                prisma.logAdmin
                    .create({
                        data: {
                            administratorId,
                            action,
                            resource: options.resource,
                            resourceId: resourceId ?? null,
                            resourceName: resourceName ?? null,
                            url: `/${options.resource}`,
                        },
                    })
                    .catch((err) =>
                        console.error("[Audit] Erro ao salvar log de auditoria:", err)
                    );
            }
        }

        return response;
    };
}
