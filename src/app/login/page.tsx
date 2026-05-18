import { ProviderGoogle } from "./components/ProviderGoogle";
import { SidebarLogin } from "./components/SidebarLogin";

export default function LoginPage() {
    return (
        <main className="flex min-h-screen w-full">
            <SidebarLogin />
            <ProviderGoogle />
        </main>
    )
}