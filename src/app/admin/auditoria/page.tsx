import { requirePermission } from "@/src/lib/auth-helpers-server";
import { getAuditLogs } from "@/src/services/audit";
import { AuditManagement } from "../components/audit-management";
import { redirect } from "next/navigation";

export default async function AuditoriaPage() {
    await requirePermission("auditoria", "visualizar");

    const auditData = await getAuditLogs({ page: 1, limit: 20 });

    if (!auditData) {
        redirect("/admin/unauthorized");
    }

    return (
        <div className="p-6 lg:p-10 mx-auto">
            <AuditManagement initialData={auditData} />
        </div>
    );
}
