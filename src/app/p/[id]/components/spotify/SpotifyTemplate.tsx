"use client";

import React, { useMemo } from "react";
import { Heart, QrCode, Volume2, VolumeX, Shuffle, SkipBack, Pause, SkipForward, Repeat, Copy, Download, X } from "lucide-react";
import { CalendarWidget } from "@/src/app/components/CalendarWidget";
import { LoveLetterWidget } from "@/src/app/components/LoveLetterWidget";
import { PhotoItem } from "@/src/types/love-widgets";
import { TemplateProps } from "../types";
import { useTributeAudio, useTributeReactions, useTributeSharing } from "../hooks";

export default function SpotifyTemplate({ data, isPublic = false }: TemplateProps) {
  const {
    isPlaying,
    isMuted,
    activePhotoIdx,
    currentTime,
    duration,
    togglePlay,
    toggleMute,
    videoId,
  } = useTributeAudio(data.songUrl, data.photos.length, isPublic, "spotify");

  const { reactions, triggerReaction } = useTributeReactions(isPublic);

  const {
    showQrModal,
    setShowQrModal,
    copied,
    shareUrl,
    handleCopyLink,
    handleDownloadQrCode,
    toggleQrCode,
  } = useTributeSharing();

  const backgroundHearts = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 14 + 8,
      delay: Math.random() * -15,
      duration: Math.random() * 10 + 10,
    }));
  }, []);

  const getCardStyle = (index: number) => {
    const isActive = index === activePhotoIdx;
    return {
      style: {
        position: "absolute" as const,
        inset: 0,
        width: "100%",
        height: "100%",
        border: "6px solid white",
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.22)",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        transition: "opacity 0.8s ease-in-out",
        opacity: isActive ? 1 : 0,
        zIndex: isActive ? 10 : 0,
        pointerEvents: isActive ? ("auto" as const) : ("none" as const),
      },
      className: `absolute inset-0 w-full h-full object-cover ${isActive ? "animate-ken-burns" : ""}`,
    };
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === null) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF9FF] text-[#2D2A4A] relative flex flex-col px-4 pt-4 pb-12 gap-5 animate-in fade-in duration-500">
      {isPublic && videoId && (
        <div className="hidden">
          <div id="youtube-player" />
        </div>
      )}

      <style jsx global>{`
        @keyframes float-heart {
          0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-80vh) rotate(360deg) scale(0.6); opacity: 0; }
        }
        @keyframes reaction-float {
          0% { transform: translateY(0) scale(0.8) rotate(0deg); opacity: 0; }
          15% { transform: translateY(-20px) scale(1.2) rotate(-10deg); opacity: 1; }
          50% { transform: translateY(-80px) scale(1) rotate(10deg); opacity: 0.85; }
          100% { transform: translateY(-160px) scale(0.7) rotate(0deg); opacity: 0; }
        }
        .animate-float-heart { animation: float-heart 12s linear infinite; }
        .animate-reaction { animation: reaction-float 2s cubic-bezier(0.08, 0.82, 0.17, 1) forwards; }
        .animate-spin-slow { animation: spin 15s linear infinite; }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(244,63,94,0.04),transparent_50%)] pointer-events-none"></div>

      {isPublic && (
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
      )}

      {isPublic && (
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
      )}

      <div className="w-full flex items-center justify-between text-[#2D2A4A] z-10 mt-1">
        {isPublic ? (
          <button
            onClick={toggleQrCode}
            className="p-1 hover:bg-slate-100 rounded-lg text-[#2D2A4A] shrink-0 transition-colors cursor-pointer"
          >
            <QrCode className="w-5 h-5 text-[#2D2A4A]" />
          </button>
        ) : (
          <QrCode className="w-5 h-5 text-[#2D2A4A] shrink-0 opacity-40" />
        )}
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
        <div className="w-full h-full relative cursor-pointer" onClick={triggerReaction}>
          {data.photos.map((photo: PhotoItem, index: number) => {
            const card = getCardStyle(index);
            return (
              <div key={photo.id} style={card.style} className="overflow-hidden">
                <img src={photo.url} alt={photo.label || "Moment"} className={card.className} />
              </div>
            );
          })}
        </div>

        {data.photos[activePhotoIdx]?.label && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 max-w-[90%] bg-neutral-950/80 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full shadow-lg text-center pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-300 flex items-center justify-center gap-1.5 whitespace-nowrap">
            <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500 animate-pulse shrink-0" />
            <span className="text-[10px] font-bold text-white tracking-wide">
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

        <div className="relative shrink-0 w-11 h-11 flex items-center justify-center cursor-pointer" onClick={(e) => { e.stopPropagation(); triggerReaction(); }}>
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
          onClick={(e) => { e.stopPropagation(); togglePlay(); triggerReaction(); }}
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

      {showQrModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center z-50 p-6 text-center animate-in fade-in duration-200">
          <div className="flex flex-col items-center p-6 bg-white rounded-3xl shadow-2xl w-full max-w-xs text-center border border-slate-100 scale-95 animate-in zoom-in-95 duration-200 relative text-[#2D2A4A]">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            <span className="text-[10px] font-black text-rose-500 tracking-wider uppercase mb-1">
              Compartilhar Amor
            </span>
            <h3 className="text-sm font-extrabold text-[#2D2A4A] mb-4">
              QR Code da Homenagem
            </h3>

            <div className="w-44 h-44 bg-white border border-slate-100 rounded-2xl flex items-center justify-center p-2.5 shadow-sm mb-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(shareUrl)}`}
                alt="QR Code"
                className="w-full h-full"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={handleCopyLink}
                className="w-full py-2.5 px-4 bg-[#FAF9FF] border border-[#E8E6F5] hover:border-slate-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer text-[#2D2A4A]"
              >
                <Copy className="w-3.5 h-3.5" />
                {copied ? "Link Copiado!" : "Copiar Link"}
              </button>
              <button
                onClick={handleDownloadQrCode}
                className="w-full py-2.5 px-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-rose-500/20 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Baixar QR Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
