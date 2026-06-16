import { requirePermission } from "@/src/lib/auth-helpers/auth-helpers-server";
import { getAuditLogs } from "@/src/services/audit";
import { SelectAuditManagement } from "./components/select-audit-management";
import { redirect } from "next/navigation";
import { History, User, Calendar as CalendarIcon, FileText } from "lucide-react";
import { Suspense } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/src/app/admin/components/pagination";

function getActionBadge(action: string) {
    switch (action) {
        case "CREATE":
            return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200/50">CRIOU</Badge>;
        case "UPDATE":
            return <Badge className="bg-blue-500/10 text-blue-600 border-blue-200/50">EDITOU</Badge>;
        case "DELETE":
            return <Badge className="bg-red-500/10 text-red-600 border-red-200/50">EXCLUIU</Badge>;
        default:
            return <Badge variant="secondary">{action}</Badge>;
    }
}

async function AuditContent({
    searchParamsPromise
}: {
    searchParamsPromise: Promise<{ [key: string]: string | undefined }>;
}) {
    const searchParams = await searchParamsPromise;
    await requirePermission("auditoria", "visualizar");

    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 20;
    const action = searchParams.action || undefined;

    const data = await getAuditLogs({ page, limit, action });

    if (!data) {
        redirect("/admin/unauthorized");
    }

    const getPageUrl = (pageNumber: number) => {
        const params = new URLSearchParams();
        if (action) params.set("action", action);
        params.set("page", String(pageNumber));
        return `?${params.toString()}`;
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-end gap-4">
                <SelectAuditManagement />
            </div>

            <div className="rounded-xl border bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="w-[180px]">Usuário</TableHead>
                            <TableHead className="w-[120px]">Ação</TableHead>
                            <TableHead>Recurso</TableHead>
                            <TableHead>Alvo (Nome)</TableHead>
                            <TableHead className="hidden md:table-cell">Caminho</TableHead>
                            <TableHead className="text-right">Horário</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.logs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                                    Nenhum log de auditoria encontrado.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.logs.map((log) => (
                                <TableRow key={log.id} className="hover:bg-muted/30 transition-colors">
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-slate-800 flex items-center gap-1.5">
                                                <User className="h-3 w-3 text-slate-400" /> {log.administrator.name || "Sem nome"}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground">{log.administrator.role?.name || "Sem cargo"}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{getActionBadge(log.action)}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5 font-medium text-slate-700 capitalize">
                                            <FileText className="h-3 w-3 text-slate-400" /> {log.resource === "usuarios" ? "Usuários" : log.resource === "cargos" ? "Cargos" : log.resource}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-semibold text-slate-900">
                                            {log.resourceName || "-"}
                                        </span>
                                        {log.resourceId && <span className="ml-2 text-[10px] text-muted-foreground font-mono">#{log.resourceId}</span>}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <span className="text-xs text-muted-foreground font-mono">{log.url}</span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex flex-col items-end">
                                            <span className="text-sm font-medium text-slate-700">
                                                {new Date(log.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                <CalendarIcon className="h-2.5 w-2.5" /> {new Date(log.createdAt).toLocaleDateString("pt-BR")}
                                            </span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                <Pagination
                    page={page}
                    totalPages={data.totalPages}
                    total={data.total}
                    limit={limit}
                    getPageUrl={getPageUrl}
                />
            </div>
        </div>
    );
}

import { NuqsAdapter } from "nuqs/adapters/next/app";

export default async function AuditoriaPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    return (
        <NuqsAdapter>
            <div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                        <History className="h-8 w-8 text-indigo-600" />
                        Auditoria do Sistema
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Acompanhe todas as ações realizadas pelos usuários na plataforma de forma detalhada.
                    </p>
                </div>

                <Suspense fallback={<div className="flex items-center justify-center p-8 text-slate-500">Carregando dados de auditoria...</div>}>
                    <AuditContent searchParamsPromise={searchParams} />
                </Suspense>
            </div>
        </NuqsAdapter>
    );
}
