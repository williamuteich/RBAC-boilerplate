"use client";

import { useState, FormEvent } from "react";
import { Ticket, CheckCircle2, AlertCircle, Loader2, ArrowRight, CreditCard, Zap, Star, Crown, Check } from "lucide-react";

const PLANS = [
  {
    key: "basic",
    label: "Só Hoje",
    duration: "24h",
    originalPrice: "R$ 19,90",
    priceWhole: "5",
    priceFraction: ",99",
    description: "Uma surpresa rápida e emocionante.",
    features: [
      "Acesso por 1 dia",
      "Edições Ilimitadas",
      "Fotos e Seções Ilimitadas",
    ],
    badge: "ECONÔMICO",
    popular: false,
    buttonText: "Escolher Basic",
    color: "border-[#E8E6F5] bg-white",
    badgeColor: "bg-slate-100 text-slate-600 border border-slate-200",
    priceColor: "text-[#2D2A4A]",
  },
  {
    key: "standard",
    label: "Mais Tempo",
    duration: "7 Dias",
    originalPrice: "R$ 39,90",
    priceWhole: "14",
    priceFraction: ",99",
    description: "Uma semana inteira para celebrar o amor.",
    features: [
      "Acesso por 7 dias",
      "Edições Ilimitadas",
      "Fotos e Seções Ilimitadas",
    ],
    badge: "MAIS VENDIDO",
    popular: true,
    buttonText: "Escolher Standard",
    color: "border-[#9A75F0] bg-[#FAF9FF] ring-2 ring-[#9A75F0]/10",
    badgeColor: "bg-[#9A75F0] text-white",
    priceColor: "text-[#9A75F0]",
  },
  {
    key: "pro",
    label: "Eterno",
    duration: "30 Dias",
    originalPrice: "R$ 59,90",
    priceWhole: "27",
    priceFraction: ",99",
    description: "Um mês inteiro de memórias inesquecíveis.",
    features: [
      "Acesso por 30 dias",
      "Edições Ilimitadas",
      "Fotos e Seções Ilimitadas",
    ],
    badge: "MELHOR VALOR",
    popular: false,
    buttonText: "Escolher Pro",
    color: "border-[#E8E6F5] bg-white",
    badgeColor: "bg-amber-100 text-amber-800 border border-amber-200",
    priceColor: "text-[#2D2A4A]",
  },
];

export default function ResgateoCupomPage() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!code.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/painel/cupom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Cupom resgatado com sucesso!");
      } else {
        setStatus("error");
        setMessage(data.error || "Erro ao resgatar cupom.");
      }
    } catch {
      setStatus("error");
      setMessage("Erro de conexão. Tente novamente.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center border-4 border-emerald-100 shadow-lg shadow-emerald-100">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black text-[#2D2A4A] tracking-tight">Conta Ativada!</h2>
          <p className="text-sm text-[#696684] mt-2 leading-relaxed">{message}</p>
          <p className="text-xs text-[#696684] mt-1">Agora você pode personalizar e visualizar sua homenagem.</p>
        </div>
        <a
          href="/painel"
          className="inline-flex items-center gap-2 bg-[#9A75F0] hover:bg-[#855fe6] text-white font-bold py-3 px-6 rounded-xl transition-all text-sm shadow-md shadow-[#9A75F0]/30 hover:scale-[1.02] active:scale-[0.98]"
        >
          Ir para meu painel
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h1 className="text-3xl font-black text-[#2D2A4A] tracking-tight">
          Ativar Acesso à Homenagem
        </h1>
        <p className="text-xs text-[#696684] mt-2">
          Escolha um plano abaixo para manter sua homenagem ativa ou resgate um cupom.
        </p>
      </div>

      {/* ── Pricing Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-2">
        {PLANS.map((plan) => {
          return (
            <div
              key={plan.key}
              className={`relative flex flex-col justify-between p-6 rounded-3xl border-2 transition-all ${plan.color}`}
            >
              {plan.badge && (
                <span className={`absolute -top-3 left-6 text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${plan.badgeColor}`}>
                  {plan.badge}
                </span>
              )}

              <div className="flex flex-col gap-4">
                <div className="pt-2">
                  <h3 className="text-lg font-black text-[#2D2A4A]">
                    {plan.label} ({plan.duration})
                  </h3>
                  <p className="text-[11px] text-[#696684] mt-1 min-h-[32px] leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="flex flex-col mt-1">
                  <span className="text-[11px] text-slate-400 line-through font-semibold">
                    {plan.originalPrice}
                  </span>
                  <div className="flex items-baseline mt-0.5">
                    <span className="text-xs font-bold text-[#696684] mr-0.5">R$</span>
                    <span className={`text-4xl font-black ${plan.priceColor} tracking-tight`}>
                      {plan.priceWhole}
                    </span>
                    <span className={`text-sm font-black ${plan.priceColor}`}>
                      {plan.priceFraction}
                    </span>
                  </div>
                </div>

                <div className="w-full border-t border-[#E8E6F5] my-1"></div>

                <ul className="flex flex-col gap-2.5">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-[#696684] font-medium">
                      <Check className={`w-4 h-4 shrink-0 ${plan.popular ? "text-[#9A75F0]" : "text-slate-400"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <form action="/api/painel/checkout_sessions" method="POST" className="mt-6">
                <input type="hidden" name="plan" value={plan.key} />
                <button
                  type="submit"
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs transition-all shadow-sm cursor-pointer hover:scale-[1.01] active:scale-[0.99] ${plan.popular
                      ? "bg-[#9A75F0] hover:bg-[#855fe6] text-white shadow-md shadow-[#9A75F0]/20"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                    }`}
                >
                  <CreditCard className="w-4 h-4" />
                  {plan.buttonText}
                </button>
              </form>
            </div>
          );
        })}
      </div>

      {/* Rodapé informativo do preço */}
      <p className="text-center text-[11px] text-[#696684] font-medium -mt-2">
        Pagamento único · Sem assinatura · Acesso imediato
      </p>

      {/* ── Divisor ── */}
      <div className="relative my-4 w-full max-w-md mx-auto">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-[#E8E6F5]"></div>
        </div>
        <div className="relative flex justify-center text-[10px] uppercase tracking-wider font-semibold">
          <span className="bg-[#FAF9FF] px-3 text-[#696684]">ou resgate um cupom de acesso</span>
        </div>
      </div>

      {/* ── Seção de Cupom Simplificada ── */}
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl border border-[#E8E6F5] p-3 shadow-xs">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              if (status === "error") setStatus("idle");
            }}
            placeholder="Digite o código (Ex: LOVE-A3F9)"
            maxLength={20}
            className={`flex-1 min-w-0 font-mono text-xs font-bold tracking-wider px-3 py-2.5 rounded-xl border outline-none bg-[#FAFAFA] transition-all placeholder:text-slate-400 placeholder:font-normal placeholder:tracking-normal ${status === "error"
                ? "border-red-300 text-red-700 bg-red-50/50 focus:border-red-400"
                : "border-[#E8E6F5] text-[#2D2A4A] focus:border-[#9A75F0] focus:bg-white"
              }`}
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="submit"
            disabled={status === "loading" || !code.trim()}
            className="flex items-center gap-1.5 bg-[#9A75F0] hover:bg-[#855fe6] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2.5 px-4 rounded-xl transition-all text-xs shadow-sm cursor-pointer whitespace-nowrap"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Validando...
              </>
            ) : (
              <>
                <Ticket className="w-3.5 h-3.5" />
                Resgatar
              </>
            )}
          </button>
        </form>

        {status === "error" && (
          <div className="flex items-center gap-1.5 text-red-600 text-[10px] font-semibold bg-red-50 border border-red-100 rounded-lg px-3 py-2 mt-2">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{message}</span>
          </div>
        )}
      </div>

      <p className="text-xs text-center text-[#696684] -mt-2">
        Encontrou algum problema?{" "}
        <a href="/painel/suporte" className="text-[#9A75F0] font-semibold hover:underline">
          Fale com o suporte
        </a>
      </p>
    </div>
  );
}
