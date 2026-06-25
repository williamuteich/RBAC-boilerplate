import { Ticket, CheckCircle2, AlertCircle } from "lucide-react";
import { StatsCardsProps } from "@/src/types/dashboard/cupons";

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 shadow-sm flex items-center gap-4">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
          <ThemeIconWrapper icon={Ticket} />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Total de Cupons</span>
          <span className="text-xl font-bold text-slate-800 mt-0.5">{stats.totalCupons}</span>
        </div>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 shadow-sm flex items-center gap-4">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
          <ThemeIconWrapper icon={CheckCircle2} />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Disponíveis</span>
          <span className="text-xl font-bold text-slate-800 mt-0.5">{stats.activeCupons}</span>
        </div>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 shadow-sm flex items-center gap-4">
        <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
          <ThemeIconWrapper icon={AlertCircle} className="fill-rose-600/10" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Resgatados</span>
          <span className="text-xl font-bold text-slate-800 mt-0.5">{stats.usedCupons}</span>
        </div>
      </div>
    </div>
  );
}

function ThemeIconWrapper({ icon: Icon, className }: { icon: any; className?: string }) {
  return <Icon className={`w-5 h-5 ${className || ""}`} />;
}
