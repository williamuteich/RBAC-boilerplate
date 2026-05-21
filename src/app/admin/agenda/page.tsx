import { requirePermission } from "@/src/lib/auth-helpers-server";
import AgendaContainer from "./components/agenda-container";

export default async function AgendaPage() {
    await requirePermission("agenda", "visualizar");

    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <AgendaContainer />
        </div>
    );
}
