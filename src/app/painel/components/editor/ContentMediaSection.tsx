"use client";

import { Music, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEditor } from "./EditorContext";

export function ContentMediaSection() {
  const {
    songTitle,
    setSongTitle,
    songArtist,
    setSongArtist,
    songUrl,
    setSongUrl,
    letterTitle,
    setLetterTitle,
    letterBody,
    setLetterBody,
  } = useEditor();

  return (
    <div className="bg-white border border-[#E8E6F5] p-6 md:p-8 rounded-[32px] shadow-[0_10px_40px_rgba(45,42,74,0.02)]">
      <h3 className="text-base font-bold text-[#2D2A4A] flex items-center gap-2 mb-6">
        <Music className="w-5 h-5 text-indigo-500" />
        3. Conteúdo &amp; Mídias
      </h3>

      <div className="flex flex-col gap-6">
        <div className="border-b border-[#E8E6F5] pb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#696684] mb-3">Música Tema</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-slate-500">Nome da Música</label>
              <Input
                type="text"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                className="rounded-xl border-[#E8E6F5] bg-white text-[#2D2A4A] focus-visible:ring-[#9A75F0] text-xs py-4"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-slate-500">Artista</label>
              <Input
                type="text"
                value={songArtist}
                onChange={(e) => setSongArtist(e.target.value)}
                className="rounded-xl border-[#E8E6F5] bg-white text-[#2D2A4A] focus-visible:ring-[#9A75F0] text-xs py-4"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mt-4">
            <label className="text-[10px] text-slate-500">Link da Playlist/Música no Spotify</label>
            <Input
              type="text"
              value={songUrl}
              onChange={(e) => setSongUrl(e.target.value)}
              className="rounded-xl border-[#E8E6F5] bg-white text-[#2D2A4A] focus-visible:ring-[#9A75F0] text-xs py-4"
            />
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#696684] mb-3 flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-rose-400" />
            Carta de Amor
          </h4>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-slate-500">Título da Carta</label>
              <Input
                type="text"
                value={letterTitle}
                onChange={(e) => setLetterTitle(e.target.value)}
                className="rounded-xl border-[#E8E6F5] bg-white text-[#2D2A4A] focus-visible:ring-[#9A75F0] text-xs py-4"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-slate-500">Texto Principal da Carta</label>
              <textarea
                rows={5}
                value={letterBody}
                onChange={(e) => setLetterBody(e.target.value)}
                className="w-full p-4 rounded-2xl border border-[#E8E6F5] bg-white text-[#2D2A4A] focus:outline-none focus:ring-1 focus:ring-[#9A75F0] focus:border-[#9A75F0] text-xs leading-relaxed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
