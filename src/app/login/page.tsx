import { ProviderGoogle } from "./components/ProviderGoogle";
import { SidebarLogin } from "./components/SidebarLogin";
import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { redirect } from "next/navigation";
import { Suspense } from "react";

function LoginLoading() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-slate-950 text-white">
            Carregando...
        </div>
    );
}

async function LoginContent() {
    const session = await getServerSession(auth);

    if (session) {
        redirect("/admin");
    }
    return (
        <main className="flex min-h-screen w-full">
            <SidebarLogin />
            <ProviderGoogle />
        </main>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<LoginLoading />}>
            <LoginContent />
        </Suspense>
    );
}