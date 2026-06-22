"use client";

import React, { useState, useTransition } from "react";
import { useQueryState } from "nuqs";
import {
  Users, DollarSign, Heart, Eye,
  CreditCard, ExternalLink, Edit2, Loader2
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ClientesResponse, SaaSClient } from "@/src/types/dashboard/clientes";
import { updateCliente } from "@/src/services/clientes";
import { useRouter } from "next/navigation";
import { SearchInput } from "@/src/app/admin/components/search-input";

export function ClientesDashboard({
  initialData
}: {
  initialData: ClientesResponse;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useQueryState("search", { defaultValue: "", shallow: false });
  const [status, setStatus] = useQueryState("status", { defaultValue: "", shallow: false });
  const [plan, setPlan] = useQueryState("plan", { defaultValue: "", shallow: false });
  const [page, setPage] = useQueryState("page", { defaultValue: "1", shallow: false });

  const [editingClient, setEditingClient] = useState<SaaSClient | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState<string | null>(null);

  const handleClearFilters = () => {
    setSearch("");
    setStatus("");
    setPlan("");
    setPage("1");
  };

  const handleSimulate = (clientName: string) => {
    setIsSimulating(clientName);
    setTimeout(() => {
      setIsSimulating(null);
      router.push("/painel");
    }, 1500);
  };

  const handleSaveEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingClient) return;

    const formData = new FormData(e.currentTarget);
    const updatedPlan = formData.get("plan") as string;
    const updatedStatus = formData.get("status") as string;
    const updatedValue = parseFloat(formData.get("lastPaymentValue") as string || "0");
    const updatedExp = formData.get("expirationDate") as string;

    startTransition(async () => {
      const res = await updateCliente(editingClient.id, {
        plan: updatedPlan,
        status: updatedStatus,
        lastPaymentValue: updatedValue,
        expirationDate: updatedExp ? new Date(updatedExp).toISOString() : null
      });

      if (res.success) {
        setEditOpen(false);
        setEditingClient(null);
        router.refresh();
      }
    });
  };

  const formatCurrency = (val: number | null) => {
    if (val === null) return "R$ 0,00";
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  const getStatusBadge = (s: string) => {
    switch (s) {
      case "ACTIVE":
        return <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold hover:bg-emerald-50">Ativo</Badge>;
      case "PENDING":
        return <Badge className="bg-amber-50 text-amber-700 border border-amber-200 font-bold hover:bg-amber-50">Pendente</Badge>;
      case "EXPIRED":
        return <Badge className="bg-rose-50 text-rose-700 border border-rose-200 font-bold hover:bg-rose-50">Expirado</Badge>;
      case "CANCELLED":
        return <Badge className="bg-slate-50 text-slate-600 border border-slate-200 font-bold hover:bg-slate-50">Cancelado</Badge>;
      default:
        return <Badge variant="secondary">{s}</Badge>;
    }
  };

  const getPlanLabel = (p: string) => {
    switch (p) {
      case "7_DAYS":
        return "7 Dias";
      case "14_DAYS":
        return "14 Dias";
      case "30_DAYS":
        return "30 Dias";
      default:
        return p;
    }
  };

  const stats = initialData.stats;

  return (
    <div className="flex flex-col gap-8 w-full">
      {isSimulating && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-50 flex items-center justify-center animate-in fade-in duration-300">
          <div className="bg-white border border-[#E8E6F5] p-8 rounded-[32px] shadow-2xl flex flex-col items-center gap-4 text-center max-w-sm">
            <div className="w-12 h-12 rounded-full border-4 border-[#9A75F0] border-t-transparent animate-spin"></div>
            <div>
              <h4 className="text-sm font-bold text-[#2D2A4A]">Simulando Acesso</h4>
              <p className="text-xs text-[#696684] mt-1.5 leading-relaxed">
                Entrando no painel do usuário de <strong className="text-[#9A75F0]">{isSimulating}</strong>...
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-[#E8E6F5] p-6 rounded-[28px] shadow-[0_4px_20px_rgba(45,42,74,0.01)] flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Users className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total de Clientes</span>
            <span className="text-xl font-black text-[#2D2A4A] mt-0.5">{stats.totalClientes}</span>
          </div>
        </div>

        <div className="bg-white border border-[#E8E6F5] p-6 rounded-[28px] shadow-[0_4px_20px_rgba(45,42,74,0.01)] flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <DollarSign className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">MRR Estimado</span>
            <span className="text-xl font-black text-[#2D2A4A] mt-0.5">{formatCurrency(stats.mrr)}</span>
          </div>
        </div>

        <div className="bg-white border border-[#E8E6F5] p-6 rounded-[28px] shadow-[0_4px_20px_rgba(45,42,74,0.01)] flex items-center gap-4">
          <div className="p-3 bg-rose-50 text-[#9A75F0] rounded-2xl">
            <Heart className="w-5 h-5 fill-[#9A75F0]/10" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Taxa de Ativos</span>
            <span className="text-xl font-black text-[#2D2A4A] mt-0.5">{stats.activePercentage.toFixed(1)}%</span>
          </div>
        </div>

        <div className="bg-white border border-[#E8E6F5] p-6 rounded-[28px] shadow-[0_4px_20px_rgba(45,42,74,0.01)] flex items-center gap-4">
          <div className="p-3 bg-slate-50 text-slate-600 rounded-2xl">
            <Eye className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Visualizações Totais</span>
            <span className="text-xl font-black text-[#2D2A4A] mt-0.5">{stats.totalPageViews}</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E8E6F5] p-5 rounded-[28px] shadow-[0_4px_20px_rgba(45,42,74,0.01)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 max-w-md w-full">
          <SearchInput
            placeholder="Buscar por nome, email ou slug..."
            searchParamKey="search"
            disabled={isPending}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={status}
            onChange={(e) => { setPage("1"); setStatus(e.target.value || null); }}
            className="h-10 rounded-xl border border-[#E8E6F5] bg-white text-xs px-3 focus:outline-none focus:ring-1 focus:ring-[#9A75F0] cursor-pointer"
          >
            <option value="">Todos os Status</option>
            <option value="ACTIVE">Ativo</option>
            <option value="PENDING">Pendente</option>
            <option value="EXPIRED">Expirado</option>
            <option value="CANCELLED">Cancelado</option>
          </select>

          <select
            value={plan}
            onChange={(e) => { setPage("1"); setPlan(e.target.value || null); }}
            className="h-10 rounded-xl border border-[#E8E6F5] bg-white text-xs px-3 focus:outline-none focus:ring-1 focus:ring-[#9A75F0] cursor-pointer"
          >
            <option value="">Todos os Planos</option>
            <option value="7_DAYS">7 Dias</option>
            <option value="14_DAYS">14 Dias</option>
            <option value="30_DAYS">30 Dias</option>
          </select>

          {(search || status || plan) && (
            <Button
              variant="ghost"
              onClick={handleClearFilters}
              className="text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl h-10 px-3 cursor-pointer animate-in fade-in"
            >
              Limpar filtros
            </Button>
          )}
        </div>
      </div>

      <div className="bg-white border border-[#E8E6F5] rounded-[32px] overflow-hidden shadow-[0_10px_40px_rgba(45,42,74,0.01)]">
        <Table>
          <TableHeader className="bg-[#FAF9FF] border-b border-[#E8E6F5]">
            <TableRow>
              <TableHead className="font-bold text-[#696684] text-xs h-12">Cliente</TableHead>
              <TableHead className="font-bold text-[#696684] text-xs h-12">Homenagem</TableHead>
              <TableHead className="font-bold text-[#696684] text-xs h-12">Plano</TableHead>
              <TableHead className="font-bold text-[#696684] text-xs h-12">Status</TableHead>
              <TableHead className="font-bold text-[#696684] text-xs h-12">Último Pagamento</TableHead>
              <TableHead className="font-bold text-[#696684] text-xs h-12">Vencimento</TableHead>
              <TableHead className="font-bold text-[#696684] text-xs h-12">Métricas</TableHead>
              <TableHead className="font-bold text-[#696684] text-xs h-12 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialData.clients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-36 text-center text-xs text-[#696684]">
                  Nenhum cliente encontrado com os filtros selecionados.
                </TableCell>
              </TableRow>
            ) : (
              initialData.clients.map((client) => (
                <TableRow key={client.id} className="hover:bg-slate-50/50 border-b border-[#E8E6F5] transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FAF9FF] border border-[#E8E6F5] flex items-center justify-center font-bold text-[#9A75F0] text-xs uppercase shrink-0">
                        {client.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#2D2A4A]">{client.name}</span>
                        <span className="text-[10px] text-slate-400">{client.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <a
                      href={`/p/${client.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#9A75F0] hover:underline"
                    >
                      eterno.love/{client.slug}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-semibold text-[#2D2A4A]">{getPlanLabel(client.plan)}</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(client.status)}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#2D2A4A]">{formatCurrency(client.lastPaymentValue)}</span>
                      <span className="text-[9px] text-slate-400">{formatDate(client.lastPaymentDate)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs font-semibold ${client.expirationDate && new Date(client.expirationDate) < new Date() && client.status !== "CANCELLED"
                        ? "text-rose-500"
                        : "text-[#2D2A4A]"
                      }`}>
                      {formatDate(client.expirationDate)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 font-semibold">
                      <span className="flex items-center gap-1" title="Visualizações">
                        <Eye className="w-3 h-3 text-slate-400" /> {client.pageViews}
                      </span>
                      <span className="flex items-center gap-1" title="Fotos">
                        <Heart className="w-3 h-3 text-slate-400" /> {client.photosCount}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingClient(client);
                          setEditOpen(true);
                        }}
                        className="w-8 h-8 rounded-lg text-slate-400 hover:text-[#9A75F0] hover:bg-[#FAF9FF] cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSimulate(client.name)}
                        className="text-[10px] font-bold text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg h-8 cursor-pointer"
                      >
                        Simular
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {initialData.totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-[#E8E6F5] bg-[#FAF9FF]">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Página {initialData.page} de {initialData.totalPages}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={initialData.page <= 1}
                onClick={() => setPage(String(initialData.page - 1))}
                className="h-8 text-xs rounded-lg border-[#E8E6F5] cursor-pointer"
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={initialData.page >= initialData.totalPages}
                onClick={() => setPage(String(initialData.page + 1))}
                className="h-8 text-xs rounded-lg border-[#E8E6F5] cursor-pointer"
              >
                Próximo
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-[32px] border-[#E8E6F5] p-6 md:p-8 font-sans">
          {editingClient && (
            <form onSubmit={handleSaveEdit} className="flex flex-col gap-5">
              <DialogHeader>
                <DialogTitle className="text-sm font-bold text-[#2D2A4A] flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#9A75F0]" />
                  Ajustar Fatura &amp; Assinatura
                </DialogTitle>
                <DialogDescription className="text-xs text-[#696684]">
                  Ajuste o plano, status e data de vencimento de {editingClient.name}.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-4 py-2">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-[#696684]">Plano</Label>
                  <select
                    name="plan"
                    defaultValue={editingClient.plan}
                    className="w-full h-10 px-3 py-2 border border-[#E8E6F5] rounded-xl bg-white text-xs outline-none focus:ring-1 focus:ring-[#9A75F0]"
                  >
                    <option value="7_DAYS">7 Dias</option>
                    <option value="14_DAYS">14 Dias</option>
                    <option value="30_DAYS">30 Dias</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-[#696684]">Status</Label>
                  <select
                    name="status"
                    defaultValue={editingClient.status}
                    className="w-full h-10 px-3 py-2 border border-[#E8E6F5] rounded-xl bg-white text-xs outline-none focus:ring-1 focus:ring-[#9A75F0]"
                  >
                    <option value="ACTIVE">Ativo</option>
                    <option value="PENDING">Pendente</option>
                    <option value="EXPIRED">Expirado</option>
                    <option value="CANCELLED">Cancelado</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-[#696684]">Valor do Último Pagamento (R$)</Label>
                  <Input
                    name="lastPaymentValue"
                    type="number"
                    step="0.01"
                    defaultValue={editingClient.lastPaymentValue || 0}
                    className="rounded-xl border-[#E8E6F5] text-xs h-10"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-[#696684]">Data de Vencimento</Label>
                  <Input
                    name="expirationDate"
                    type="date"
                    defaultValue={
                      editingClient.expirationDate
                        ? new Date(editingClient.expirationDate).toISOString().split("T")[0]
                        : ""
                    }
                    className="rounded-xl border-[#E8E6F5] text-xs h-10"
                  />
                </div>
              </div>

              <DialogFooter className="mt-2">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-[#9A75F0] hover:bg-[#8b6fe3] text-white font-bold h-10 text-xs rounded-xl cursor-pointer"
                >
                  {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Salvar Alterações"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
