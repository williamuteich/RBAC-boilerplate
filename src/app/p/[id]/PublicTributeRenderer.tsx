"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Heart } from "lucide-react";
import { PhotoItem } from "@/src/types/love-widgets";

const SpotifyTemplate = dynamic(() => import("./components/spotify/SpotifyTemplate"), { ssr: false });
const StoryTemplate = dynamic(() => import("./components/story/StoryTemplate"), { ssr: false });

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

  if (!unlocked) {
    return (
      <div className="min-h-screen w-full bg-[#0F0D19]/95 flex flex-col items-center justify-center p-6 text-center select-none font-sans">
        <style jsx global>{`
          @keyframes soft-ping {
            0% { transform: scale(1); opacity: 0.6; }
            100% { transform: scale(1.8); opacity: 0; }
          }
          @keyframes soft-pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.08); opacity: 0.85; }
          }
          .animate-soft-ping {
            animation: soft-ping 2.2s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
          .animate-soft-pulse {
            animation: soft-pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}</style>
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
            onClick={() => setUnlocked(true)}
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
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-start font-sans relative overflow-x-hidden select-none bg-[#FAF9FF]">
      <div className="w-full max-w-md min-h-screen z-10 flex flex-col">
        {data.theme === "spotify" ? (
          <SpotifyTemplate data={data} isPublic={true} />
        ) : (
          <StoryTemplate data={data} isPublic={true} />
        )}
      </div>
    </div>
  );
}
