import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { checkAdminApi } from "@/src/lib/auth-helpers-server";
import { AdminActionType } from "@/generated/prisma/client";
import { AnyContext, RouteHandler, AuditOptions } from "@/src/types/dashboard/audit";

const METHOD_TO_ACTION: Record<string, AdminActionType | undefined> = {
    POST: AdminActionType.CREATE,
    PUT: AdminActionType.UPDATE,
    PATCH: AdminActionType.UPDATE,
    DELETE: AdminActionType.DELETE,
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
                const adminId = Number(session.user.id);
                const resourceId = options.getResourceId
                    ? await options.getResourceId(ctx)
                    : undefined;

                let resourceName: string | undefined;
                try {
                    const data = await response.clone().json();
                    resourceName = options.getResourceName ? options.getResourceName(data) : ((data as Record<string, unknown>)?.name as string || (data as Record<string, unknown>)?.email as string);
                } catch (e) { }

                prisma.logAdmin
                    .create({
                        data: {
                            administratorId: adminId,
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

