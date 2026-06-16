import { z } from "zod";
import { getAuditoriaQuerySchema } from "@/src/schemas/admin";
import { NextResponse } from "next/server";

export type GetAuditoriaQueryInput = z.infer<typeof getAuditoriaQuerySchema>;

export type AnyContext = { params?: Promise<Record<string, string>> };
export type RouteHandler<Ctx extends AnyContext = AnyContext> = (
    req: Request,
    ctx: Ctx
) => Promise<NextResponse>;

export interface AuditOptions<Ctx extends AnyContext = AnyContext> {
    resource: string;
    getResourceId?: (ctx: Ctx) => Promise<string | undefined> | string | undefined;
    getResourceName?: (data: unknown) => string | undefined;
}

export interface AuditLog {
    id: number;
    action: "CREATE" | "UPDATE" | "DELETE";
    resource: string | null;
    resourceId: string | null;
    resourceName: string | null;
    url: string | null;
    createdAt: string;
    administrator: {
        id: number;
        name: string | null;
        email: string;
        role: {
            name: string;
        } | null;
    };
}

export interface AuditLogsResponse {
    logs: AuditLog[];
    total: number;
    page: number;
    totalPages: number;
}

export interface AuditFilters {
    page?: number;
    limit?: number;
    resource?: string;
    action?: string;
    administratorId?: number;
}