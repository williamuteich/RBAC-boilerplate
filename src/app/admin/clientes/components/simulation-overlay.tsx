import { SimulationOverlayProps } from "@/src/types/dashboard/clientes";

export function SimulationOverlay({ clientName }: SimulationOverlayProps) {
  if (!clientName) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-50 flex items-center justify-center animate-in fade-in duration-300">
      <div className="bg-white border border-[#E8E6F5] p-8 rounded-[32px] shadow-2xl flex flex-col items-center gap-4 text-center max-w-sm">
        <div className="w-12 h-12 rounded-full border-4 border-[#9A75F0] border-t-transparent animate-spin"></div>
        <div>
          <h4 className="text-sm font-bold text-[#2D2A4A]">Simulando Acesso</h4>
          <p className="text-xs text-[#696684] mt-1.5 leading-relaxed">
            Entrando no painel do usuário de <strong className="text-[#9A75F0]">{clientName}</strong>...
          </p>
        </div>
      </div>
    </div>
  );
}
