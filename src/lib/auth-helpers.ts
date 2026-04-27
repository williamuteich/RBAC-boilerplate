import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { redirect } from "next/navigation";

type AppSession = Awaited<ReturnType<typeof getServerSession<typeof auth>>>;

// Garante que é Administrator
export async function requireAdminContext() {
    const session = await getServerSession(auth);
    if (!session) redirect("/admin/login");
    if (session.user.tipo !== "ADMINISTRATOR") redirect("/admin/login");
    return session;
}

// Garante que é Lojista ou ShopMember
export async function requireLojaContext() {
    const session = await getServerSession(auth);
    if (!session) redirect("/loja/login");
    const isLoja =
        session.user.tipo === "LOJISTA" ||
        session.user.tipo === "SHOP_MEMBER";
    if (!isLoja) redirect("/loja/login");
    return session;
}

// Checa permissão granular
export function hasPermission(
    session: AppSession,
    resource: string,
    action: string
): boolean {
    if (!session) return false;
    // Lojista tem acesso total ao próprio ambiente
    if (session.user.tipo === "LOJISTA") return true;
    return session.user.permissions.includes(`${resource}:${action}`);
}

// Garante permissão ou redireciona
export async function requirePermission(resource: string, action: string) {
    const session = await getServerSession(auth);
    if (!session) redirect("/loja/login");
    if (!hasPermission(session, resource, action)) redirect("/unauthorized");
    return session;
}