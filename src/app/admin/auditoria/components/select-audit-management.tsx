"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

export function SelectAuditManagement() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const currentAction = searchParams.get("action") || "";

    const handleFilterChange = (value: string) => {
        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set("action", value);
            } else {
                params.delete("action");
            }
            params.set("page", "1");
            router.push(`?${params.toString()}`);
        });
    };

    return (
        <div className="flex items-center gap-2">
            <select
                className="h-10 px-3 py-2 border rounded-md bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 min-w-[160px]"
                value={currentAction}
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
