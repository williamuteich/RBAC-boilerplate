"use client";

import React, { useState, useEffect } from "react";
import { Heart, Wifi, Battery, Play, ChevronDown, Shuffle, SkipBack, SkipForward, Repeat, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const CAROUSEL_PHOTOS = [
  { url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=150&auto=format&fit=crop", label: "Nosso Dia" },
  { url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=150&auto=format&fit=crop", label: "Minha Vida" },
  { url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=150&auto=format&fit=crop", label: "Abraço" },
  { url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop", label: "Viagem" }
];

const LYRICS = [
  "E pensar que tudo começou do nada...",
  "Olha só pra gente agora:",
  "Escrevendo nossa história,",
  "E colecionando memórias..."
];

export function HeroMockupStack() {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [activeLyricIdx, setActiveLyricIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % CAROUSEL_PHOTOS.length);
      setActiveLyricIdx((prev) => (prev + 1) % LYRICS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-[420px] h-[380px] sm:h-[440px] flex items-center justify-center mx-auto select-none mt-6 lg:mt-0">
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 animate-float bg-white border border-[#E8E6F5] rounded-2xl px-4 py-2.5 shadow-[0_10px_30px_rgba(45,42,74,0.08)] flex items-center gap-2.5 whitespace-nowrap">
        <div className="w-6 h-6 rounded-full bg-[#EFEAFA] flex items-center justify-center text-[#8B5CF6]">
          <Heart className="w-3.5 h-3.5 fill-[#8B5CF6]" />
        </div>
        <div>
          <div className="text-[10px] font-extrabold text-[#2D2A4A]">+100.543</div>
          <div className="text-[8px] text-[#696684] font-medium">Pessoas emocionadas</div>
        </div>
      </div>

      <div className="absolute top-10 left-1/3 w-7 h-7 text-[#9A75F0]/30 animate-sway">
        <Heart className="w-full h-full fill-current" />
      </div>
      <div className="absolute bottom-16 right-1/4 w-9 h-9 text-[#8B5CF6]/20 animate-float">
        <Heart className="w-full h-full fill-current" />
      </div>
      <div className="absolute top-20 right-10 w-6 h-6 text-pink-500/25 animate-sway" style={{ animationDelay: "1s" }}>
        <Heart className="w-full h-full fill-current" />
      </div>
      <div className="absolute bottom-24 left-10 w-8 h-8 text-[#9A75F0]/20 animate-float" style={{ animationDelay: "1.5s" }}>
        <Heart className="w-full h-full fill-current" />
      </div>

      <div className="absolute left-[5%] sm:left-[10%] w-[180px] h-[320px] bg-[#0A0F0D] rounded-[30px] border-[5px] border-[#1C1F1D] shadow-[0_15px_30px_rgba(0,0,0,0.4)] p-1 overflow-hidden z-10 -rotate-12 transition-all hover:-rotate-6 hover:z-25 duration-500">
        <div className="w-full h-full rounded-[24px] bg-[#070B19] p-3 flex flex-col justify-between text-left relative">
          <div className="absolute inset-0 bg-radial-to-b from-emerald-500/10 to-transparent pointer-events-none"></div>
          
          <div className="w-full flex items-center justify-between text-[7px] font-medium opacity-60 text-white">
            <span>18:33</span>
            <div className="flex items-center gap-1">
              <Wifi className="w-2 h-2" />
              <Battery className="w-2.5 h-2.5" />
            </div>
          </div>

          <div className="my-auto flex flex-col gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white leading-tight">Alguém especial te enviou um presente</h5>
              <p className="text-[8px] text-slate-400 mt-1">Um momento único criado para celebrar o amor de vocês.</p>
            </div>
            <button className="w-full bg-[#10B981] text-white text-[9px] font-bold py-2 rounded-lg transition-transform hover:scale-[1.02]">
              Ver Homenagem
            </button>
          </div>

          <div className="w-full border-t border-slate-900 pt-2 flex justify-around opacity-40">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
          </div>
        </div>
      </div>

      <div className="absolute right-[5%] sm:right-[10%] w-[180px] h-[320px] bg-[#0F172A] rounded-[30px] border-[5px] border-[#1E293B] shadow-[0_15px_30px_rgba(0,0,0,0.4)] p-1 overflow-hidden z-10 rotate-12 transition-all hover:rotate-6 hover:z-25 duration-500">
        <div className="w-full h-full rounded-[24px] bg-[#020617] p-3 flex flex-col justify-between text-left relative">
          <div className="absolute inset-0 bg-radial-to-b from-indigo-500/10 to-transparent pointer-events-none"></div>

          <div className="w-full flex items-center justify-between text-[7px] font-medium opacity-60 text-white">
            <span>18:33</span>
            <div className="flex items-center gap-1">
              <Wifi className="w-2 h-2" />
              <Battery className="w-2.5 h-2.5" />
            </div>
          </div>

          <div className="my-auto flex flex-col gap-2.5">
            <span className="text-[6px] tracking-wider font-bold text-indigo-400 uppercase">Trilha Sonora</span>
            <div className="text-[9px] font-extrabold text-white leading-tight">I Don't Want to Miss a Thing</div>
            <div className="text-[7px] text-slate-400">Aerosmith</div>

            <div className="mt-1 space-y-1 opacity-80">
              <p className="text-[8px] text-slate-100 font-medium">você poderia ser</p>
              <p className="text-[8px] text-indigo-300 font-bold underline">meu maior orgulho</p>
              <p className="text-[8px] text-slate-300">do meu amor, e</p>
            </div>
          </div>

          <div className="w-full border-t border-slate-900 pt-2 flex justify-around opacity-40">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
          </div>
        </div>
      </div>

      <div className="absolute w-[190px] h-[340px] bg-black rounded-[32px] border-[6px] border-neutral-900 shadow-[0_20px_40px_rgba(0,0,0,0.6)] p-1 overflow-hidden z-20 transition-all hover:scale-[1.03] duration-500">
        <div className="w-full h-full rounded-[24px] bg-[#FAF9FF] p-2.5 flex flex-col justify-between text-left relative scrollbar-hidden overflow-y-auto text-[#2D2A4A]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(139,92,246,0.03),transparent_50%)] pointer-events-none"></div>

          <div className="w-full flex items-center justify-between text-[6px] font-semibold text-[#2D2A4A]/80 z-20 pb-2">
            <span>18:33</span>
            <div className="flex items-center gap-1">
              <Wifi className="w-1.5 h-1.5 text-[#2D2A4A]" />
              <Battery className="w-2.5 h-2.5 text-[#2D2A4A]" />
            </div>
          </div>

          <div className="w-full flex items-center justify-between text-[#2D2A4A] mt-1 pr-1">
            <ChevronDown className="w-3 h-3 text-[#2D2A4A] shrink-0" />
            <span className="font-extrabold text-[8px] text-center tracking-tight text-[#2D2A4A] truncate max-w-[110px] uppercase">
              Lucas &amp; Gabriela
            </span>
            <div className="w-3"></div>
          </div>

          <div className="relative w-full h-32 flex items-center justify-center my-1">
            {CAROUSEL_PHOTOS.map((photo, index) => {
              const isCurrent = index === activePhotoIdx;
              const isNext = index === (activePhotoIdx + 1) % CAROUSEL_PHOTOS.length;
              const isPrev = index === (activePhotoIdx - 1 + CAROUSEL_PHOTOS.length) % CAROUSEL_PHOTOS.length;

              let classes = "absolute scale-75 opacity-0 pointer-events-none z-0";
              if (isCurrent) {
                classes = "absolute scale-100 opacity-100 z-35 rotate-6 translate-x-1.5 shadow-md";
              } else if (isNext) {
                classes = "absolute scale-95 opacity-90 z-25 -rotate-6 -translate-x-1.5 shadow-sm";
              } else if (isPrev) {
                classes = "absolute scale-90 opacity-40 z-10 rotate-12 translate-x-3.5 shadow-xs";
              }

              return (
                <div
                  key={index}
                  className={`bg-white p-1 rounded-md border border-slate-150 flex flex-col gap-0.5 w-26 transition-all duration-700 ease-in-out ${classes}`}
                >
                  <img
                    src={photo.url}
                    alt={photo.label}
                    className="aspect-square w-full object-cover rounded-xs"
                  />
                  <span className="text-[5px] font-extrabold text-[#2D2A4A] text-center pt-0.5 leading-none">
                    {photo.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="w-full flex items-center justify-between mt-1">
            <div>
              <h4 className="text-[10px] font-black tracking-tight text-[#2D2A4A]">
                Nossa História
              </h4>
              <p className="text-[6px] text-[#696684] mt-0.5">juntos desde 12/06/2023</p>
            </div>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
          </div>

          <div className="w-full flex flex-col gap-0.5">
            <div className="w-full h-0.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="w-[65%] h-full bg-[#9A75F0] rounded-full"></div>
            </div>
            <div className="w-full flex justify-between text-[5px] text-[#696684] font-semibold">
              <span>2:14</span>
              <span>-1:16</span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between px-2.5 mt-0.5">
            <Shuffle className="w-2.5 h-2.5 text-[#696684]" />
            <SkipBack className="w-2.5 h-2.5 text-[#2D2A4A] fill-current" />
            <div className="w-6 h-6 rounded-full bg-[#9A75F0] flex items-center justify-center text-white shadow-xs">
              <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
            </div>
            <SkipForward className="w-2.5 h-2.5 text-[#2D2A4A] fill-current" />
            <Repeat className="w-2.5 h-2.5 text-[#696684]" />
          </div>

          <Card className="w-full p-2 border-none rounded-xl bg-[#9A75F0] text-white shadow-md relative overflow-hidden flex flex-col gap-1 mt-2">
            <span className="text-[6px] font-extrabold tracking-wider uppercase text-white/70 flex items-center gap-0.5">
              <MessageCircle className="w-2 h-2" /> Letra da Nossa História
            </span>
            <div className="space-y-0.5 mt-0.5">
              {LYRICS.map((line, idx) => {
                const isActive = idx === activeLyricIdx;
                return (
                  <p
                    key={idx}
                    className={`leading-tight transition-all duration-500 origin-left ${
                      isActive
                        ? "text-[8px] font-black text-white scale-102"
                        : "text-[6px] font-bold text-white/40"
                    }`}
                  >
                    {line}
                  </p>
                );
              })}
            </div>
          </Card>

          <div className="w-full text-center mt-3 pt-1 opacity-30 text-[5px]">
            eterno.love
          </div>
        </div>
      </div>
    </div>
  );
}
