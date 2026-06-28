"use client";

import { useState, useEffect, useRef, useMemo } from "react";

export function useTributeAudio(songUrl: string, photosCount: number, isPublic: boolean, theme: "spotify" | "story") {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isStoryPaused, setIsStoryPaused] = useState(false);
  const playerRef = useRef<any>(null);

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(songUrl);

  useEffect(() => {
    if (!isPublic) return;
    if (theme === "story" && isStoryPaused) return;

    const interval = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % photosCount);
    }, 7000);

    return () => clearInterval(interval);
  }, [photosCount, isPublic, isStoryPaused, theme]);

  useEffect(() => {
    if (!isPublic || !videoId) return;

    const win = window as any;
    let checkInterval: NodeJS.Timeout;

    function createPlayer() {
      const iframeEl = document.getElementById("youtube-player");
      if (!iframeEl) return false;
      if (!win.YT || !win.YT.Player) return false;

      try {
        new win.YT.Player("youtube-player", {
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1
          },
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
              
              win.playTributeAudio = () => {
                try {
                  event.target.playVideo();
                  setIsPlaying(true);
                } catch (e) {
                  console.error("Error playing tribute audio:", e);
                }
              };

              if (win.shouldAutoPlay) {
                try {
                  event.target.playVideo();
                  setIsPlaying(true);
                } catch (e) {}
              } else {
                setIsPlaying(false);
              }
            }
          }
        });
        return true;
      } catch (err) {
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
  }, [videoId, isPublic]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    try {
      if (isPlaying) {
        if (typeof player.playVideo === "function") player.playVideo();
      } else {
        if (typeof player.pauseVideo === "function") player.pauseVideo();
      }
    } catch (err) {}
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
    } catch (err) {}
  }, [isMuted]);

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
          } catch (e) {}
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player) {
      setIsPlaying(!isPlaying);
      return;
    }
    try {
      if (isPlaying) {
        player.pauseVideo();
        setIsPlaying(false);
      } else {
        player.playVideo();
        setIsPlaying(true);
      }
    } catch (err) {
      setIsPlaying(!isPlaying);
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
        player.unMute();
        setIsMuted(false);
      } else {
        player.mute();
        setIsMuted(true);
      }
    } catch (err) {
      setIsMuted(!isMuted);
    }
  };

  return {
    isPlaying,
    isMuted,
    activePhotoIdx,
    setActivePhotoIdx,
    currentTime,
    duration,
    isStoryPaused,
    setIsStoryPaused,
    togglePlay,
    toggleMute,
    videoId,
  };
}

export function useTributeReactions(isPublic: boolean) {
  const [reactions, setReactions] = useState<{ id: number; left: number; delay: number }[]>([]);

  const triggerReaction = () => {
    if (!isPublic) return;
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
        }, 4000);
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

  return { reactions, triggerReaction };
}

export function useTributeSharing() {
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

  return {
    showQrModal,
    setShowQrModal,
    copied,
    shareUrl,
    handleCopyLink,
    handleDownloadQrCode,
    toggleQrCode,
  };
}
