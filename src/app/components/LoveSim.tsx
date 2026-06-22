"use client";

import React, { useState, useEffect } from "react";
import { Heart, Calendar, Wifi, Battery, User, HeartHandshake, ChevronDown, Play, Shuffle, SkipBack, SkipForward, Repeat, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CAROUSEL_PHOTOS = [
  { url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=300&auto=format&fit=crop", label: "Nosso Dia" },
  { url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=300&auto=format&fit=crop", label: "Minha Vida" },
  { url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=300&auto=format&fit=crop", label: "Abraço" },
  { url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop", label: "Viagem" }
];

const LYRICS = [
  "E pensar que tudo começou do nada...",
  "Olha só pra gente agora:",
  "Escrevendo nossa história,",
  "E colecionando memórias..."
];

export function LoveSim() {
  const [partnerA, setPartnerA] = useState("Lucas");
  const [partnerB, setPartnerB] = useState("Gabriela");
  const [anniversary, setAnniversary] = useState("12/06/2023");
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [activeLyricIdx, setActiveLyricIdx] = useState(0);

  const nameA = partnerA.trim() ? partnerA.trim() : "Lucas";
  const nameB = partnerB.trim() ? partnerB.trim() : "Gabriela";

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % CAROUSEL_PHOTOS.length);
      setActiveLyricIdx((prev) => (prev + 1) % LYRICS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const slugify = (strA: string, strB: string) => {
    const clean = (s: string) =>
      s
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "");
    return `${clean(strA)}-e-${clean(strB)}`;
  };

  const slug = slugify(nameA, nameB);

  return (
    <div className="w-full flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center">
      <div className="w-full lg:w-96 flex flex-col gap-5">
        <div>
          <h3 className="text-xl font-bold text-[#2D2A4A] flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-[#9A75F0]" />
            Preencha seus Dados
          </h3>
          <p className="text-xs text-[#696684] mt-1">
            Insira os nomes e a data especial para ver a atualização no celular ao lado.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#696684]">
              Seu Nome
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                value={partnerA}
                onChange={(e) => setPartnerA(e.target.value)}
                placeholder="Lucas"
                className="pl-10 rounded-xl border-[#E8E6F5] bg-white text-[#2D2A4A] focus-visible:ring-[#9A75F0] focus-visible:border-[#9A75F0] text-xs py-5"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#696684]">
              Nome do seu amor
            </label>
            <div className="relative">
              <Heart className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                value={partnerB}
                onChange={(e) => setPartnerB(e.target.value)}
                placeholder="Gabriela"
                className="pl-10 rounded-xl border-[#E8E6F5] bg-white text-[#2D2A4A] focus-visible:ring-[#9A75F0] focus-visible:border-[#9A75F0] text-xs py-5"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#696684]">
              Data do Início de Namoro / Casamento
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                value={anniversary}
                onChange={(e) => setAnniversary(e.target.value)}
                placeholder="12/06/2023"
                className="pl-10 rounded-xl border-[#E8E6F5] bg-white text-[#2D2A4A] focus-visible:ring-[#9A75F0] focus-visible:border-[#9A75F0] text-xs py-5"
              />
            </div>
          </div>
        </div>

        <Button className="w-full bg-linear-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-6 rounded-2xl shadow-lg shadow-rose-500/20 mt-2 border-none">
          Criar Página Agora
        </Button>
      </div>

      <div className="relative mx-auto w-[290px] h-[580px] bg-black rounded-[42px] shadow-[0_20px_40px_rgba(45,42,74,0.12)] border-8 border-neutral-900 p-1.5 overflow-hidden flex flex-col justify-between">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 h-4 w-24 bg-black rounded-full z-30"></div>

        <div className="w-full h-full rounded-[32px] overflow-y-auto px-4 pt-10 pb-6 flex flex-col items-center gap-4 relative transition-all duration-700 bg-[#FAF9FF] text-[#2D2A4A] scrollbar-hidden select-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(139,92,246,0.04),transparent_50%)] pointer-events-none"></div>

          <div className="w-full flex items-center justify-between text-[9px] font-medium opacity-85 z-20 px-2 absolute top-2.5 left-0 right-0 max-w-[260px] mx-auto">
            <span>09:41</span>
            <div className="flex items-center gap-1.5">
              <Wifi className="w-2.5 h-2.5 text-[#2D2A4A]" />
              <Battery className="w-3.5 h-3.5 text-[#2D2A4A]" />
            </div>
          </div>

          <div className="w-full bg-slate-200/50 backdrop-blur-md rounded-full px-3.5 py-1.5 flex items-center justify-between border border-white/40 z-20 shadow-xs mt-1">
            <span className="text-[9px] font-mono tracking-wide opacity-75 truncate pr-2">eterno.love/{slug}</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse shrink-0" />
          </div>

          <div className="w-full flex flex-col gap-4 z-10 mt-2 px-1">
            <div className="w-full flex items-center justify-between text-[#2D2A4A] mt-1 pr-1">
              <ChevronDown className="w-4 h-4 text-[#2D2A4A] shrink-0" />
              <span className="font-extrabold text-[10px] text-center tracking-tight text-[#2D2A4A] truncate max-w-[170px] uppercase">
                {nameA} &amp; {nameB}
              </span>
              <div className="w-4"></div>
            </div>

            <div className="relative w-full h-56 flex items-center justify-center my-1">
              {CAROUSEL_PHOTOS.map((photo, index) => {
                const isCurrent = index === activePhotoIdx;
                const isNext = index === (activePhotoIdx + 1) % CAROUSEL_PHOTOS.length;
                const isPrev = index === (activePhotoIdx - 1 + CAROUSEL_PHOTOS.length) % CAROUSEL_PHOTOS.length;

                let classes = "absolute scale-75 opacity-0 pointer-events-none z-0";
                if (isCurrent) {
                  classes = "absolute scale-100 opacity-100 z-35 rotate-6 translate-x-2 shadow-xl";
                } else if (isNext) {
                  classes = "absolute scale-95 opacity-90 z-25 -rotate-6 -translate-x-2 shadow-lg";
                } else if (isPrev) {
                  classes = "absolute scale-90 opacity-40 z-10 rotate-12 translate-x-4 shadow-xs";
                }

                return (
                  <div
                    key={index}
                    className={`bg-white p-2.5 rounded-xl border border-slate-150 flex flex-col gap-1.5 w-44 transition-all duration-700 ease-in-out ${classes}`}
                  >
                    <img
                      src={photo.url}
                      alt={photo.label}
                      className="aspect-square w-full object-cover rounded-lg"
                    />
                    <span className="text-[8px] font-black text-[#2D2A4A] text-center pt-0.5 leading-none">
                      {photo.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="w-full flex items-center justify-between mt-1">
              <div>
                <h4 className="text-base font-extrabold tracking-tight text-[#2D2A4A]">
                  Nossa História
                </h4>
                <p className="text-[9px] text-[#696684] mt-0.5">juntos desde {anniversary}</p>
              </div>
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
            </div>

            <div className="w-full flex flex-col gap-1">
              <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                <div className="w-[65%] h-full bg-[#9A75F0] rounded-full"></div>
              </div>
              <div className="w-full flex justify-between text-[7px] text-[#696684] font-semibold">
                <span>2:14</span>
                <span>-1:16</span>
              </div>
            </div>

            <div className="w-full flex items-center justify-between px-4">
              <Shuffle className="w-3.5 h-3.5 text-[#696684]" />
              <SkipBack className="w-4 h-4 text-[#2D2A4A] fill-current" />
              <div className="w-10 h-10 rounded-full bg-[#9A75F0] flex items-center justify-center text-white shadow-md shadow-[#9A75F0]/20">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              <SkipForward className="w-4 h-4 text-[#2D2A4A] fill-current" />
              <Repeat className="w-3.5 h-3.5 text-[#696684]" />
            </div>

            <Card className="w-full p-4 border-none rounded-2xl bg-[#9A75F0] text-white shadow-lg relative overflow-hidden flex flex-col gap-2 mt-2">
              <span className="text-[8px] font-extrabold tracking-wider uppercase text-white/70 flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5" /> Letra da Nossa História
              </span>
              <div className="space-y-1.5 mt-1">
                {LYRICS.map((line, idx) => {
                  const isActive = idx === activeLyricIdx;
                  return (
                    <p
                      key={idx}
                      className={`leading-tight transition-all duration-500 origin-left ${
                        isActive
                          ? "text-[11px] font-black text-white scale-102"
                          : "text-[9px] font-bold text-white/40"
                      }`}
                    >
                      {line}
                    </p>
                  );
                })}
              </div>
            </Card>
          </div>

          <div className="w-full text-center mt-auto pt-2 opacity-50 text-[7px] z-10">
            Criado via Eterno.love
          </div>
        </div>
      </div>
    </div>
  );
}
