import { Button } from "@/components/ui/button";

export function PromoSection() {
  return (
    <section id="parceria" className="py-16 bg-slate-900/20 border-t border-slate-900 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-linear-to-r from-rose-950/40 to-indigo-950/40 rounded-3xl p-8 md:p-12 border border-rose-500/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex-1 flex flex-col gap-3 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 text-[10px] font-semibold w-fit mx-auto md:mx-0">
              BENEFÍCIO EXCLUSIVO
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Parceria Glamour Lindóia
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Ao adquirir suas alianças de prata na Glamour Lindóia, você ganha acesso a uma página personalizada inclusa no seu pacote para presentear quem você ama.
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col gap-3 justify-center items-center">
            <a
              href="https://aliancas.glamourlindoia.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button className="w-full sm:w-64 bg-linear-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-xs font-semibold py-6 px-8 rounded-xl border-none transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-rose-500/25">
                Escolher Nossas Alianças
              </Button>
            </a>
            <span className="text-[10px] text-slate-500">
              Redireciona para o site oficial da Glamour Lindóia
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
