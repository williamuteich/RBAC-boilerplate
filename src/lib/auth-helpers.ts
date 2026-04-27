import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { redirect } from "next/navigation";

type AppSession = Awaited<ReturnType<typeof getServerSession<typeof auth>>>;

// Para Server Components
export async function requireAdminContext() {
    const session = await getServerSession(auth);
    if (!session || session.user.tipo !== "ADMINISTRATOR") {
        redirect("/");
    }
    return session;
}

// Para API Routes
export async function checkAdminApi() {
    const session = await getServerSession(auth);
    if (!session || session.user.tipo !== "ADMINISTRATOR") {
        return null;
    }
    return session;
}

// Checa permissão granular
export function hasPermission(
    session: AppSession,
    resource: string,
    action: string
): boolean {
    if (!session) return false;
    const perms = session.user.permissions;
    // all:all = super admin sem cargo, acesso total
    return perms.includes("all:all") || perms.includes(`${resource}:${action}`);
}

// Para Server Components que precisam de permissão específica
export async function requirePermission(resource: string, action: string) {
    const session = await getServerSession(auth);
    if (!session || session.user.tipo !== "ADMINISTRATOR") {
        redirect("/");
    }
    if (!hasPermission(session, resource, action)) {
        redirect("/admin/unauthorized");
    }
    return session;
}