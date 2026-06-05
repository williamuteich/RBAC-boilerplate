import { z } from "zod";
import { roleSchema, adminSchema, idParamSchema, getAdminsQuerySchema } from "@/src/schemas/admin";

export type RoleInput = z.infer<typeof roleSchema>;
export type AdminInput = z.infer<typeof adminSchema>;
export type IdParamInput = z.infer<typeof idParamSchema>;
export type GetAdminsQueryInput = z.infer<typeof getAdminsQuerySchema>;

export interface Admin {
    id: number;
    email: string;
    name: string | null;
    active: boolean;
    createdAt: string;
    image: string | null;
    role: {
        id: number;
        name: string;
    } | null;
    lastLogin: string | null;
}

export interface PermissionToRole {
    permission: {
        resource: string;
        action: string;
    };
}

export interface Role {
    id: number;
    name: string;
    description: string | null;
    permissions: PermissionToRole[];
}

export interface AdminsResponse {
    admins: Admin[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface AdminFilters {
    page?: number;
    limit?: number;
    name?: string;
}