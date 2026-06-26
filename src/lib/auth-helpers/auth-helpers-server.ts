import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { redirect } from "next/navigation";

export async function requireUserContext() {
    const session = await getServerSession(auth);
    if (!session || session.user.tipo !== "USER") {
        redirect("/login");
    }
    return session;
}

export async function checkUserApi() {
    const session = await getServerSession(auth);
    if (!session || session.user.tipo !== "USER") {
        return null;
    }
    return session;
}
