"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, ChevronDown, SkipBack, SkipForward, Shuffle, Repeat, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { CalendarWidget } from "@/src/app/components/CalendarWidget";
import { LoveLetterWidget } from "@/src/app/components/LoveLetterWidget";
import { PhotoItem } from "@/src/types/love-widgets";

export function PublicTributeRenderer({
  data
}: {
  data: {
    partnerA: string;
    partnerB: string;
    anniversary: string;
    theme: "spotify" | "story";
    songTitle: string;
    songArtist: string;
    songUrl: string;
    letterTitle: string;
    letterLines: string[];
    photos: PhotoItem[];
  }
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [storyProgress, setStoryProgress] = useState(0);
  const [isStoryPaused, setIsStoryPaused] = useState(false);

  const playerRef = useRef<any>(null);
  const userInteractedRef = useRef(false);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === null) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(data.songUrl);

  useEffect(() => {
    if (data.theme !== "spotify") return;
    const interval = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % data.photos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [data.theme, data.photos.length]);

  useEffect(() => {
    if (!unlocked || data.theme !== "story" || isStoryPaused) return;

    const interval = setInterval(() => {
      setStoryProgress((prev) => {
        if (prev >= 100) {
          setActivePhotoIdx((idx) => (idx + 1) % data.photos.length);
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [unlocked, isStoryPaused, data.theme, data.photos.length]);

  useEffect(() => {
    if (!videoId) return;

    const win = window as any;
    let checkInterval: NodeJS.Timeout;

    function createPlayer() {
      const iframeEl = document.getElementById("youtube-player");
      if (!iframeEl) return false;
      if (!win.YT || !win.YT.Player) return false;

      try {
        new win.YT.Player("youtube-player", {
          events: {
            onStateChange: (event: any) => {
              if (event.data === 1) {
                setIsPlaying(true);
              } else if (event.data === 2 || event.data === 0) {
                setIsPlaying(false);
              }
            },
            onReady: (event: any) => {
              playerRef.current = event.target;

              if (isMuted) {
                event.target.mute();
              } else {
                event.target.unMute();
              }

              if (userInteractedRef.current) {
                event.target.playVideo();
              }
            }
          }
        });
        return true;
      } catch (err) {
        console.error("Erro ao inicializar o player do YT:", err);
        return false;
      }
    }

    const tryInit = () => {
      if (playerRef.current) return;
      if (createPlayer()) {
        clearInterval(checkInterval);
      }
    };

    const previousAPIReady = win.onYouTubeIframeAPIReady;
    win.onYouTubeIframeAPIReady = () => {
      if (previousAPIReady) previousAPIReady();
      tryInit();
    };

    if (!win.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    checkInterval = setInterval(tryInit, 100);

    return () => {
      clearInterval(checkInterval);
    };
  }, [videoId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        const player = playerRef.current;
        if (player) {
          try {
            if (typeof player.getCurrentTime === "function") {
              setCurrentTime(player.getCurrentTime());
            }
            if (typeof player.getDuration === "function") {
              setDuration(player.getDuration());
            }
          } catch (e) {
            console.error("Erro ao ler tempo/duração do player do YT:", e);
          }
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    try {
      if (isPlaying) {
        if (typeof player.playVideo === "function") player.playVideo();
      } else {
        if (typeof player.pauseVideo === "function") player.pauseVideo();
      }
    } catch (err) {
      console.error("Erro ao atualizar estado de reprodução (play/pause) no player:", err);
    }
  }, [isPlaying]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    try {
      if (isMuted) {
        if (typeof player.mute === "function") player.mute();
      } else {
        if (typeof player.unMute === "function") player.unMute();
      }
    } catch (err) {
      console.error("Erro ao atualizar estado de mute no player:", err);
    }
  }, [isMuted]);

  const handleUnlock = () => {
    setUnlocked(true);
    setIsPlaying(true);
    userInteractedRef.current = true;

    // Tenta dar play na hora em resposta direta ao clique (gesto síncrono do usuário)
    const player = playerRef.current;
    if (player && typeof player.playVideo === "function") {
      try {
        if (isMuted) {
          player.mute();
        } else {
          player.unMute();
        }
        player.playVideo();
      } catch (err) {
        console.error("Erro no play imediato ao desbloquear:", err);
      }
    }
  };

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player) {
      setIsPlaying(!isPlaying);
      return;
    }
    try {
      if (isPlaying) {
        if (typeof player.pauseVideo === "function") player.pauseVideo();
        setIsPlaying(false);
      } else {
        if (typeof player.playVideo === "function") player.playVideo();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Erro ao alternar reprodução:", err);
    }
  };

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) {
      setIsMuted(!isMuted);
      return;
    }
    try {
      if (isMuted) {
        if (typeof player.unMute === "function") player.unMute();
        setIsMuted(false);
      } else {
        if (typeof player.mute === "function") player.mute();
        setIsMuted(true);
      }
    } catch (err) {
      console.error("Erro ao alternar mute:", err);
    }
  };

  const triggerPlayFallback = () => {
    const player = playerRef.current;
    if (player && typeof player.playVideo === "function") {
      const state = typeof player.getPlayerState === "function" ? player.getPlayerState() : -1;
      if (state !== 1) { // se não estiver tocando (1 = PLAYING)
        try {
          if (isMuted) {
            player.mute();
          } else {
            player.unMute();
          }
          player.playVideo();
          setIsPlaying(true);
        } catch (err) {
          console.error("Erro no play fallback:", err);
        }
      }
    }
  };

  useEffect(() => {
    if (!unlocked || !videoId) return;

    const handleFallbackPlay = () => {
      triggerPlayFallback();
    };

    window.addEventListener("click", handleFallbackPlay, { passive: true });
    window.addEventListener("touchstart", handleFallbackPlay, { passive: true });

    return () => {
      window.removeEventListener("click", handleFallbackPlay);
      window.removeEventListener("touchstart", handleFallbackPlay);
    };
  }, [unlocked, videoId, isMuted]);

  const handlePrevStory = () => {
    triggerPlayFallback();
    setStoryProgress(0);
    setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : data.photos.length - 1));
  };

  const handleNextStory = () => {
    triggerPlayFallback();
    setStoryProgress(0);
    setActivePhotoIdx((prev) => (prev + 1) % data.photos.length);
  };

  const handleStoryTouchStart = () => setIsStoryPaused(true);
  const handleStoryTouchEnd = () => setIsStoryPaused(false);
  const handleStoryMouseDown = () => setIsStoryPaused(true);
  const handleStoryMouseUp = () => setIsStoryPaused(false);
  const handleStoryMouseLeave = () => setIsStoryPaused(false);

  return (
    <div className="min-h-screen w-full flex justify-center items-start font-sans relative overflow-x-hidden select-none bg-[#FAF9FF]">

      <div className={`fixed inset-0 bg-[#0F0D19]/95 backdrop-blur-md flex flex-col items-center justify-center z-50 p-6 text-center transition-all duration-1000 ease-in-out ${unlocked ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <div className="max-w-xs flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-rose-500/20 rounded-full animate-ping scale-150"></div>
            <div className="w-20 h-20 rounded-full bg-linear-to-tr from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-xl shadow-rose-500/30 relative">
              <Heart className="w-10 h-10 fill-current animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">Uma Surpresa Especial</h1>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Você recebeu uma homenagem de amor especial de <span className="text-rose-400 font-bold">{data.partnerA}</span>.
            </p>
          </div>
          <button
            onClick={handleUnlock}
            className="cursor-pointer w-full bg-linear-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black py-4 px-6 rounded-2xl shadow-lg shadow-rose-500/20 text-xs tracking-wider uppercase transition-all active:scale-[0.98]"
          >
            Abrir Homenagem
          </button>
        </div>
      </div>

      {videoId && (
        <iframe
          id="youtube-player"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&modestbranding=1&playsinline=1&playlist=${videoId}&loop=1`}
          className="w-0 h-0 opacity-0 pointer-events-none absolute"
          allow="autoplay; encrypted-media"
        />
      )}

      <div className="w-full max-w-md min-h-screen z-10 flex flex-col">
        {data.theme === "spotify" ? (
          <div className="w-full min-h-screen bg-[#FAF9FF] text-[#2D2A4A] relative flex flex-col px-4 pt-4 pb-12 gap-5 animate-in fade-in duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(244,63,94,0.04),transparent_50%)] pointer-events-none"></div>

            <div className="w-full flex items-center justify-between text-[#2D2A4A] z-10 mt-1">
              <ChevronDown className="w-5 h-5 text-[#2D2A4A] shrink-0" />
              <span className="font-extrabold text-[10px] text-center tracking-tight text-rose-600 truncate max-w-[200px] uppercase">
                {data.partnerA} &amp; {data.partnerB}
              </span>
              <button
                onClick={toggleMute}
                className="p-1 hover:bg-slate-100 rounded-lg text-[#2D2A4A] shrink-0 transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            <div className="w-full aspect-square max-h-[360px] relative overflow-hidden bg-neutral-950 rounded-2xl border border-rose-100/10 shadow-md z-10 flex items-center justify-center">
              {data.photos.map((photo, index) => {
                const isActive = index === activePhotoIdx;
                return (
                  <img
                    key={photo.id}
                    src={photo.url}
                    alt={photo.label}
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-95"
                      }`}
                  />
                );
              })}
              <div className="absolute bottom-4 left-4 z-20 bg-white/15 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105">
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse shrink-0" />
                <span className="text-[10px] font-bold text-white tracking-wide">
                  {data.photos[activePhotoIdx]?.label || "Nossos Momentos"}
                </span>
              </div>
            </div>

            <div className="w-full flex items-center justify-between mt-1 z-10 px-0.5">
              <div className="min-w-0 pr-4">
                <h4 className="text-base font-black tracking-tight text-[#2D2A4A] truncate">
                  {data.songTitle}
                </h4>
                <p className="text-xs font-bold text-rose-600 mt-0.5 truncate">
                  {data.songArtist} • Tema de {data.partnerA} &amp; {data.partnerB}
                </p>
              </div>
              <Heart className={`w-5 h-5 text-rose-500 fill-rose-500 shrink-0 ${isPlaying ? "animate-pulse" : ""}`} />
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
                onClick={togglePlay}
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
        ) : (
          <div className="w-full min-h-screen bg-[#121212] text-white flex flex-col px-4 pt-4 pb-12 gap-4 relative animate-in fade-in duration-500">
            <div className="w-full flex gap-1 z-30 px-1">
              {data.photos.map((_, index) => {
                const isCompleted = index < activePhotoIdx;
                const isActive = index === activePhotoIdx;
                return (
                  <div key={index} className="flex-1 h-[2px] bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-75"
                      style={{
                        width: isCompleted ? "100%" : isActive ? `${storyProgress}%` : "0%"
                      }}
                    />
                  </div>
                );
              })}
            </div>

            <div className="w-full flex justify-between items-center mt-1 z-30 px-1">
              <div className="flex flex-col">
                <h3 className="text-base font-black tracking-tight text-white uppercase">
                  {data.partnerA} &amp; {data.partnerB}
                </h3>
                <span className="text-[9px] text-white/50 font-bold uppercase tracking-wider mt-0.5">
                  Nossa História
                </span>
              </div>
              <button
                onClick={toggleMute}
                className="p-1 hover:bg-white/10 rounded-full text-white transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            <div className="w-full aspect-4/5 max-h-[400px] relative overflow-hidden bg-neutral-950 rounded-2xl border border-white/5 my-1 z-10 flex items-center justify-center">
              {data.photos.map((photo, index) => {
                const isActive = index === activePhotoIdx;
                return (
                  <img
                    key={photo.id}
                    src={photo.url}
                    alt={photo.label || "Story content"}
                    className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-in-out ${isActive ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-95"
                      }`}
                  />
                );
              })}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none z-15"></div>

              {data.photos[activePhotoIdx]?.label && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-25 w-[85%] bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl shadow-xl text-center pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-300">
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

            <div className="bg-white/10 border border-white/15 p-2.5 rounded-2xl flex items-center justify-between gap-2.5 z-10 shadow-lg text-white">
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
                  <span className="text-[10px] text-white/70 truncate mt-0.5">{data.songArtist} • Tema do Casal</span>
                </div>
              </div>
              <button
                onClick={togglePlay}
                className="cursor-pointer w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border border-white/15 shrink-0 transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-white fill-current" /> : <Play className="w-3.5 h-3.5 text-white fill-current translate-x-0.5" />}
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
        )}
      </div>
    </div>
  );
}
