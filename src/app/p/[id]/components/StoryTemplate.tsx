"use client";

import { Heart, Volume2, VolumeX, Pause, Play, QrCode } from "lucide-react";
import { CalendarWidget } from "@/src/app/components/CalendarWidget";
import { LoveLetterWidget } from "@/src/app/components/LoveLetterWidget";
import { TemplateProps } from "./types";

export default function StoryTemplate({
  data,
  isPlaying,
  isMuted,
  activePhotoIdx,
  togglePlay,
  toggleMute,
  getCardStyle,
  backgroundHearts,
  reactions,
  triggerReaction,
  storyProgress,
  handlePrevStory,
  handleNextStory,
  handleStoryTouchStart,
  handleStoryTouchEnd,
  handleStoryMouseDown,
  handleStoryMouseUp,
  handleStoryMouseLeave,
  isStoryPaused,
  toggleQrCode,
}: TemplateProps) {
  return (
    <div className="w-full min-h-screen bg-[#121212] text-white flex flex-col px-4 pt-4 pb-12 gap-4 relative animate-in fade-in duration-500">


      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <img
          src={data.photos[activePhotoIdx]?.url}
          alt="Blurred BG"
          className="w-full h-full object-cover blur-2xl scale-125 transition-all duration-1000"
        />
      </div>

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

      <div className="w-full flex gap-1 z-30 px-1">
        {data.photos.map((_, index) => {
          const isCompleted = index < activePhotoIdx;
          const isActive = index === activePhotoIdx;
          return (
            <div key={index} className="flex-1 h-[2px] bg-white/20 rounded-full overflow-hidden">
              <div
                className={`h-full bg-white ${isActive ? "animate-story-progress" : ""} ${isStoryPaused ? "animation-paused" : ""}`}
                style={{
                  width: isCompleted ? "100%" : "0%"
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="w-full flex justify-between items-center mt-1 z-30 px-1">
        <div className="flex items-center gap-2">
          <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
            <div className={`absolute inset-0 rounded-full bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px] ${isPlaying ? 'animate-spin-slow' : ''}`}>
              <div className="w-full h-full rounded-full bg-[#121212]"></div>
            </div>
            <div className="w-8 h-8 rounded-full overflow-hidden z-10 border border-black flex items-center justify-center bg-rose-500">
              <Heart className="w-4.5 h-4.5 text-white fill-current" />
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xs font-black tracking-tight text-white uppercase leading-none">
              {data.partnerA} &amp; {data.partnerB}
            </h3>
            <span className="text-[8px] text-rose-400 font-extrabold uppercase tracking-widest mt-1">
              🟢 ONLINE • NOSSA HISTÓRIA
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {toggleQrCode && (
            <button
              onClick={toggleQrCode}
              className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors border border-white/5 cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={toggleMute}
            className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors border border-white/5 cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="w-full aspect-4/5 max-h-[400px] relative z-10 flex items-center justify-center px-4 pt-2 pb-10 my-1">
        <div className="w-full h-full relative">
          {data.photos.map((photo, index) => {
            const card = getCardStyle(index);
            return (
              <div key={photo.id} style={card.style} className="overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.label || "Story content"}
                  className={card.className}
                />
              </div>
            );
          })}
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none z-15 rounded-2xl"></div>

        {data.photos[activePhotoIdx]?.label && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 w-[80%] bg-black/75 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl shadow-xl text-center pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-[8px] font-black text-rose-400 tracking-widest uppercase mb-0.5">
              Nossos Momentos
            </p>
            <p className="text-[11px] font-bold text-white leading-relaxed tracking-wide">
              {data.photos[activePhotoIdx].label}
            </p>
          </div>
        )}

        <div
          className="absolute inset-0 z-20 flex"
          onTouchStart={handleStoryTouchStart}
          onTouchEnd={handleStoryTouchEnd}
          onMouseDown={handleStoryMouseDown}
          onMouseUp={handleStoryMouseUp}
          onMouseLeave={handleStoryMouseLeave}
        >
          <div
            className="w-[35%] h-full cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevStory();
            }}
          />
          <div
            className="w-[65%] h-full cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleNextStory();
            }}
          />
        </div>
      </div>

      <div className="w-full flex gap-2.5 z-10">
        <div className="flex-1 bg-white/10 border border-white/15 p-2.5 rounded-2xl flex items-center justify-between gap-2.5 shadow-lg text-white">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-white/10">
              <img
                src={data.photos[activePhotoIdx]?.url}
                alt="Mini Album"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-extrabold truncate leading-tight">{data.songTitle}</span>
              <span className="text-[10px] text-white/70 truncate mt-0.5">{data.songArtist}</span>
            </div>
          </div>
          <button
            onClick={togglePlay}
            className="cursor-pointer w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border border-white/15 shrink-0 transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-white fill-current" /> : <Play className="w-3.5 h-3.5 text-white fill-current translate-x-0.5" />}
          </button>
        </div>

        <button
          onClick={triggerReaction}
          className="w-12 h-12 rounded-2xl bg-linear-to-tr from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 flex items-center justify-center text-white shadow-lg shadow-rose-500/20 active:scale-90 transition-all border border-rose-400/20 shrink-0 cursor-pointer"
        >
          <Heart className="w-5 h-5 fill-current animate-pulse text-white" />
        </button>
      </div>

      <div className="flex flex-col gap-3 z-10">
        <LoveLetterWidget notes={data.letterLines} size="md" dark={true} />
        <CalendarWidget dateStr={data.anniversary} size="md" dark={true} />
      </div>
      <div className="w-full flex flex-col items-center gap-3 mt-2 z-10">
        <div className="bg-linear-to-r from-rose-500 to-pink-600 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-white shadow-md">
          <Heart className="w-2.5 h-2.5 fill-current text-white animate-ping shrink-0" />
          <span className="text-[7.5px] font-black tracking-widest uppercase">DESDE {data.anniversary}</span>
        </div>

        <a
          href="https://glamourlindoia.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black/40 hover:bg-black/60 backdrop-blur-xs px-3 py-1 rounded-full border border-white/5 text-[9px] text-white/60 hover:text-rose-400 font-mono transition-all hover:underline"
        >
          glamourlindoia.com.br — Homenagem Especial
        </a>
      </div>
    </div>
  );
}
