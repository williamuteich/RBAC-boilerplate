"use client";

import { useState } from "react";
import {
  Download, Search, Target, Mail, Calendar, Users, Filter
} from "lucide-react";
import { Lead, LeadsDashboardProps } from "@/src/types/dashboard/leads";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

export function LeadsDashboard({ initialLeads }: LeadsDashboardProps) {
  const [leads] = useState<Lead[]>(initialLeads);
  const [search, setSearch] = useState("");
  const [filterOrigem, setFilterOrigem] = useState("all");

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      (lead.name?.toLowerCase().includes(search.toLowerCase())) ||
      (lead.email?.toLowerCase().includes(search.toLowerCase())) ||
      (lead.code?.toLowerCase().includes(search.toLowerCase()));

    const matchesOrigem = filterOrigem === "all" || lead.origem === filterOrigem;

    return matchesSearch && matchesOrigem;
  });

  const totalLeads = leads.length;
  const googleLeadsCount = leads.filter(l => l.origem === "google").length;
  const instagramLeadsCount = leads.filter(l => l.origem === "instagram").length;
  const otherLeadsCount = totalLeads - googleLeadsCount - instagramLeadsCount;

  const formatDate = (date: Date | string | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const exportGoogleCSV = () => {
    const googleLeads = leads.filter(l => l.origem === "google");
    if (googleLeads.length === 0) {
      alert("Nenhum lead do Google Ads encontrado para exportação.");
      return;
    }

    let csvContent = "Parameters:TimeZone=America/Sao_Paulo\n";
    csvContent += "Hashed Email,Conversion Name,Conversion Time,Conversion Value,Conversion Currency\n";

    googleLeads.forEach(lead => {
      const timeStr = lead.usedAt
        ? new Date(lead.usedAt).toISOString().replace("T", " ").substring(0, 19)
        : new Date().toISOString().replace("T", " ").substring(0, 19);
      csvContent += `${lead.emailHash},Purchase,${timeStr},${lead.value.toFixed(2)},BRL\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `google_ads_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportMetaCSV = () => {
    const instagramLeads = leads.filter(l => l.origem === "instagram");
    if (instagramLeads.length === 0) {
      alert("Nenhum lead do Instagram/Meta encontrado para exportação.");
      return;
    }

    let csvContent = "email,event_name,event_time,value,currency\n";

    instagramLeads.forEach(lead => {
      const timeUnix = lead.usedAt
        ? Math.floor(new Date(lead.usedAt).getTime() / 1000)
        : Math.floor(Date.now() / 1000);
      csvContent += `${lead.emailHash},Purchase,${timeUnix},${lead.value.toFixed(2)},BRL\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `meta_instagram_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 w-full pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
            <Target className="w-8 h-8 text-[#9A75F0]" />
            Leads Convertidos
          </h1>
          <p className="text-slate-500 text-sm mt-1">Acompanhe e exporte os clientes que resgataram cupons de campanhas para treinar os algoritmos de anúncios.</p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Button
            onClick={exportGoogleCSV}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 text-xs rounded-lg cursor-pointer flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            Exportar Google Ads
          </Button>
          <Button
            onClick={exportMetaCSV}
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold h-10 text-xs rounded-lg cursor-pointer flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            Exportar Instagram/Meta
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">Total Convertidos</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold text-slate-800">{totalLeads}</span>
            <p className="text-xs text-slate-400 mt-1">Leads totais no sistema</p>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">Google Ads</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold text-slate-800">{googleLeadsCount}</span>
            <p className="text-xs text-slate-400 mt-1">Convertidos via Google</p>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">Instagram/Meta</span>
            <div className="p-2 rounded-lg bg-pink-50 text-pink-600">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold text-slate-800">{instagramLeadsCount}</span>
            <p className="text-xs text-slate-400 mt-1">Convertidos via Meta Ads</p>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">Outros Canais</span>
            <div className="p-2 rounded-lg bg-slate-50 text-slate-600">
              <Filter className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold text-slate-800">{otherLeadsCount}</span>
            <p className="text-xs text-slate-400 mt-1">Indicações, suporte e outros</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por nome, e-mail ou cupom..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <div className="flex gap-1.5 w-full sm:w-auto overflow-x-auto self-start sm:self-center">
          <Button
            variant={filterOrigem === "all" ? "default" : "outline"}
            onClick={() => setFilterOrigem("all")}
            className="h-8 text-xs font-semibold px-3 rounded-lg cursor-pointer"
          >
            Todos
          </Button>
          <Button
            variant={filterOrigem === "google" ? "default" : "outline"}
            onClick={() => setFilterOrigem("google")}
            className="h-8 text-xs font-semibold px-3 rounded-lg cursor-pointer"
          >
            Google Ads
          </Button>
          <Button
            variant={filterOrigem === "instagram" ? "default" : "outline"}
            onClick={() => setFilterOrigem("instagram")}
            className="h-8 text-xs font-semibold px-3 rounded-lg cursor-pointer"
          >
            Instagram Ads
          </Button>
          <Button
            variant={filterOrigem === "indicacao" ? "default" : "outline"}
            onClick={() => setFilterOrigem("indicacao")}
            className="h-8 text-xs font-semibold px-3 rounded-lg cursor-pointer"
          >
            Indicação
          </Button>
          <Button
            variant={filterOrigem === "suporte" ? "default" : "outline"}
            onClick={() => setFilterOrigem("suporte")}
            className="h-8 text-xs font-semibold px-3 rounded-lg cursor-pointer"
          >
            Suporte
          </Button>
        </div>
      </div>

      <div className="rounded-xl border bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Origem</TableHead>
              <TableHead>Hash SHA-256 (Email)</TableHead>
              <TableHead>Valor da Venda</TableHead>
              <TableHead>Cupom Utilizado</TableHead>
              <TableHead>Data do Resgate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  Nenhum lead encontrado com os filtros atuais.
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-semibold text-slate-800">{lead.name}</TableCell>
                  <TableCell className="text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{lead.email || "-"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize text-xs font-semibold">
                    {lead.origem === "google" && <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">Google Ads</span>}
                    {lead.origem === "instagram" && <span className="text-pink-600 bg-pink-50 px-2 py-0.5 rounded border border-pink-100">Instagram Ads</span>}
                    {lead.origem === "indicacao" && <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">Indicação</span>}
                    {lead.origem === "suporte" && <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">Suporte</span>}
                    {lead.origem !== "google" && lead.origem !== "instagram" && lead.origem !== "indicacao" && lead.origem !== "suporte" && (
                      <span className="text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{lead.origem}</span>
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-[10px] text-slate-500 max-w-[150px] truncate" title={lead.emailHash}>
                    {lead.emailHash || "-"}
                  </TableCell>
                  <TableCell className="text-xs font-semibold text-emerald-600">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(lead.value)}
                  </TableCell>
                  <TableCell className="text-xs">
                    <code className="px-2 py-0.5 bg-slate-100 text-slate-800 font-mono text-[10.5px] rounded border border-slate-200">
                      {lead.code}
                    </code>
                  </TableCell>
                  <TableCell className="text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{formatDate(lead.usedAt)}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
