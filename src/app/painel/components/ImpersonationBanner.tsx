"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

interface ImpersonationBannerProps {
  email: string;
}

export function ImpersonationBanner({ email }: ImpersonationBannerProps) {
  const router = useRouter();
  const [isEnding, setIsEnding] = useState(false);

  const handleEndSimulation = async () => {
    setIsEnding(true);
    try {
      const res = await fetch("/api/admin/clientes/simulate", {
        method: "DELETE"
      });
      if (res.ok) {
        router.push("/admin/clientes");
        router.refresh();
      }
    } catch (err) {
      console.error("Erro ao encerrar simulação:", err);
    } finally {
      setIsEnding(false);
    }
  };

  return (
    <div className="bg-[#FAF9FF] border-b border-amber-200 text-amber-800 text-xs font-bold py-2.5 px-6 flex items-center justify-between shrink-0 animate-in slide-in-from-top duration-300">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
        <span>Modo de Simulação: Visualizando e editando como <strong className="text-amber-950">{email}</strong></span>
      </div>
      <button
        onClick={handleEndSimulation}
        disabled={isEnding}
        className="cursor-pointer bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-extrabold flex items-center gap-1.5 transition-all active:scale-95"
      >
        <LogOut className="w-3 h-3" />
        Voltar ao Admin
      </button>
    </div>
  );
}
