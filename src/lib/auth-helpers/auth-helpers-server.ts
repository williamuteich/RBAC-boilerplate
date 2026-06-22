import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { redirect } from "next/navigation";
import { hasPermission } from "./auth-helpers";
export { hasPermission };

export async function requireAdminContext() {
    const session = await getServerSession(auth);
    if (!session || session.user.tipo !== "ADMINISTRATOR") {
        redirect("/login-admin");
    }
    return session;
}

export async function checkAdminApi() {
    const session = await getServerSession(auth);
    if (!session || session.user.tipo !== "ADMINISTRATOR") {
        return null;
    }
    return session;
}

export async function requirePermission(resource: string, action: string) {
    const session = await getServerSession(auth);
    if (!session || session.user.tipo !== "ADMINISTRATOR") {
        redirect("/login-admin");
    }
    if (!hasPermission(session, resource, action)) {
        redirect("/admin/unauthorized");
    }
    return session;
}
