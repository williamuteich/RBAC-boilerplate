import { Search, Users, ShieldCheck, BarChart3 } from "lucide-react";

export function LoginSidebar() {
  return (
    <div className="relative hidden w-full lg:flex lg:w-1/2 bg-zinc-950 flex-col justify-between p-12 overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop')" }}
      />
      <div className="absolute inset-0 z-0 bg-linear-to-br from-zinc-950 via-zinc-950/90 to-sky-950/80" />

      <div className="relative z-10 flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-sky-500 rounded-lg shadow-lg">
          <Search className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">GCLID Manager</span>
      </div>

      <div className="relative z-10 max-w-lg mt-12 mb-auto pt-24">
        <h1 className="text-4xl font-extrabold text-white leading-tight mb-6">
          Rastreamento e conversão
          <br />
          <span className="text-sky-400">para campanhas Google Ads</span>
        </h1>

        <p className="text-zinc-400 text-lg mb-12">
          Centralize captura de visitantes, gclid, confirmação de presença e análise de conversões em uma única plataforma.
        </p>

        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <Users className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Captura de visitantes</h3>
              <p className="text-zinc-500 text-sm mt-1">Armazene visitorId, gclid e UTMs automaticamente</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <ShieldCheck className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Confirmação na loja</h3>
              <p className="text-zinc-500 text-sm mt-1">QR code para confirmar visita e marcar conversão</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <BarChart3 className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Relatórios de conversão</h3>
              <p className="text-zinc-500 text-sm mt-1">Acompanhe desempenho de campanhas e visitas confirmadas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <p className="text-sm text-zinc-600">
          © 2026 GCLID Manager - Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
