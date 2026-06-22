"use client";

import React, { useState, useEffect, useRef } from "react";
import { Heart, Calendar, Wifi, Battery, User, HeartHandshake, ChevronDown, SkipBack, SkipForward, Shuffle, Repeat, Pause } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarWidget } from "./CalendarWidget";
import { LoveLetterWidget } from "./LoveLetterWidget";

const CAROUSEL_PHOTOS = [
  { url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=300&auto=format&fit=crop", label: "Nosso Dia" },
  { url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=300&auto=format&fit=crop", label: "Minha Vida" },
  { url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=300&auto=format&fit=crop", label: "Abraço" },
  { url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop", label: "Viagem" }
];

const LOVE_NOTES = [
  "E pensar que tudo começou do nada...",
  "Olha só pra gente agora:",
  "Escrevendo nossa história,",
  "E eternizando nosso amor..."
];

export function LoveSim() {
  const [partnerA, setPartnerA] = useState("Lucas");
  const [partnerB, setPartnerB] = useState("Gabriela");
  const [anniversary, setAnniversary] = useState("12/06/2023");
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [activeTheme, setActiveTheme] = useState<"spotify" | "story">("spotify");
  const [showScrollTip, setShowScrollTip] = useState(true);

  const spotifyScrollRef = useRef<HTMLDivElement>(null);
  const storyScrollRef = useRef<HTMLDivElement>(null);

  const nameA = partnerA.trim() ? partnerA.trim() : "Lucas";
  const nameB = partnerB.trim() ? partnerB.trim() : "Gabriela";

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % CAROUSEL_PHOTOS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setShowScrollTip(true);
    const container = activeTheme === "spotify" ? spotifyScrollRef.current : storyScrollRef.current;
    if (container) {
      container.scrollTop = 0;
    }
  }, [activeTheme]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const top = e.currentTarget.scrollTop;
    setShowScrollTip(top < 20);
  };

  const slugify = (strA: string, strB: string) => {
    const clean = (s: string) =>
      s
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "");
    return `${clean(strA)}-e-${clean(strB)}`;
  };

  const username = `${slugify(nameA, "").replace("-e-", "")}.${slugify(nameB, "").replace("-e-", "")}`;

  return (
    <div className="w-full flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center font-sans">
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

      <div className="flex flex-col items-center gap-4">
        <div className="bg-[#EFEAFA]/85 border border-[#E8E6F5] p-1 rounded-full flex items-center gap-1 shadow-xs">
          <button
            onClick={() => setActiveTheme("spotify")}
            className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold transition-all cursor-pointer ${
              activeTheme === "spotify"
                ? "bg-rose-500 text-white shadow-xs"
                : "text-[#696684] hover:text-[#2D2A4A]"
            }`}
          >
            🎵 Player
          </button>
          <button
            onClick={() => setActiveTheme("story")}
            className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold transition-all cursor-pointer ${
              activeTheme === "story"
                ? "bg-rose-500 text-white shadow-xs"
                : "text-[#696684] hover:text-[#2D2A4A]"
            }`}
          >
            📸 Story
          </button>
        </div>

        <div className="relative mx-auto w-[290px] h-[580px] bg-black rounded-[42px] shadow-[0_20px_40px_rgba(45,42,74,0.12)] border-8 border-neutral-900 p-1.5 overflow-hidden flex flex-col justify-between">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 h-4 w-24 bg-black rounded-full z-30"></div>

          {activeTheme === "spotify" ? (
            <div 
              ref={spotifyScrollRef} 
              onScroll={handleScroll}
              className="w-full h-full rounded-[32px] overflow-y-auto touch-pan-y px-4 pt-10 pb-8 flex flex-col items-center gap-4 relative transition-all duration-700 bg-[#FAF9FF] text-[#2D2A4A] scrollbar-hidden select-none"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(244,63,94,0.04),transparent_50%)] pointer-events-none"></div>

              <div className="w-full flex items-center justify-between text-[9px] font-medium opacity-85 z-20 px-2 absolute top-2.5 left-0 right-0 max-w-[260px] mx-auto">
                <span>09:41</span>
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-2.5 h-2.5 text-[#2D2A4A]" />
                  <Battery className="w-3.5 h-3.5 text-[#2D2A4A]" />
                </div>
              </div>

              <div className="w-full flex flex-col gap-6 z-10 mt-4 px-1">
                <div className="w-full flex flex-col gap-4 min-h-[430px] justify-between shrink-0">
                  <div className="w-full flex items-center justify-between text-[#2D2A4A] mt-1 pr-1">
                    <ChevronDown className="w-4 h-4 text-[#2D2A4A] shrink-0" />
                    <span className="font-extrabold text-[10px] text-center tracking-tight text-rose-600 truncate max-w-[170px] uppercase">
                      {nameA} &amp; {nameB}
                    </span>
                    <div className="w-4"></div>
                  </div>

                  <div className="-mx-4 w-[calc(100%+2rem)] h-[270px] relative overflow-hidden shrink-0 border-b border-rose-100/10 mb-1 bg-slate-900 rounded-b-2xl">
                    {CAROUSEL_PHOTOS.map((photo, index) => {
                      const isActive = index === activePhotoIdx;
                      return (
                        <img
                          key={index}
                          src={photo.url}
                          alt="Couple Moment"
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                            isActive ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-95"
                          }`}
                        />
                      );
                    })}
                  </div>

                  <div className="w-full flex items-center justify-between mt-1">
                    <div>
                      <h4 className="text-xs font-black tracking-tight text-[#2D2A4A] truncate max-w-[190px]">
                        I Don't Want to Miss a Thing
                      </h4>
                      <p className="text-[9px] font-bold text-rose-600 mt-0.5">
                        Aerosmith • Tema de {nameA} &amp; {nameB}
                      </p>
                    </div>
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse shrink-0" />
                  </div>

                  <div className="w-full flex flex-col gap-1 relative py-1">
                    <div className="w-full h-1 bg-slate-200 rounded-full overflow-visible relative">
                      <div className="w-[65%] h-full bg-rose-500 rounded-full relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1.5 w-3 h-3 bg-white border-2 border-rose-500 rounded-full flex items-center justify-center shadow-md">
                          <Heart className="w-1.5 h-1.5 text-rose-500 fill-rose-500" />
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex justify-between text-[7px] text-[#696684] font-semibold mt-1">
                      <span>Nosso Começo</span>
                      <span>Para Sempre</span>
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-between px-4">
                    <Shuffle className="w-3.5 h-3.5 text-[#696684]" />
                    <SkipBack className="w-4 h-4 text-[#2D2A4A] fill-current" />
                    <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
                      <Heart className="w-4.5 h-4.5 fill-current text-white" />
                    </div>
                    <SkipForward className="w-4 h-4 text-[#2D2A4A] fill-current" />
                    <Repeat className="w-3.5 h-3.5 text-[#696684]" />
                  </div>
                </div>

                <LoveLetterWidget notes={LOVE_NOTES} size="md" dark={false} />

                <CalendarWidget dateStr={anniversary} size="md" dark={false} />
              </div>

            <a
              href="https://glamourlindoia.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center mt-auto pt-2 opacity-60 hover:opacity-100 text-[9px] z-10 text-[#696684] hover:text-rose-500 font-bold transition-all hover:underline"
            >
              Criado com amor via glamourlindoia.com.br
            </a>
          </div>
          ) : (
            <div 
              ref={storyScrollRef} 
              onScroll={handleScroll}
              className="w-full h-full rounded-[32px] bg-[#121212] text-white p-3 flex flex-col justify-between text-left relative select-none pt-10 pb-6 px-4 scrollbar-hidden overflow-y-auto touch-pan-y"
            >
              <div className="absolute top-10 left-4 right-4 flex gap-0.5 z-30">
                {CAROUSEL_PHOTOS.map((_, index) => {
                  const isCompleted = index < activePhotoIdx;
                  const isActive = index === activePhotoIdx;
                  return (
                    <div key={index} className="flex-1 h-[2px] bg-white/20 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-white transition-all ${
                          isCompleted ? "w-full" : isActive ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="absolute top-13 right-4 z-30 opacity-70 font-semibold text-[8px]">
                🔊
              </div>

              <div className="mt-4 text-center px-2 flex flex-col gap-1.5 z-10 shrink-0">
                <h3 className="text-sm font-black tracking-tight text-white">
                  Meu Porto Seguro
                </h3>
                <p className="text-[9px] text-white/80 leading-relaxed max-w-[220px] mx-auto font-medium">
                  No seu abraço é onde encontro toda a paz e a segurança que preciso. Você é meu lar e meu porto seguro.
                </p>
              </div>

              <div className="-mx-4 w-[calc(100%+2rem)] h-[270px] relative overflow-hidden shrink-0 border-b border-white/5 my-3 bg-slate-900">
                <img
                  src={CAROUSEL_PHOTOS[activePhotoIdx].url}
                  alt="Story content"
                  className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-2.5 rounded-2xl flex items-center justify-between gap-2.5 z-10 shadow-lg text-white mb-3 shrink-0">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-white/10">
                    <img
                      src={CAROUSEL_PHOTOS[activePhotoIdx].url}
                      alt="Mini Album"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[8px] font-extrabold truncate leading-tight">I Don't Want to Miss a Thing</span>
                    <span className="text-[6px] text-white/70 truncate mt-0.5">Aerosmith • Tema do Casal</span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center border border-white/15 shrink-0">
                  <Pause className="w-3.5 h-3.5 text-white fill-current" />
                </div>
              </div>

              <div className="flex flex-col gap-3 shrink-0 mb-3">
                <LoveLetterWidget notes={LOVE_NOTES} size="md" dark={true} />
                <CalendarWidget dateStr={anniversary} size="md" dark={true} />
              </div>

              <div className="w-full flex justify-center z-10 py-1.5 shrink-0 mb-2">
                <div className="bg-linear-to-r from-rose-500 to-pink-600 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-white shadow-md">
                  <Heart className="w-2.5 h-2.5 fill-current text-white animate-ping shrink-0" />
                  <span className="text-[7.5px] font-black tracking-widest uppercase">DESDE {anniversary}</span>
                </div>
              </div>

              <div className="w-full flex justify-center mt-2 z-10 shrink-0">
                <a
                  href="https://glamourlindoia.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black/40 hover:bg-black/60 backdrop-blur-xs px-3 py-1 rounded-full border border-white/5 text-[8px] text-white/60 hover:text-rose-400 font-mono transition-all hover:underline"
                >
                  glamourlindoia.com.br — Homenagem Especial
                </a>
              </div>
            </div>
          )}

          {showScrollTip && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 bg-rose-500 text-white p-1.5 rounded-full shadow-lg pointer-events-none animate-bounce flex items-center justify-center">
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
