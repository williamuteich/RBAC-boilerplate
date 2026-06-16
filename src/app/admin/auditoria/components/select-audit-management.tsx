"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useQueryState } from "nuqs";

export function SelectAuditManagement() {
    const [action, setAction] = useQueryState("action", { defaultValue: "", shallow: false });
    const [_, setPage] = useQueryState("page", { defaultValue: "1", shallow: false });
    const [isPending, startTransition] = useTransition();

    const handleFilterChange = (value: string) => {
        startTransition(async () => {
            await setAction(value || null);
            await setPage(null);
        });
    };

    return (
        <div className="flex items-center gap-2">
            <select
                className="h-10 px-3 py-2 border rounded-md bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 min-w-[160px]"
                value={action}
                onChange={(e) => handleFilterChange(e.target.value)}
            >
                <option value="">Todas as Ações</option>
                <option value="CREATE">Criação</option>
                <option value="UPDATE">Edição</option>
                <option value="DELETE">Exclusão</option>
            </select>

            {isPending && <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />}
        </div>
    );
}
