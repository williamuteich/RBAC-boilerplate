import Link from "next/link";
import { Check, Zap, Star, Crown, ArrowRight } from "lucide-react";

const PLANS = [
  {
    key: "basic",
    icon: Zap,
    label: "Basic",
    duration: "24 horas",
    badge: null,
    priceWhole: "5",
    priceFraction: ",99",
    originalPrice: "R$ 19,90",
    description: "Perfeito para uma surpresa rápida e especial.",
    features: [
      "Acesso completo por 1 dia",
      "Fotos e galeria ilimitadas",
      "Música do casal integrada",
      "Carta personalizada",
      "Link compartilhável",
    ],
    cta: "Começar agora",
    popular: false,
    cardClass: "bg-white border-[#E8E6F5] hover:border-[#C4B5FD]",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
    ctaClass: "bg-slate-900 hover:bg-slate-800 text-white",
    checkColor: "text-slate-400",
  },
  {
    key: "standard",
    icon: Star,
    label: "Standard",
    duration: "7 dias",
    badge: "MAIS VENDIDO",
    priceWhole: "14",
    priceFraction: ",99",
    originalPrice: "R$ 39,90",
    description: "Uma semana para celebrar o amor a dois.",
    features: [
      "Acesso completo por 7 dias",
      "Fotos e galeria ilimitadas",
      "Música do casal integrada",
      "Carta personalizada",
      "Link compartilhável",
    ],
    cta: "Escolher Standard",
    popular: true,
    cardClass: "bg-[#FAF9FF] border-[#9A75F0] ring-2 ring-[#9A75F0]/10 scale-[1.02]",
    iconBg: "bg-[#9A75F0]/10",
    iconColor: "text-[#9A75F0]",
    ctaClass: "bg-[#9A75F0] hover:bg-[#855fe6] text-white shadow-lg shadow-[#9A75F0]/25",
    checkColor: "text-[#9A75F0]",
  },
  {
    key: "pro",
    icon: Crown,
    label: "Pro",
    duration: "30 dias",
    badge: "MELHOR VALOR",
    priceWhole: "27",
    priceFraction: ",99",
    originalPrice: "R$ 59,90",
    description: "Um mês inteiro de memórias inesquecíveis.",
    features: [
      "Acesso completo por 30 dias",
      "Fotos e galeria ilimitadas",
      "Música do casal integrada",
      "Carta personalizada",
      "Link compartilhável",
    ],
    cta: "Escolher Pro",
    popular: false,
    cardClass: "bg-white border-[#E8E6F5] hover:border-[#C4B5FD]",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    ctaClass: "bg-slate-900 hover:bg-slate-800 text-white",
    checkColor: "text-slate-400",
  },
];

export function Pricing() {
  return (
    <section id="precos" className="py-20 px-4 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="inline-block text-[10px] font-black uppercase tracking-widest text-[#9A75F0] bg-[#9A75F0]/8 border border-[#9A75F0]/20 px-4 py-1.5 rounded-full mb-4">
            Preços simples e transparentes
          </span>
          <h2 className="text-3xl font-black tracking-tight text-[#2D2A4A] leading-tight">
            Escolha quanto tempo sua homenagem fica ativa
          </h2>
          <p className="text-sm text-[#696684] mt-3 leading-relaxed">
            Pagamento único, sem assinatura. Acesso liberado na hora.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {PLANS.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.key}
                className={`relative flex flex-col justify-between p-7 rounded-3xl border-2 transition-all duration-200 ${plan.cardClass}`}
              >
                {plan.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#9A75F0] text-white whitespace-nowrap shadow-md">
                    {plan.badge}
                  </span>
                )}

                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3 pt-1">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${plan.iconBg}`}>
                      <Icon className={`w-5 h-5 ${plan.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-[#2D2A4A]">{plan.label}</h3>
                      <p className="text-[10px] text-[#696684]">{plan.duration}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 line-through font-semibold">{plan.originalPrice}</span>
                    <div className="flex items-baseline gap-0.5 mt-0.5">
                      <span className="text-xs font-bold text-[#696684]">R$</span>
                      <span className="text-4xl font-black text-[#2D2A4A] tracking-tight leading-none">{plan.priceWhole}</span>
                      <span className="text-sm font-black text-[#2D2A4A]">{plan.priceFraction}</span>
                    </div>
                    <p className="text-[10px] text-[#696684] mt-1">{plan.description}</p>
                  </div>

                  <div className="border-t border-[#E8E6F5]" />

                  <ul className="flex flex-col gap-2.5">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-[#696684]">
                        <Check className={`w-3.5 h-3.5 shrink-0 ${plan.checkColor}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/login" className="mt-6 block">
                  <button
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer ${plan.ctaClass}`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[11px] text-[#696684] mt-8">
          Pagamento único · Sem assinatura · Acesso imediato após confirmação
        </p>
      </div>
    </section>
  );
}
