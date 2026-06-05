import { Users, ShieldCheck, BarChart3, Layers } from "lucide-react";

export function LoginSidebar() {
  return (
    <div className="relative hidden w-full lg:flex lg:w-1/2 bg-slate-950 flex-col justify-between p-12 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-indigo-400 via-transparent to-transparent" />
      <div className="absolute inset-0 z-0 bg-linear-to-br from-slate-950 via-slate-900/95 to-indigo-950/60" />
      <div className="absolute bottom-0 right-0 w-96 h-96 z-0 rounded-full bg-indigo-600/5 blur-3xl" />

      <div className="relative z-10 flex items-center gap-3">
        <div className="relative flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-900/50">
          <div className="absolute inset-0.5 rounded-lg border border-white/20" />
          <span className="text-white font-black text-lg tracking-tighter">A</span>
        </div>
        <span className="text-xl font-black text-white tracking-tight">AdminCore</span>
      </div>

      <div className="relative z-10 max-w-lg mt-12 mb-auto pt-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-6">
          <Layers className="w-3.5 h-3.5" />
          Boilerplate RBAC
        </div>

        <h1 className="text-4xl font-extrabold text-white leading-tight mb-6">
          Controle de acesso{" "}
          <span className="text-indigo-400">baseado em papéis</span>{" "}
          pronto para usar.
        </h1>

        <p className="text-slate-400 text-lg mb-12">
          Uma base sólida para construir plataformas com autenticação,
          permissões granulares e auditoria completa.
        </p>

        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60">
              <Users className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Gestão de Usuários</h3>
              <p className="text-slate-500 text-sm mt-1">Controle de acesso centralizado e seguro</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60">
              <ShieldCheck className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Permissões Granulares</h3>
              <p className="text-slate-500 text-sm mt-1">Cargos com recursos e ações configuráveis</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60">
              <BarChart3 className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Auditoria Completa</h3>
              <p className="text-slate-500 text-sm mt-1">Registro de todas as ações administrativas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <p className="text-sm text-slate-600">
          © {new Date().getFullYear()} AdminCore Boilerplate — Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
