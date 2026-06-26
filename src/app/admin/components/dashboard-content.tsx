"use client";

import {
  Users, DollarSign, Ticket, ShieldAlert, ArrowUpRight,
  Plus, Key, ChevronRight
} from "lucide-react";
import Link from "next/link";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";
import { DashboardStats, DashboardLog, ChartDataItem } from "@/src/types/dashboard/dashboard";

interface DashboardContentProps {
  stats: DashboardStats;
  recentLogs: DashboardLog[];
  chartData: ChartDataItem[];
}

export function DashboardContent({ stats, recentLogs, chartData }: DashboardContentProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case "CREATE":
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md">CRIOU</span>;
      case "UPDATE":
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded-md">EDITOU</span>;
      case "DELETE":
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 rounded-md">EXCLUIU</span>;
      default:
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-50 text-slate-700 border border-slate-200 rounded-md">{action}</span>;
    }
  };

  return (
    <div className="space-y-8 w-full pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">Visão Geral</h1>
        <p className="text-slate-500 text-sm mt-1">Acompanhe as métricas de vendas, cadastros e atividades do sistema.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">Receita Total</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold text-slate-800">{formatCurrency(stats.totalRevenue)}</span>
            <p className="text-xs text-slate-400 mt-1">Faturamento bruto acumulado</p>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">Clientes Ativos</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold text-slate-800">{stats.activeClientsCount}</span>
            <p className="text-xs text-slate-400 mt-1">De um total de {stats.clientsCount} cadastrados</p>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">Uso de Cupons</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Ticket className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold text-slate-800">
              {stats.couponsCount > 0 ? Math.round((stats.usedCouponsCount / stats.couponsCount) * 100) : 0}%
            </span>
            <p className="text-xs text-slate-400 mt-1">{stats.usedCouponsCount} resgatados de {stats.couponsCount}</p>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">Administradores</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold text-slate-800">{stats.adminsCount}</span>
            <p className="text-xs text-slate-400 mt-1">Com acessos ativos ao painel</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Crescimento de Clientes</h2>
            <p className="text-xs text-slate-400 mt-0.5">Evolução do número de cadastros de clientes nos últimos meses</p>
          </div>
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1">Tempo Real</span>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorClients" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9A75F0" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#9A75F0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E2E8F0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                labelStyle={{ fontWeight: "bold", color: "#1E293B", fontSize: "12px" }}
                itemStyle={{ color: "#9A75F0", fontSize: "12px" }}
              />
              <Area type="monotone" dataKey="clientes" name="Clientes" stroke="#9A75F0" strokeWidth={2.5} fillOpacity={1} fill="url(#colorClients)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800">Atividades Recentes</h2>
              <Link href="/admin/auditoria" className="text-xs text-[#9A75F0] hover:text-[#855fe6] font-bold flex items-center gap-0.5">
                Ver todos <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {recentLogs.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-sm">Nenhuma atividade registrada.</div>
              ) : (
                recentLogs.map((log) => (
                  <div key={log.id} className="py-3.5 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-slate-800">{log.administrator.name || log.administrator.email}</span>
                        {getActionBadge(log.action)}
                      </div>
                      <p className="text-xs text-slate-500">
                        Recurso: <span className="font-semibold text-slate-600">{log.resource}</span>
                        {log.resourceName && (
                          <> — <span className="italic text-slate-400">"{log.resourceName}"</span></>
                        )}
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                      {new Date(log.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4">Ações Rápidas</h2>
            <div className="flex flex-col gap-2">
              <Link
                href="/admin/cupons?generate=true"
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/20 text-slate-700 hover:text-indigo-900 transition-all font-semibold text-xs cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                  <Plus className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p>Gerar Cupons</p>
                  <p className="text-[10px] font-normal text-slate-400 group-hover:text-indigo-500 transition-colors">Criar códigos de acesso rápido</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>

              <Link
                href="/admin/usuarios"
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-purple-100 hover:bg-purple-50/20 text-slate-700 hover:text-purple-900 transition-all font-semibold text-xs cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-100 transition-colors">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p>Novo Administrador</p>
                  <p className="text-[10px] font-normal text-slate-400 group-hover:text-purple-500 transition-colors">Cadastrar novos operadores</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-purple-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>

              <Link
                href="/admin/cargos"
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/20 text-slate-700 hover:text-blue-900 transition-all font-semibold text-xs cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                  <Key className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p>Níveis de Acesso</p>
                  <p className="text-[10px] font-normal text-slate-400 group-hover:text-blue-500 transition-colors">Gerenciar permissões e cargos</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>

              <Link
                href="/admin/clientes"
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-emerald-100 hover:bg-emerald-50/20 text-slate-700 hover:text-emerald-900 transition-all font-semibold text-xs cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                  <Users className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p>Ver Clientes</p>
                  <p className="text-[10px] font-normal text-slate-400 group-hover:text-emerald-500 transition-colors">Gerenciar usuários SaaS e assinaturas</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
