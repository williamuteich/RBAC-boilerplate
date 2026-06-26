import { LogIn, PenLine, Share2 } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: LogIn,
    title: "Entre com o Google",
    description:
      "Acesse com sua conta Google em segundos. Nenhum cadastro complicado — você já está dentro.",
    color: "bg-rose-50 text-rose-500",
    border: "border-rose-100",
  },
  {
    number: "02",
    icon: PenLine,
    title: "Personalize sua homenagem",
    description:
      "Adicione os nomes do casal, fotos, música favorita e uma carta especial. Fica lindo em menos de 5 minutos.",
    color: "bg-[#EFEAFA] text-[#9A75F0]",
    border: "border-[#E0D9F9]",
  },
  {
    number: "03",
    icon: Share2,
    title: "Compartilhe e surpreenda",
    description:
      "Escolha um plano, ative o acesso e compartilhe o link. Veja a reação especial de quem você ama.",
    color: "bg-emerald-50 text-emerald-600",
    border: "border-emerald-100",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-16 px-4 bg-white/60 border-y border-[#E8E6F5] scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="inline-block text-[10px] font-black uppercase tracking-widest text-[#9A75F0] bg-[#9A75F0]/8 border border-[#9A75F0]/20 px-4 py-1.5 rounded-full mb-4">
            Simples assim
          </span>
          <h2 className="text-3xl font-black tracking-tight text-[#2D2A4A] leading-tight">
            Pronto em 3 passos
          </h2>
          <p className="text-sm text-[#696684] mt-3">
            Da ideia à surpresa em menos de 5 minutos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px bg-linear-to-r from-rose-200 via-[#C4B5FD] to-emerald-200 z-0" />

          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`relative z-10 flex flex-col items-center text-center gap-4 p-6 rounded-3xl bg-white border ${step.border} shadow-sm`}
              >
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${step.color} shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#2D2A4A] text-white text-[9px] font-black flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#2D2A4A]">{step.title}</h3>
                  <p className="text-xs text-[#696684] mt-1.5 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
