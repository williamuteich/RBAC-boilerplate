"use client";

import React, { useState } from "react";
import { 
  Heart, Calendar, Music, Mail, Image as ImageIcon, 
  QrCode, Save, Trash2, Globe, Sparkles, Check
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhotoItem } from "@/src/types/love-widgets";

export function DashboardEditor() {
  const [partnerA, setPartnerA] = useState("Lucas");
  const [partnerB, setPartnerB] = useState("Gabriela");
  const [anniversary, setAnniversary] = useState("12/06/2023");
  const [theme, setTheme] = useState<"spotify" | "story">("spotify");
  
  const [songTitle, setSongTitle] = useState("Perfect");
  const [songArtist, setSongArtist] = useState("Ed Sheeran");
  const [songUrl, setSongUrl] = useState("https://open.spotify.com/track/1P52140Bq0b4d4554b732e");

  const [letterTitle, setLetterTitle] = useState("Para Minha Vida,");
  const [letterBody, setLetterBody] = useState(
    "Desde o momento em que te conheci, percebi que minha vida nunca mais seria a mesma. Cada detalhe, cada conversa e cada sorriso ao seu lado me fazem ter a certeza de que quero passar o resto dos meus dias com você."
  );

  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newItems: PhotoItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      newItems.push({
        id: `${Date.now()}-${i}`,
        url: url,
        label: file.name.split(".")[0] || `Foto ${photos.length + i + 1}`
      });
    }
    
    setPhotos((prev) => [...prev, ...newItems]);
    e.target.value = "";
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  const updatePhotoLabel = (id: string, newLabel: string) => {
    setPhotos((prev) =>
      prev.map((photo) => (photo.id === id ? { ...photo, label: newLabel } : photo))
    );
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1200);
  };

  const slugify = (strA: string, strB: string) => {
    const clean = (s: string) =>
      s
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "");
    return `${clean(strA)}-e-${clean(strB)}`;
  };

  const pageSlug = slugify(partnerA, partnerB);
  const pageUrl = `eterno.love/${pageSlug}`;

  return (
    <div className="w-full flex flex-col gap-8 pb-12 font-sans selection:bg-[#9A75F0] selection:text-white">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        <div className="xl:col-span-2 flex flex-col gap-6">
          <div className="bg-white border border-[#E8E6F5] p-6 md:p-8 rounded-[32px] shadow-[0_10px_40px_rgba(45,42,74,0.02)]">
            <h3 className="text-base font-bold text-[#2D2A4A] flex items-center gap-2 mb-6">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              1. Identidade &amp; Casal
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#696684]">
                  Seu Nome
                </label>
                <Input
                  type="text"
                  value={partnerA}
                  onChange={(e) => setPartnerA(e.target.value)}
                  className="rounded-xl border-[#E8E6F5] bg-white text-[#2D2A4A] focus-visible:ring-[#9A75F0] text-xs py-5"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#696684]">
                  Nome do Amor
                </label>
                <Input
                  type="text"
                  value={partnerB}
                  onChange={(e) => setPartnerB(e.target.value)}
                  className="rounded-xl border-[#E8E6F5] bg-white text-[#2D2A4A] focus-visible:ring-[#9A75F0] text-xs py-5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#696684]">
                  Data Especial (Início do Amor)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="text"
                    value={anniversary}
                    onChange={(e) => setAnniversary(e.target.value)}
                    placeholder="DD/MM/AAAA"
                    className="pl-10 rounded-xl border-[#E8E6F5] bg-white text-[#2D2A4A] focus-visible:ring-[#9A75F0] text-xs py-5"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#696684]">
                  Modelo de Tema
                </label>
                <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                  <button
                    type="button"
                    onClick={() => setTheme("spotify")}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      theme === "spotify"
                        ? "bg-white text-slate-800 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Estilo Spotify
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme("story")}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      theme === "story"
                        ? "bg-white text-slate-800 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Estilo Story
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E8E6F5] p-6 md:p-8 rounded-[32px] shadow-[0_10px_40px_rgba(45,42,74,0.02)]">
            <h3 className="text-base font-bold text-[#2D2A4A] flex items-center gap-2 mb-1.5">
              <ImageIcon className="w-5 h-5 text-indigo-500" />
              2. Galeria de Fotos
            </h3>
            <p className="text-xs text-[#696684] mb-6">
              Selecione fotos do seu dispositivo para ilustrar a história de vocês.
            </p>

            <div className="border-2 border-dashed border-[#E8E6F5] hover:border-[#9A75F0] rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors relative group mb-6">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <ImageIcon className="w-10 h-10 text-slate-300 group-hover:text-[#9A75F0] mb-3 transition-colors" />
              <p className="text-xs font-bold text-slate-700">Clique para selecionar do dispositivo</p>
              <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, JPEG ou WEBP (múltiplas fotos permitidas)</p>
            </div>

            {photos.length === 0 ? (
              <div className="border border-[#E8E6F5] rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                <p className="text-xs font-semibold text-slate-500">Nenhuma foto adicionada</p>
                <p className="text-[10px] text-slate-400 mt-1">
                  Selecione fotos para iniciar a construção do carrossel de recordações.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="relative group border border-[#E8E6F5] rounded-xl overflow-hidden bg-white shadow-xs">
                    <div className="aspect-video w-full bg-slate-100 relative overflow-hidden">
                      <img 
                        src={photo.url} 
                        alt={photo.label}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-3 flex flex-col gap-2">
                      <div className="flex items-center gap-1.5">
                        <Input
                          type="text"
                          value={photo.label}
                          onChange={(e) => updatePhotoLabel(photo.id, e.target.value)}
                          className="h-7 text-[10px] rounded-lg border-slate-200 px-2 py-1 text-slate-700 bg-slate-50 focus-visible:ring-[#9A75F0]"
                          placeholder="Legenda da foto"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(photo.id)}
                          className="cursor-pointer p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

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
        </div>

        <div className="xl:col-span-1 flex flex-col gap-6">
          <div className="bg-white border border-[#E8E6F5] p-6 md:p-8 rounded-[32px] shadow-[0_10px_40px_rgba(45,42,74,0.02)] flex flex-col items-center text-center">
            <h3 className="text-base font-bold text-[#2D2A4A] flex items-center gap-2 mb-4 self-start">
              <QrCode className="w-5 h-5 text-indigo-500" />
              Publicação
            </h3>
            
            <div className="w-full bg-[#FAF9FF] border border-[#E8E6F5] rounded-2xl p-6 flex flex-col items-center gap-4 mb-6">
              <div className="p-4 bg-white border border-slate-100 rounded-xl shadow-xs">
                <div className="w-36 h-36 bg-slate-50 flex items-center justify-center border border-slate-200 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[0.5px] flex items-center justify-center">
                    <QrCode className="w-28 h-28 text-slate-800" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 w-full text-left">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Globe className="w-3 h-3" /> Endereço da Página
                </span>
                <span className="text-xs font-bold text-[#2D2A4A] truncate bg-white border border-slate-100 px-3 py-2 rounded-lg select-all">
                  {pageUrl}
                </span>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-linear-to-r from-[#9A75F0] to-[#8B5CF6] hover:from-[#8b6fe3] hover:to-[#7c4ee6] text-white font-extrabold py-4 px-6 rounded-2xl cursor-pointer shadow-lg shadow-[#9A75F0]/20 flex items-center justify-center gap-2 text-xs transition-all active:scale-[0.98]"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  Salvando alterações...
                </>
              ) : saveSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  Alterações salvas!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Salvar Minha Página
                </>
              )}
            </Button>

            <div className="mt-4 text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>O link é ativado e atualizado imediatamente</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
