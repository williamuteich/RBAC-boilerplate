import { Wrench, Users, ShieldCheck, BarChart3 } from "lucide-react";

export function LoginSidebar() {
  return (
    <div className="relative hidden w-full lg:flex lg:w-1/2 bg-zinc-950 flex-col justify-between p-12 overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')" }}
      />
      <div className="absolute inset-0 z-0 bg-linear-to-br from-zinc-950 via-zinc-950/90 to-orange-950/80" />

      <div className="relative z-10 flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-orange-500 rounded-lg shadow-lg">
          <Wrench className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">RentalPro</span>
      </div>

      <div className="relative z-10 max-w-lg mt-12 mb-auto pt-24">
        <h1 className="text-4xl font-extrabold text-white leading-tight mb-6">
          Gestão completa para sua <br />
          <span className="text-orange-500">locadora de equipamentos</span>
        </h1>

        <p className="text-zinc-400 text-lg mb-12">
          Controle equipamentos, locações e relatórios em uma única plataforma robusta e segura.
        </p>

        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <Users className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Gestão de Usuários</h3>
              <p className="text-zinc-500 text-sm mt-1">Controle de acesso centralizado e seguro</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <ShieldCheck className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Controle de devoluções</h3>
              <p className="text-zinc-500 text-sm mt-1">Detecção automática de atrasos e multas</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <BarChart3 className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Relatórios em tempo real</h3>
              <p className="text-zinc-500 text-sm mt-1">Fluxo financeiro diário e mensal consolidado</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <p className="text-sm text-zinc-600">
          © 2026 RentalPro - Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
