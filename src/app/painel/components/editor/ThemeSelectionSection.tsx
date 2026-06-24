"use client";

import { useState } from "react";
import { LayoutGrid, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useEditor } from "./EditorContext";
import SpotifyTemplate from "@/src/app/p/[id]/components/spotify/SpotifyTemplate";
import StoryTemplate from "@/src/app/p/[id]/components/story/StoryTemplate";

export function ThemeSelectionSection() {
  const { theme, setTheme } = useEditor();
  const [activeSlide, setActiveSlide] = useState(theme === "spotify" ? 0 : 1);

  const mockData = {
    partnerA: "Lucas",
    partnerB: "Gabriela",
    anniversary: "12/06/2023 18:30",
    songTitle: "Perfect",
    songArtist: "Ed Sheeran",
    songUrl: "https://www.youtube.com/watch?v=yKNxeF4Kxyc",
    letterTitle: "Para Minha Vida",
    letterLines: [
      "Desde o momento em que te conheci, percebi que minha vida nunca mais seria a mesma. Cada detalhe, cada conversa e cada sorriso ao seu lado me fazem ter a certeza de que quero passar o resto dos meus dias com você."
    ],
    photos: [
      { id: "1", url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500", label: "O início de tudo" },
      { id: "2", url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500", label: "Nossa cumplicidade" }
    ]
  };

  const templateProps = {
    isPlaying: true,
    isMuted: true,
    activePhotoIdx: 0,
    currentTime: 75,
    duration: 180,
    togglePlay: () => {},
    toggleMute: () => {},
    formatTime: (s: number) => {
      const mins = Math.floor(s / 60);
      const secs = Math.floor(s % 60);
      return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    },
    getCardStyle: (idx: number) => ({
      style: {
        position: "absolute" as const,
        inset: 0,
        width: "100%",
        height: "100%",
        border: theme === "story" ? "5px solid #232035" : "6px solid white",
        borderRadius: "16px",
        opacity: idx === 0 ? 1 : 0,
        zIndex: idx === 0 ? 10 : 0,
      },
      className: `absolute inset-0 w-full h-full object-cover ${idx === 0 ? "animate-ken-burns" : ""}`
    }),
    backgroundHearts: [
      { id: 1, left: 10, size: 12, delay: 0, duration: 8 },
      { id: 2, left: 50, size: 16, delay: -2, duration: 10 },
      { id: 3, left: 80, size: 10, delay: -4, duration: 7 }
    ],
    reactions: [],
    triggerReaction: () => {},
    storyProgress: 0,
    handlePrevStory: () => {},
    handleNextStory: () => {},
    handleStoryTouchStart: () => {},
    handleStoryTouchEnd: () => {},
    handleStoryMouseDown: () => {},
    handleStoryMouseUp: () => {},
    handleStoryMouseLeave: () => {},
    isStoryPaused: true
  };

  const selectTheme = (t: "spotify" | "story", idx: number) => {
    setTheme(t);
    setActiveSlide(idx);
  };

  return (
    <div className="bg-white border border-[#E8E6F5] p-5 md:p-8 rounded-[32px] shadow-[0_10px_40px_rgba(45,42,74,0.02)]">
      <h3 className="text-base font-bold text-[#2D2A4A] flex items-center gap-2 mb-2">
        <LayoutGrid className="w-5 h-5 text-[#9A75F0]" />
        Escolha o Modelo de Tema
      </h3>
      <p className="text-xs text-[#696684] mb-6">
        Selecione o estilo visual que melhor combina com a história de amor de vocês.
      </p>

      <div className="block md:hidden relative w-full">
        <div className="flex flex-col items-center">
          <div className="w-full flex items-center justify-between gap-2 mb-4">
            <button
              type="button"
              onClick={() => selectTheme(activeSlide === 0 ? "story" : "spotify", activeSlide === 0 ? 1 : 0)}
              className="p-2 rounded-full border border-slate-200 bg-white text-slate-600 active:bg-slate-50 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-black text-[#2D2A4A] uppercase tracking-wider">
              {activeSlide === 0 ? "Modelo Spotify" : "Modelo Story"}
            </span>
            <button
              type="button"
              onClick={() => selectTheme(activeSlide === 0 ? "story" : "spotify", activeSlide === 0 ? 1 : 0)}
              className="p-2 rounded-full border border-slate-200 bg-white text-slate-600 active:bg-slate-50 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="w-full flex justify-center">
            {activeSlide === 0 ? (
              <div
                onClick={() => setTheme("spotify")}
                className={`w-full max-w-[310px] flex flex-col items-center rounded-3xl p-3 border-2 transition-all duration-300 cursor-pointer ${
                  theme === "spotify"
                    ? "border-[#9A75F0] bg-slate-50/50 shadow-md ring-2 ring-[#9A75F0]/10"
                    : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <div className="relative mx-auto w-[275px] h-[550px] bg-black rounded-[42px] shadow-[0_20px_40px_rgba(45,42,74,0.12)] border-8 border-neutral-900 p-1.5 overflow-hidden flex flex-col justify-between mb-4">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 h-4 w-24 bg-black rounded-full z-30"></div>
                  <div className="w-full h-full rounded-[32px] overflow-y-auto relative scrollbar-hidden">
                    <SpotifyTemplate data={mockData} {...templateProps} />
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-sm font-extrabold text-[#2D2A4A] flex items-center justify-center gap-1">
                    Modelo Spotify
                    {theme === "spotify" && <Check className="w-4 h-4 text-emerald-500" />}
                  </span>
                  <span className="text-[10px] text-[#696684] mt-1 block">
                    Reprodutor musical dark, ideal para casais conectados por músicas especiais.
                  </span>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setTheme("story")}
                className={`w-full max-w-[310px] flex flex-col items-center rounded-3xl p-3 border-2 transition-all duration-300 cursor-pointer ${
                  theme === "story"
                    ? "border-[#9A75F0] bg-slate-50/50 shadow-md ring-2 ring-[#9A75F0]/10"
                    : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <div className="relative mx-auto w-[275px] h-[550px] bg-black rounded-[42px] shadow-[0_20px_40px_rgba(45,42,74,0.12)] border-8 border-neutral-900 p-1.5 overflow-hidden flex flex-col justify-between mb-4">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 h-4 w-24 bg-black rounded-full z-30"></div>
                  <div className="w-full h-full rounded-[32px] overflow-y-auto relative scrollbar-hidden">
                    <StoryTemplate data={mockData} {...templateProps} />
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-sm font-extrabold text-[#2D2A4A] flex items-center justify-center gap-1">
                    Modelo Story
                    {theme === "story" && <Check className="w-4 h-4 text-emerald-500" />}
                  </span>
                  <span className="text-[10px] text-[#696684] mt-1 block">
                    Estilo redes sociais com transições dinâmicas de imagens.
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={() => selectTheme("spotify", 0)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                activeSlide === 0 ? "bg-[#9A75F0] w-6" : "bg-slate-200"
              }`}
            />
            <button
              type="button"
              onClick={() => selectTheme("story", 1)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                activeSlide === 1 ? "bg-[#9A75F0] w-6" : "bg-slate-200"
              }`}
            />
          </div>
        </div>
      </div>

      <div className="hidden md:grid grid-cols-2 gap-6">
        <div
          onClick={() => setTheme("spotify")}
          className={`flex flex-col items-center rounded-3xl p-4 border-2 transition-all duration-300 cursor-pointer ${
            theme === "spotify"
              ? "border-[#9A75F0] bg-slate-50/50 shadow-md ring-2 ring-[#9A75F0]/10"
              : "border-[#E8E6F5] hover:border-[#9A75F0]/50 hover:bg-slate-50/50"
          }`}
        >
          <div className="relative mx-auto w-[275px] h-[550px] bg-black rounded-[42px] shadow-[0_20px_40px_rgba(45,42,74,0.12)] border-8 border-neutral-900 p-1.5 overflow-hidden flex flex-col justify-between mb-4">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 h-4 w-24 bg-black rounded-full z-30"></div>
            <div className="w-full h-full rounded-[32px] overflow-y-auto relative scrollbar-hidden">
              <SpotifyTemplate data={mockData} {...templateProps} />
            </div>
          </div>
          <div className="text-center max-w-[240px]">
            <span className="text-sm font-extrabold text-[#2D2A4A] flex items-center justify-center gap-1">
              Modelo Spotify
              {theme === "spotify" && <Check className="w-4 h-4 text-emerald-500" />}
            </span>
            <span className="text-[10.5px] text-[#696684] mt-1.5 block">
              Ideal para casais conectados por músicas especiais, com visual reprodutor dark e contador de dias.
            </span>
          </div>
        </div>

        <div
          onClick={() => setTheme("story")}
          className={`flex flex-col items-center rounded-3xl p-4 border-2 transition-all duration-300 cursor-pointer ${
            theme === "story"
              ? "border-[#9A75F0] bg-slate-50/50 shadow-md ring-2 ring-[#9A75F0]/10"
              : "border-[#E8E6F5] hover:border-[#9A75F0]/50 hover:bg-slate-50/50"
          }`}
        >
          <div className="relative mx-auto w-[275px] h-[550px] bg-black rounded-[42px] shadow-[0_20px_40px_rgba(45,42,74,0.12)] border-8 border-neutral-900 p-1.5 overflow-hidden flex flex-col justify-between mb-4">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 h-4 w-24 bg-black rounded-full z-30"></div>
            <div className="w-full h-full rounded-[32px] overflow-y-auto relative scrollbar-hidden">
              <StoryTemplate data={mockData} {...templateProps} />
            </div>
          </div>
          <div className="text-center max-w-[240px]">
            <span className="text-sm font-extrabold text-[#2D2A4A] flex items-center justify-center gap-1">
              Modelo Story
              {theme === "story" && <Check className="w-4 h-4 text-emerald-500" />}
            </span>
            <span className="text-[10.5px] text-[#696684] mt-1.5 block">
              Estilo redes sociais, com transições dinâmicas de imagens (Stories), cores suaves e design interativo.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
