import { requirePermission } from "@/src/lib/auth-helpers-server";
import { getVisitors } from "@/src/services/visitor";
import { VisitorManagement } from "../components/visitor-management";
import { redirect } from "next/navigation";
import { UserRound } from "lucide-react";

export default async function VisitantesPage() {
    await requirePermission("visitantes", "visualizar");

    const data = await getVisitors({ page: 1, limit: 100 });

    if (!data) {
        redirect("/admin/unauthorized");
    }

    return (
        <div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <UserRound className="h-8 w-8 text-indigo-600" />
                    Visitantes e Conversões
                </h1>
                <p className="text-muted-foreground mt-2">Lista de visitantes capturados pelo site e confirmados via QR code, com GCLID e UTMs.</p>
            </div>

            <VisitorManagement initialData={data} />
        </div>
    );
}
