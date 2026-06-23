"use client";

import { Heart, ChevronDown, Volume2, VolumeX, Shuffle, SkipBack, Pause, SkipForward, Repeat } from "lucide-react";
import { CalendarWidget } from "@/src/app/components/CalendarWidget";
import { LoveLetterWidget } from "@/src/app/components/LoveLetterWidget";
import { TemplateProps } from "./types";

export default function SpotifyTemplate({
  data,
  isPlaying,
  isMuted,
  activePhotoIdx,
  currentTime,
  duration,
  togglePlay,
  toggleMute,
  formatTime,
  getCardStyle,
  backgroundHearts,
  reactions,
  triggerReaction,
}: TemplateProps) {
  return (
    <div className="w-full min-h-screen bg-[#FAF9FF] text-[#2D2A4A] relative flex flex-col px-4 pt-4 pb-12 gap-5 animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(244,63,94,0.04),transparent_50%)] pointer-events-none"></div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {backgroundHearts.map((heart) => (
          <Heart
            key={heart.id}
            className="absolute text-rose-300/20 fill-rose-300/10 animate-float-heart"
            style={{
              left: `${heart.left}%`,
              width: `${heart.size}px`,
              height: `${heart.size}px`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
              bottom: "-50px",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-24 top-0 pointer-events-none overflow-hidden z-40">
        {reactions.map((r) => (
          <div
            key={r.id}
            className="absolute pointer-events-none text-rose-500 fill-rose-500 animate-reaction text-2xl"
            style={{
              left: `${r.left}%`,
              animationDelay: `${r.delay}s`,
              bottom: "20px"
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="w-full flex items-center justify-between text-[#2D2A4A] z-10 mt-1">
        <ChevronDown className="w-5 h-5 text-[#2D2A4A] shrink-0" />
        <span className="font-extrabold text-[10px] text-center tracking-tight text-rose-600 truncate max-w-[200px] uppercase">
          {data.partnerA} &amp; {data.partnerB}
        </span>
        <button
          onClick={toggleMute}
          className="p-1 hover:bg-slate-100 rounded-lg text-[#2D2A4A] shrink-0 transition-colors cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      <div className="w-full aspect-square max-h-[360px] relative z-10 flex items-center justify-center px-4 pt-2 pb-8">
        <div
          className="w-full h-full relative cursor-pointer"
          onClick={triggerReaction}
        >
          {data.photos.map((photo, index) => {
            const card = getCardStyle(index);
            return (
              <div key={photo.id} style={card.style} className="overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.label || "Moment"}
                  className={card.className}
                />
              </div>
            );
          })}
        </div>

        {data.photos[activePhotoIdx]?.label && (
          <div className="absolute bottom-11 left-1/2 -translate-x-1/2 z-40 bg-white/80 backdrop-blur-md border border-rose-100/50 px-4 py-2 rounded-2xl shadow-xl shadow-rose-900/10 text-center pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-300">
            <span className="text-[10px] font-extrabold text-rose-600 tracking-wide">
              {data.photos[activePhotoIdx].label}
            </span>
          </div>
        )}
      </div>

      <div className="w-full flex items-center justify-between mt-1 z-10 px-0.5">
        <div className="min-w-0 pr-4 flex-1">
          <h4 className="text-base font-black tracking-tight text-[#2D2A4A] truncate flex items-center gap-2">
            {data.songTitle}
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-3 shrink-0">
                <span className="w-0.75 h-2.5 bg-rose-500 rounded-full animate-bounce animation-duration-[0.6s]"></span>
                <span className="w-0.75 h-3.5 bg-rose-500 rounded-full animate-bounce animation-duration-[0.4s]"></span>
                <span className="w-0.75 h-1.5 bg-rose-500 rounded-full animate-bounce animation-duration-[0.8s]"></span>
                <span className="w-0.75 h-2.5 bg-rose-500 rounded-full animate-bounce animation-duration-[0.5s]"></span>
              </div>
            )}
          </h4>
          <p className="text-xs font-bold text-rose-600 mt-0.5 truncate">
            {data.songArtist} • Tema de {data.partnerA} &amp; {data.partnerB}
          </p>
        </div>

        <div
          className="relative shrink-0 w-11 h-11 flex items-center justify-center cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            triggerReaction();
          }}
        >
          <div className={`absolute inset-0 rounded-full bg-neutral-950 border border-white/10 shadow-lg flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
            <div className="w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center">
              <Heart className="w-2.5 h-2.5 text-white fill-current animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-1 relative py-1 z-10">
        <div className="w-full h-1 bg-slate-200 rounded-full overflow-visible relative">
          <div
            className="h-full bg-rose-500 rounded-full relative transition-all duration-500 linear"
            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1.5 w-3 h-3 bg-white border-2 border-rose-500 rounded-full flex items-center justify-center shadow-md">
              <Heart className="w-1.5 h-1.5 text-rose-500 fill-rose-500" />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between text-[9px] text-[#696684] font-semibold mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration || 180)}</span>
        </div>
      </div>

      <div className="w-full flex items-center justify-between px-6 z-10">
        <Shuffle className="w-3.5 h-3.5 text-[#696684]" />
        <SkipBack className="w-4 h-4 text-[#2D2A4A] fill-current" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
            triggerReaction();
          }}
          className={`cursor-pointer w-10 h-10 rounded-full bg-rose-500 hover:bg-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20 active:scale-95 transition-all ${isPlaying ? "animate-pulse" : ""}`}
        >
          {isPlaying ? <Pause className="w-4.5 h-4.5 text-white fill-current" /> : <Heart className="w-4.5 h-4.5 fill-current text-white" />}
        </button>
        <SkipForward className="w-4 h-4 text-[#2D2A4A] fill-current" />
        <Repeat className="w-3.5 h-3.5 text-[#696684]" />
      </div>

      <div className="w-full flex flex-col gap-5 z-10 mt-1">
        <LoveLetterWidget notes={data.letterLines} size="md" dark={false} />
        <CalendarWidget dateStr={data.anniversary} size="md" dark={false} />
      </div>
      <a
        href="https://glamourlindoia.com.br"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full text-center mt-auto pt-6 opacity-60 hover:opacity-100 text-[10px] text-[#696684] hover:text-rose-500 font-bold tracking-wider z-10 transition-all hover:underline"
      >
        Criado com amor via glamourlindoia.com.br
      </a>
    </div>
  );
}
