"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { Heart, Copy, X, QrCode, Download } from "lucide-react";
import { PhotoItem } from "@/src/types/love-widgets";

const SpotifyTemplate = dynamic(() => import("./components/SpotifyTemplate"), { ssr: false });
const StoryTemplate = dynamic(() => import("./components/StoryTemplate"), { ssr: false });

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
  const [origin, setOrigin] = useState("");
  const [showQrModal, setShowQrModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQrCode = async () => {
    try {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(shareUrl)}`;
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "homenagem-qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      window.open(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(shareUrl)}`, "_blank");
    }
  };

  const toggleQrCode = () => {
    setShowQrModal((prev) => !prev);
  };

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [storyProgress, setStoryProgress] = useState(0);
  const [isStoryPaused, setIsStoryPaused] = useState(false);
  const [reactions, setReactions] = useState<{ id: number; left: number; delay: number }[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const triggerReaction = () => {
    let count = 0;
    const maxRepetitions = 15;

    const generateWave = () => {
      const waveItems = Array.from({ length: 3 }).map((_, i) => {
        const id = Date.now() + Math.random() + i;
        const left = 10 + Math.random() * 80;
        const delay = Math.random() * 0.1;
        return { id, left, delay };
      });

      setReactions((prev) => [...prev, ...waveItems]);

      waveItems.forEach((item) => {
        setTimeout(() => {
          setReactions((prev) => prev.filter((r) => r.id !== item.id));
        }, 2000);
      });
    };

    generateWave();

    const interval = setInterval(() => {
      generateWave();
      count++;
      if (count >= maxRepetitions) {
        clearInterval(interval);
      }
    }, 120);
  };

  const playerRef = useRef<any>(null);
  const userInteractedRef = useRef(false);

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
    const baseStyle = {
      position: "absolute" as const,
      inset: 0,
      width: "100%",
      height: "100%",
      border: data.theme === "story" ? "5px solid #232035" : "6px solid white",
      boxShadow: "0 12px 32px rgba(0, 0, 0, 0.22)",
      backgroundColor: data.theme === "story" ? "#232035" : "#ffffff",
      borderRadius: "16px",
      transition: "opacity 0.8s ease-in-out",
      opacity: isActive ? 1 : 0,
      zIndex: isActive ? 10 : 0,
      pointerEvents: isActive ? ("auto" as const) : ("none" as const),
    };

    return {
      style: baseStyle,
      className: `absolute inset-0 w-full h-full object-cover ${isActive ? "animate-ken-burns" : ""}`
    };
  };

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
    }, 7000);
    return () => clearInterval(interval);
  }, [data.theme, data.photos.length, activePhotoIdx]);

  useEffect(() => {
    if (!unlocked || data.theme !== "story" || isStoryPaused) return;

    const timer = setTimeout(() => {
      setActivePhotoIdx((prev) => (prev + 1) % data.photos.length);
    }, 7000);

    return () => clearTimeout(timer);
  }, [unlocked, isStoryPaused, data.theme, data.photos.length, activePhotoIdx]);

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
      if (state !== 1) {
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
    triggerReaction();
  };

  const handleNextStory = () => {
    triggerPlayFallback();
    setStoryProgress(0);
    setActivePhotoIdx((prev) => (prev + 1) % data.photos.length);
    triggerReaction();
  };

  const handleStoryTouchStart = () => setIsStoryPaused(true);
  const handleStoryTouchEnd = () => setIsStoryPaused(false);
  const handleStoryMouseDown = () => setIsStoryPaused(true);
  const handleStoryMouseUp = () => setIsStoryPaused(false);
  const handleStoryMouseLeave = () => setIsStoryPaused(false);

  return (
    <div className="min-h-screen w-full flex justify-center items-start font-sans relative overflow-x-hidden select-none bg-[#FAF9FF]">
      <style>{`
        @keyframes float-heart {
          0% {
            transform: translateY(105vh) scale(0.5) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.25;
          }
          85% {
            opacity: 0.25;
          }
          100% {
            transform: translateY(-15vh) scale(1.2) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes reaction-float {
          0% {
            transform: translateY(0) scale(0.5) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(-5vh) scale(1.2) rotate(-15deg);
          }
          100% {
            transform: translateY(-105vh) scale(0.8) rotate(45deg);
            opacity: 0;
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes page-turn {
          0% {
            transform: rotateY(-90deg) scale(0.95);
            opacity: 0;
          }
          100% {
            transform: rotateY(0deg) scale(1);
            opacity: 1;
          }
        }
        @keyframes pop-in {
          0% {
            transform: scale(0.8) rotate(-4deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.03) rotate(2deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        @keyframes soft-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.85;
          }
        }
        @keyframes soft-ping {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
        .animate-float-heart {
          animation: float-heart 12s linear infinite;
        }
        .animate-reaction {
          animation: reaction-float 2s cubic-bezier(0.08, 0.82, 0.17, 1) forwards;
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        .animate-page-turn {
          animation: page-turn 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          transform-origin: left center;
          perspective: 1000px;
        }
        .animate-pop-in {
          animation: pop-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-soft-pulse {
          animation: soft-pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-soft-ping {
          animation: soft-ping 2.2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes story-progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .animate-story-progress {
          animation: story-progress 7s linear forwards;
        }
        .animation-paused {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className={`fixed inset-0 bg-[#0F0D19]/95 backdrop-blur-md flex flex-col items-center justify-center z-50 p-6 text-center transition-all duration-1000 ease-in-out ${unlocked ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <div className="max-w-xs flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-rose-500/20 rounded-full animate-soft-ping"></div>
            <div className="w-20 h-20 rounded-full bg-linear-to-tr from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-xl shadow-rose-500/30 relative">
              <Heart className="w-10 h-10 fill-current animate-soft-pulse" />
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
            className="group cursor-pointer relative w-full overflow-hidden rounded-2xl bg-linear-to-r from-rose-500 via-pink-500 to-rose-600 p-[3px] shadow-lg shadow-rose-500/30 transition-all active:scale-[0.97]"
          >
            <div className="absolute inset-0 bg-linear-to-r from-rose-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></div>
            <div className="relative flex items-center justify-center gap-2 rounded-[13px] bg-[#0F0D19] py-3.5 px-6 font-black text-white transition-colors group-hover:bg-[#0f0d19]/90 text-xs tracking-wider uppercase">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500 group-hover:scale-125 transition-transform animate-soft-pulse" />
              <span>Abrir Homenagem</span>
            </div>
          </button>
        </div>
      </div>

      {videoId && (
        <iframe
          id="youtube-player"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&modestbranding=1&playsinline=1&playlist=${videoId}&loop=1${origin ? `&origin=${origin}` : ""}`}
          className="w-0 h-0 opacity-0 pointer-events-none absolute"
          allow="autoplay; encrypted-media"
        />
      )}

      <div className="w-full max-w-md min-h-screen z-10 flex flex-col">
        {data.theme === "spotify" ? (
          <SpotifyTemplate
            data={data}
            isPlaying={isPlaying}
            isMuted={isMuted}
            activePhotoIdx={activePhotoIdx}
            currentTime={currentTime}
            duration={duration}
            togglePlay={togglePlay}
            toggleMute={toggleMute}
            formatTime={formatTime}
            getCardStyle={getCardStyle}
            backgroundHearts={backgroundHearts}
            reactions={reactions}
            triggerReaction={triggerReaction}
            storyProgress={storyProgress}
            handlePrevStory={handlePrevStory}
            handleNextStory={handleNextStory}
            handleStoryTouchStart={handleStoryTouchStart}
            handleStoryTouchEnd={handleStoryTouchEnd}
            handleStoryMouseDown={handleStoryMouseDown}
            handleStoryMouseUp={handleStoryMouseUp}
            handleStoryMouseLeave={handleStoryMouseLeave}
            isStoryPaused={isStoryPaused}
            toggleQrCode={toggleQrCode}
          />
        ) : (
          <StoryTemplate
            data={data}
            isPlaying={isPlaying}
            isMuted={isMuted}
            activePhotoIdx={activePhotoIdx}
            currentTime={currentTime}
            duration={duration}
            togglePlay={togglePlay}
            toggleMute={toggleMute}
            formatTime={formatTime}
            getCardStyle={getCardStyle}
            backgroundHearts={backgroundHearts}
            reactions={reactions}
            triggerReaction={triggerReaction}
            storyProgress={storyProgress}
            handlePrevStory={handlePrevStory}
            handleNextStory={handleNextStory}
            handleStoryTouchStart={handleStoryTouchStart}
            handleStoryTouchEnd={handleStoryTouchEnd}
            handleStoryMouseDown={handleStoryMouseDown}
            handleStoryMouseUp={handleStoryMouseUp}
            handleStoryMouseLeave={handleStoryMouseLeave}
            isStoryPaused={isStoryPaused}
            toggleQrCode={toggleQrCode}
          />
        )}
      </div>

      {showQrModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center z-50 p-6 text-center animate-in fade-in duration-200">
          <div className="flex flex-col items-center p-6 bg-white rounded-3xl shadow-2xl w-full max-w-xs text-center border border-slate-100 scale-95 animate-in zoom-in-95 duration-200 relative">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h4 className="font-extrabold text-[#2D2A4A] text-sm mb-4">Compartilhar Homenagem</h4>

            <div className="w-32 h-32 bg-white border border-[#E8E6F5] rounded-xl flex items-center justify-center p-1 relative overflow-hidden shadow-xs mb-2">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareUrl)}`}
                alt="QR Code"
                className="w-full h-full object-contain rounded-lg select-none"
              />
            </div>

            <button
              type="button"
              onClick={handleDownloadQrCode}
              className="cursor-pointer flex items-center justify-center gap-1 text-[10px] font-bold text-[#9A75F0] hover:text-[#8B5CF6] transition-colors mb-4"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar QR Code</span>
            </button>

            <div className="flex items-center gap-1.5 bg-[#FAF9FF] border border-[#E8E6F5] p-1.5 rounded-xl w-full mb-4">
              <input
                type="text"
                readOnly
                value={shareUrl}
                onClick={(e) => (e.target as HTMLInputElement).select()}
                className="text-[10px] font-bold text-[#2D2A4A] bg-transparent outline-hidden px-1 py-0.5 flex-1 truncate select-all"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="cursor-pointer p-1.5 hover:bg-white rounded-lg border border-transparent hover:border-[#E8E6F5] text-slate-500 hover:text-[#9A75F0] transition-all flex items-center justify-center"
              >
                {copied ? <span className="text-[9px] font-bold text-emerald-600">Copiado</span> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="cursor-pointer w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-10 text-xs rounded-xl"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
