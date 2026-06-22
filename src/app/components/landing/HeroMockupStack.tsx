"use client";

import { useState, useEffect } from "react";
import { Heart, Wifi, Battery, ChevronDown, Shuffle, SkipBack, SkipForward, Repeat, Pause } from "lucide-react";
import { CalendarWidget } from "../CalendarWidget";
import { LoveLetterWidget } from "../LoveLetterWidget";

const CAROUSEL_PHOTOS = [
  { url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=150&auto=format&fit=crop", label: "Nosso Dia" },
  { url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=150&auto=format&fit=crop", label: "Minha Vida" },
  { url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=150&auto=format&fit=crop", label: "Abraço" },
  { url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop", label: "Viagem" }
];

const LOVE_NOTES = [
  "E pensar que tudo começou do nada...",
  "Olha só pra gente agora:",
  "Escrevendo nossa história,",
  "E eternizando nosso amor..."
];

export function HeroMockupStack() {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % CAROUSEL_PHOTOS.length);
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

      <div className="absolute left-[3%] sm:left-[8%] w-[180px] h-[320px] bg-black rounded-[30px] border-[5px] border-neutral-900 shadow-[0_15px_30px_rgba(0,0,0,0.4)] p-1 overflow-hidden z-10 -rotate-6 transition-all hover:rotate-0 hover:scale-[1.02] hover:z-25 duration-500">
        <div className="w-full h-full rounded-[24px] bg-[#121212] text-white p-2 flex flex-col justify-between text-left relative select-none pt-7 pb-4 px-2.5 scrollbar-hidden overflow-y-auto touch-pan-y">
          <div className="absolute top-2 left-2 right-2 flex gap-0.5 z-30">
            {CAROUSEL_PHOTOS.map((_, index) => {
              const isCompleted = index < activePhotoIdx;
              const isActive = index === activePhotoIdx;
              return (
                <div key={index} className="flex-1 h-[2px] bg-white/20 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-white transition-all ${isCompleted ? "w-full" : isActive ? "w-full" : "w-0"}`}
                  />
                </div>
              );
            })}
          </div>

          <div className="absolute top-3.5 right-2 z-30 opacity-75 leading-none">
            <span className="text-[7px]">🔊</span>
          </div>

          <div className="mt-2 text-center px-1.5 flex flex-col gap-0.5 z-10 shrink-0">
            <h3 className="text-[9px] font-black tracking-tight text-white leading-none">
              Meu Porto Seguro
            </h3>
            <p className="text-[6.5px] text-white/80 leading-normal max-w-[130px] mx-auto font-medium">
              No seu abraço é onde encontro toda a paz e a segurança que preciso.
            </p>
          </div>

          <div className="-mx-2.5 w-[calc(100%+1.25rem)] h-[170px] relative overflow-hidden shrink-0 border-b border-white/5 my-2 bg-slate-900">
            <img
              src={CAROUSEL_PHOTOS[activePhotoIdx].url}
              alt="Story content"
              className="w-full h-full object-cover transition-all duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white text-black font-bold text-[6px] px-2.5 py-0.5 rounded-full shadow-md whitespace-nowrap">
              Próxima Seção
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-1.5 rounded-xl flex items-center justify-between gap-1.5 z-10 shadow-lg text-white mb-2 shrink-0">
            <div className="flex items-center gap-1 min-w-0">
              <div className="w-5 h-5 rounded-md overflow-hidden shrink-0 border border-white/10">
                <img
                  src={CAROUSEL_PHOTOS[activePhotoIdx].url}
                  alt="Mini Album"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[5.5px] font-extrabold truncate leading-tight">I Don't Want to Miss a Thing</span>
                <span className="text-[4.5px] text-white/70 truncate mt-0.5">Aerosmith • Tema do Casal</span>
              </div>
            </div>
            <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center border border-white/15 shrink-0">
              <Pause className="w-2 h-2 text-white fill-current" />
            </div>
          </div>

          <div className="flex flex-col gap-2 shrink-0 mb-2">
            <LoveLetterWidget notes={LOVE_NOTES} size="sm" dark={true} />
            <CalendarWidget dateStr="12/06/2023" size="sm" dark={true} />
          </div>

          <div className="w-full flex justify-center z-10 shrink-0 mb-1">
            <div className="bg-linear-to-r from-rose-500 to-pink-600 px-2 py-0.5 rounded-full flex items-center gap-1 text-white shadow-sm whitespace-nowrap">
              <Heart className="w-1.5 h-1.5 fill-current text-white animate-ping shrink-0" />
              <span className="text-[5px] font-black tracking-widest uppercase">DESDE 12/06/2023</span>
            </div>
          </div>

          <div className="w-full flex justify-center mt-0.5 z-10 shrink-0">
            <div className="bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/5 text-[4.5px] text-white/40 font-mono leading-none">
              eterno.love — Privado
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-[3%] sm:right-[8%] w-[190px] h-[340px] bg-black rounded-[32px] border-[6px] border-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-1 overflow-hidden z-20 rotate-6 transition-all hover:rotate-0 hover:scale-[1.02] duration-500">
        <div className="w-full h-full rounded-[24px] bg-[#FAF9FF] p-2.5 flex flex-col gap-3 text-left relative scrollbar-hidden overflow-y-auto text-[#2D2A4A] pb-4 touch-pan-y">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(244,63,94,0.03),transparent_50%)] pointer-events-none"></div>

          <div className="w-full flex flex-col min-h-[275px] justify-between shrink-0">
            <div className="w-full flex items-center justify-between text-[6px] font-semibold text-[#2D2A4A]/80 z-20 pb-1">
              <span>18:33</span>
              <div className="flex items-center gap-1">
                <Wifi className="w-1.5 h-1.5 text-[#2D2A4A]" />
                <Battery className="w-2.5 h-2.5 text-[#2D2A4A]" />
              </div>
            </div>

            <div className="w-full flex items-center justify-between text-[#2D2A4A] mt-1 pr-1">
              <ChevronDown className="w-3 h-3 text-[#2D2A4A] shrink-0" />
              <span className="font-extrabold text-[8px] text-center tracking-tight text-rose-600 truncate max-w-[110px] uppercase">
                Lucas &amp; Gabriela
              </span>
              <div className="w-3"></div>
            </div>

            <div className="-mx-2.5 w-[calc(100%+1.25rem)] h-[170px] relative overflow-hidden shrink-0 border-b border-rose-100/10 mb-1 bg-slate-900 rounded-b-xl">
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
                <h4 className="text-[9px] font-black tracking-tight text-[#2D2A4A] truncate max-w-[130px]">
                  I Don't Want to Miss a Thing
                </h4>
                <p className="text-[6.5px] font-bold text-rose-600 mt-0.5">
                  Aerosmith • Tema do Casal
                </p>
              </div>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            </div>

            <div className="w-full flex flex-col gap-0.5 py-0.5">
              <div className="w-full h-0.5 bg-slate-200 rounded-full overflow-visible relative">
                <div className="w-[65%] h-full bg-rose-500 rounded-full relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-white border border-rose-500 rounded-full flex items-center justify-center shadow-xs">
                    <Heart className="w-1 text-rose-500 fill-rose-500" />
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-between text-[4.5px] text-[#696684] font-semibold mt-0.5">
                <span>Nosso Começo</span>
                <span>Para Sempre</span>
              </div>
            </div>

            <div className="w-full flex items-center justify-between px-2.5 mt-0.5">
              <Shuffle className="w-2.5 h-2.5 text-[#696684]" />
              <SkipBack className="w-2.5 h-2.5 text-[#2D2A4A] fill-current" />
              <div className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-xs">
                <Heart className="w-3 h-3 fill-current text-white" />
              </div>
              <SkipForward className="w-2.5 h-2.5 text-[#2D2A4A] fill-current" />
              <Repeat className="w-2.5 h-2.5 text-[#696684]" />
            </div>
          </div>

          <LoveLetterWidget notes={LOVE_NOTES} size="sm" dark={false} />

          <CalendarWidget dateStr="12/06/2023" size="sm" dark={false} />

          <div className="w-full text-center mt-auto pt-1 opacity-30 text-[5px]">
            eterno.love
          </div>
        </div>
      </div>
    </div>
  );
}
