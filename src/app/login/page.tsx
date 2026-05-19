import { ProviderGoogle } from "./components/ProviderGoogle";
import { SidebarLogin } from "./components/SidebarLogin";
import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await getServerSession(auth);

    if (session) {
        redirect("/admin");
    }
    return (
        <main className="flex min-h-screen w-full">
            <SidebarLogin />
            <ProviderGoogle />
        </main>
    )
}