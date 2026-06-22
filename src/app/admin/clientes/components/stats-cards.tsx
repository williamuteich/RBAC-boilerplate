import { Users, DollarSign, Heart, Eye } from "lucide-react";
import { StatsCardsProps } from "@/src/types/dashboard/clientes";

export function StatsCards({ stats, formatCurrency }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 shadow-sm flex items-center gap-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
          <Users className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Total de Clientes</span>
          <span className="text-xl font-bold text-slate-800 mt-0.5">{stats.totalClientes}</span>
        </div>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 shadow-sm flex items-center gap-4">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
          <DollarSign className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">MRR Estimado</span>
          <span className="text-xl font-bold text-slate-800 mt-0.5">{formatCurrency(stats.mrr)}</span>
        </div>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 shadow-sm flex items-center gap-4">
        <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
          <Heart className="w-5 h-5 fill-rose-600/10" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Taxa de Ativos</span>
          <span className="text-xl font-bold text-slate-800 mt-0.5">{stats.activePercentage.toFixed(1)}%</span>
        </div>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 shadow-sm flex items-center gap-4">
        <div className="p-3 bg-slate-50 text-slate-600 rounded-2xl">
          <Eye className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Visualizações Totais</span>
          <span className="text-xl font-bold text-slate-800 mt-0.5">{stats.totalPageViews}</span>
        </div>
      </div>
    </div>
  );
}
