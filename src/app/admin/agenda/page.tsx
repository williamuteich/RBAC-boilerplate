import { requirePermission } from "@/src/lib/auth-helpers-server";
import AgendaContainer from "./components/agenda-container";
import { Suspense } from "react";

function AgendaLoading() {
    return (
        <div className="flex items-center justify-center py-10">
            Loading...
        </div>
    );
}

async function AgendaContent() {
    await requirePermission("agenda", "visualizar");

    return <AgendaContainer />;
}

export default function AgendaPage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Suspense fallback={<AgendaLoading />}>
                <AgendaContent />
            </Suspense>
        </div>
    );
}