"use client";

import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEditor } from "./EditorContext";
import { maskDate } from "@/src/lib/masks";

export function BasicInfoSection() {
  const {
    partnerA,
    setPartnerA,
    partnerB,
    setPartnerB,
    anniversary,
    setAnniversary,
    theme,
    setTheme,
  } = useEditor();

  return (
    <div className="bg-white border border-[#E8E6F5] p-6 md:p-8 rounded-[32px] shadow-[0_10px_40px_rgba(45,42,74,0.02)]">
      <h3 className="text-base font-bold text-[#2D2A4A] flex items-center gap-2 mb-6">
        1. Identidade &amp; Casal
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#696684]">
            Seu Nome
          </label>
          <Input
            type="text"
            value={partnerA}
            onChange={(e) => setPartnerA(e.target.value)}
            className="rounded-xl border-[#E8E6F5] bg-white text-[#2D2A4A] focus-visible:ring-[#9A75F0] text-xs py-5"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#696684]">
            Nome do Amor
          </label>
          <Input
            type="text"
            value={partnerB}
            onChange={(e) => setPartnerB(e.target.value)}
            className="rounded-xl border-[#E8E6F5] bg-white text-[#2D2A4A] focus-visible:ring-[#9A75F0] text-xs py-5"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#696684]">
            Data Especial (Início do Amor)
          </label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              value={anniversary}
              onChange={(e) => setAnniversary(maskDate(e.target.value))}
              placeholder="DD/MM/AAAA HH:MM"
              className="pl-10 rounded-xl border-[#E8E6F5] bg-white text-[#2D2A4A] focus-visible:ring-[#9A75F0] text-xs py-5"
            />
          </div>
          <span className="text-[9px] text-[#8C89A0] font-medium leading-none mt-0.5">
            Opcional: adicione as horas para um contador preciso (ex: 12/06/2023 18:30)
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#696684]">
            Modelo de Tema
          </label>
          <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
            <button
              type="button"
              onClick={() => setTheme("spotify")}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${theme === "spotify"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
                }`}
            >
              Estilo Spotify
            </button>
            <button
              type="button"
              onClick={() => setTheme("story")}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${theme === "story"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
                }`}
            >
              Estilo Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
