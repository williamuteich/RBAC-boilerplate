import Link from "next/link";
import { Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeroMockupStack } from "./HeroMockupStack";

export function Hero() {
  return (
    <section className="relative pt-8 pb-16 px-4 md:py-20 max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
      <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 max-w-xl">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl text-[#2D2A4A] leading-[1.15]">
          Declare seu amor de uma forma{" "}
          <span className="bg-linear-to-r from-[#9A75F0] to-[#8B5CF6] bg-clip-text text-transparent">
            inesquecível.
          </span>
        </h1>

        <p className="text-[#696684] text-sm sm:text-base leading-relaxed">
          Crie uma homenagem digital eterna para o seu amor com fotos, música, calendário personalizado e link com QR Code exclusivo. Esta homenagem é ideal para o Dia dos Namorados, o dia em que o casal se conheceu ou até mesmo em dias comuns para lembrar o quanto você ama essa pessoa. Pronto em 5 minutos.
        </p>

        <Card className="w-full bg-[#11101E] border border-slate-800 p-6 md:p-8 rounded-3xl flex flex-col items-center gap-6 shadow-xl relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#9A75F0]/5 rounded-full blur-2xl pointer-events-none"></div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#14532D]/80 border border-green-500/20 text-[#4ADE80] text-[10px] font-bold uppercase tracking-wider">
            Melhor Custo-Benefício
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-base font-bold text-slate-100">
              Página Personalizada Completa
            </h3>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-2xl font-black text-white">R$ 29</span>
              <span className="text-sm font-bold text-white">,90</span>
            </div>
            <span className="text-[11px] text-slate-400">
              Pagamento único &bull; Acesso por 1 ano
            </span>
          </div>

          <div className="flex flex-col gap-3 w-full text-left max-w-xs mx-auto border-t border-slate-800/80 pt-5">
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Check className="w-4 h-4 text-green-400 shrink-0" />
              <span>Temas Spotify e Instagram Story</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Check className="w-4 h-4 text-green-400 shrink-0" />
              <span>Galeria de Fotos do Casal</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Check className="w-4 h-4 text-green-400 shrink-0" />
              <span>Calendário &amp; Música do Casal</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Check className="w-4 h-4 text-green-400 shrink-0" />
              <span>Link + QR Code Exclusivo</span>
            </div>
          </div>

          <div className="w-full flex flex-col gap-3 items-center">
            <Link href="#simulador" className="w-full">
              <Button className="w-full bg-linear-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-6 rounded-2xl shadow-lg shadow-rose-500/20 border-none transition-transform hover:scale-[1.02] active:scale-[0.98]">
                Criar Página Agora
              </Button>
            </Link>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
              <Lock className="w-3 h-3" />
              <span>Pix ou Cartão de Crédito</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex-1 w-full flex items-center justify-center">
        <HeroMockupStack />
      </div>
    </section>
  );
}
