"use client";

import { useState, FormEvent } from "react";
import { Ticket, CheckCircle2, AlertCircle, Loader2, ArrowRight, Lock } from "lucide-react";

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
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center border-4 border-emerald-100 shadow-lg shadow-emerald-100">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <div className="text-center max-w-sm">
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
    <div className="flex flex-col gap-8 w-full max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-black text-[#2D2A4A] tracking-tight flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#9A75F0]/10 flex items-center justify-center">
            <Ticket className="w-5 h-5 text-[#9A75F0]" />
          </div>
          Resgatar Cupom
        </h1>
        <p className="text-xs text-[#696684] mt-2">
          Insira o código do cupom recebido para ativar sua conta e acessar todos os recursos da plataforma.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E8E6F5] shadow-sm p-6 flex flex-col gap-6">
        <div className="flex items-start gap-3 bg-[#F5F3FF] rounded-xl p-4 border border-[#E8E6F5]">
          <Lock className="w-4 h-4 text-[#9A75F0] shrink-0 mt-0.5" />
          <p className="text-xs text-[#696684] leading-relaxed">
            Seu cupom de ativação foi fornecido no momento da compra. O código segue o formato{" "}
            <span className="font-mono font-bold text-[#2D2A4A]">PREFIXO-XXXX</span>, ex:{" "}
            <span className="font-mono font-bold text-[#9A75F0]">LOVE-A3F9</span>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#2D2A4A] uppercase tracking-wider">
              Código do Cupom
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                if (status === "error") setStatus("idle");
              }}
              placeholder="EX: LOVE-A3F9"
              maxLength={20}
              className={`w-full font-mono text-lg font-bold tracking-[0.2em] text-center px-4 py-4 rounded-xl border-2 bg-[#FAFAFA] outline-none transition-all placeholder:text-slate-300 placeholder:font-normal placeholder:tracking-normal placeholder:text-sm ${status === "error"
                  ? "border-red-300 text-red-700 bg-red-50/50 focus:border-red-400"
                  : "border-[#E8E6F5] text-[#2D2A4A] focus:border-[#9A75F0] focus:bg-white"
                }`}
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          {status === "error" && (
            <div className="flex items-center gap-2 text-red-600 text-xs font-semibold bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading" || !code.trim()}
            className="w-full flex items-center justify-center gap-2 bg-[#9A75F0] hover:bg-[#855fe6] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-xl transition-all text-sm shadow-md shadow-[#9A75F0]/20 hover:scale-[1.01] active:scale-[0.99]"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Validando...
              </>
            ) : (
              <>
                <Ticket className="w-4 h-4" />
                Resgatar Cupom
              </>
            )}
          </button>
        </form>
      </div>

      <p className="text-xs text-center text-[#696684]">
        Não tem um cupom ou encontrou algum problema?{" "}
        <a href="/painel/suporte" className="text-[#9A75F0] font-semibold hover:underline">
          Fale com o suporte
        </a>
      </p>
    </div>
  );
}
