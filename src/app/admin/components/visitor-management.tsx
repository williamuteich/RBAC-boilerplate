"use client";

import { useState, useTransition, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, User, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { VisitorsResponse, VisitorItem, VisitorFilters } from "@/src/types/dashboard/visitor";
import { getVisitors } from "@/src/services/visitor";

export function VisitorManagement({ initialData }: { initialData: VisitorsResponse }) {
    const [data, setData] = useState<VisitorsResponse>(initialData);
    const [filters, setFilters] = useState<VisitorFilters>({ page: 1, limit: 100 });
    const [isPending, startTransition] = useTransition();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterConverted, setFilterConverted] = useState<string>("");

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm !== (filters.visitorId || "")) {
                fetchVisitors({ ...filters, visitorId: searchTerm || undefined, page: 1 });
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [searchTerm]);

    const fetchVisitors = (newFilters: VisitorFilters) => {
        startTransition(async () => {
            const result = await getVisitors(newFilters);
            if (result) {
                setData(result);
                setFilters(newFilters);
            }
        });
    };

    const handlePageChange = (newPage: number) => {
        fetchVisitors({ ...filters, page: newPage });
    };

    const handleFilterChange = (key: keyof VisitorFilters, value: any) => {
        fetchVisitors({ ...filters, [key]: value, page: 1 });
    };

    const getConvertedBadge = (converted: boolean) =>
        converted ? (
            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200/50">SIM</Badge>
        ) : (
            <Badge variant="secondary">NÃO</Badge>
        );

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-end gap-4">
                <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Procurar por ID ou GCLID..."
                            className="pl-9 w-[320px] h-10 bg-white shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <select
                        className="h-10 px-3 py-2 border rounded-md bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 min-w-[160px] shadow-sm cursor-pointer"
                        value={filterConverted}
                        onChange={(e) => {
                            setFilterConverted(e.target.value);
                            handleFilterChange("converted", e.target.value === "" ? undefined : e.target.value === "true");
                        }}
                    >
                        <option value="">Status: Todos</option>
                        <option value="true">Convertidos</option>
                        <option value="false">Não convertidos</option>
                    </select>

                    {isPending && <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />}
                </div>
            </div>

            <div className="rounded-xl border bg-card/50 backdrop-blur-sm overflow-hidden shadow-md">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="w-[180px] font-bold">Visitor ID</TableHead>
                                <TableHead className="w-[140px] font-bold">GCLID</TableHead>
                                <TableHead className="font-bold text-center">UTM Source</TableHead>
                                <TableHead className="font-bold text-center">UTM Campaign</TableHead>
                                <TableHead className="font-bold text-center">Convertido</TableHead>
                                <TableHead className="hidden lg:table-cell font-bold">IP & User Agent</TableHead>
                                <TableHead className="text-right font-bold">Data/Hora</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.items.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-40 text-center text-muted-foreground italic">
                                        Nenhum visitante encontrado com os filtros atuais.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.items.map((item: VisitorItem) => (
                                    <TableRow key={item.id} className="hover:bg-muted/30 transition-colors group">
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-900 break-all leading-tight">{item.visitorId}</span>
                                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-0.5">ID: {item.id}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-mono text-xs text-slate-600">
                                            {item.gclid ? (
                                                <span className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200" title={item.gclid}>
                                                    {item.gclid.length > 15 ? `${item.gclid.substring(0, 15)}...` : item.gclid}
                                                </span>
                                            ) : (
                                                <span className="text-slate-300">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {item.utmSource ? (
                                                <Badge variant="outline" className="font-normal capitalize">{item.utmSource}</Badge>
                                            ) : "-"}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {item.utmCampaign ? (
                                                <Badge variant="outline" className="font-normal capitalize">{item.utmCampaign}</Badge>
                                            ) : "-"}
                                        </TableCell>
                                        <TableCell className="text-center">{getConvertedBadge(item.converted)}</TableCell>
                                        <TableCell className="hidden lg:table-cell max-w-[200px]">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-mono text-[10px] text-slate-500 bg-slate-50 px-1 rounded w-fit">{item.ip || "0.0.0.0"}</span>
                                                <span className="text-[10px] text-muted-foreground line-clamp-2 leading-tight" title={item.userAgent || ""}>
                                                    {item.userAgent || "N/A"}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex flex-col items-end">
                                                <span className="text-sm font-semibold text-slate-800">
                                                    {new Date(item.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                                                </span>
                                                <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-medium">
                                                    <CalendarIcon className="h-3 w-3" /> {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                                                </span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {data.totalPages > 1 && (
                    <div className="p-4 border-t bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-muted-foreground">
                            Mostrando <span className="font-bold text-slate-700">{(data.page - 1) * filters.limit! + 1}</span> a{" "}
                            <span className="font-bold text-slate-700">{Math.min(data.page * filters.limit!, data.total)}</span> de{" "}
                            <span className="font-bold text-slate-700">{data.total}</span> registros
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(data.page - 1)}
                                disabled={data.page === 1 || isPending}
                                className="h-9 px-4"
                            >
                                <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
                            </Button>
                            <div className="flex items-center gap-1 bg-white border rounded-md px-3 h-9 shadow-xs">
                                <span className="text-sm font-bold text-indigo-600">{data.page}</span>
                                <span className="text-sm text-slate-400">/</span>
                                <span className="text-sm font-medium text-slate-600">{data.totalPages}</span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(data.page + 1)}
                                disabled={data.page === data.totalPages || isPending}
                                className="h-9 px-4"
                            >
                                Próximo <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
