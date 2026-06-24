"use client";

import { Image as ImageIcon, Trash2, UploadCloud } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEditor } from "./EditorContext";

export function PhotoGallerySection() {
  const {
    photos,
    handleFileChange,
    updatePhotoLabel,
    removePhoto,
  } = useEditor();

  return (
    <div className="bg-white border border-[#E8E6F5] p-6 md:p-8 rounded-[32px] shadow-[0_10px_40px_rgba(45,42,74,0.02)]">
      <h3 className="text-base font-bold text-[#2D2A4A] flex items-center gap-2 mb-1.5">
        <ImageIcon className="w-5 h-5 text-[#9A75F0]" />
        Galeria de Fotos
      </h3>
      <p className="text-xs text-[#696684] mb-6">
        Selecione as melhores fotos do seu dispositivo para ilustrar a história de vocês.
      </p>

      <div className={`border-2 border-dashed border-[#E8E6F5] hover:border-[#9A75F0] rounded-[24px] p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 bg-slate-50/50 hover:bg-[#9A75F0]/5 group relative mb-6 ${
        photos.length >= 12 ? "opacity-50 pointer-events-none cursor-not-allowed" : ""
      }`}>
        <input
          type="file"
          accept="image/*"
          multiple
          disabled={photos.length >= 12}
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8E6F5] flex items-center justify-center text-slate-400 group-hover:text-[#9A75F0] group-hover:border-[#9A75F0] group-hover:scale-110 shadow-xs transition-all duration-300 mb-3">
          <UploadCloud className="w-6 h-6" />
        </div>
        <p className="text-xs font-black text-[#2D2A4A]">
          {photos.length >= 12 ? "Limite de 12 fotos atingido" : "Clique para selecionar do seu dispositivo"}
        </p>
        <p className="text-[10px] text-[#696684] mt-1 font-medium">PNG, JPG, JPEG ou WEBP (Máximo de 12 fotos)</p>

        <div className="w-full flex items-center justify-between mt-6 pt-4 border-t border-[#E8E6F5]/50 gap-4">
          <div className="flex gap-1 flex-1 max-w-[240px] h-1.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-full rounded-full transition-all duration-300 ${
                  i < photos.length ? "bg-[#9A75F0]" : "bg-slate-100"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-extrabold text-[#696684] shrink-0">
            {photos.length} / 12 Fotos
          </span>
        </div>
      </div>

      {photos.length === 0 ? (
        <div className="border border-[#E8E6F5] border-dashed rounded-[24px] p-10 flex flex-col items-center justify-center text-center bg-slate-50/30">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3">
            <ImageIcon className="w-5 h-5 text-slate-400" />
          </div>
          <p className="text-xs font-extrabold text-[#2D2A4A]">Nenhuma foto adicionada ainda</p>
          <p className="text-[10px] text-[#696684] mt-1.5 max-w-[240px]">
            Selecione fotos acima para iniciar a construção da sua galeria de memórias.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group border border-[#E8E6F5] rounded-[20px] overflow-hidden bg-white shadow-xs hover:scale-[1.02] hover:shadow-md transition-all duration-300">
              <div className="aspect-square w-full bg-slate-50 relative overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.label}
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(photo.id)}
                  className="cursor-pointer p-2 rounded-full bg-black/60 hover:bg-red-500 text-white backdrop-blur-xs transition-all absolute top-2.5 right-2.5 shadow-md flex items-center justify-center"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-3">
                <Input
                  type="text"
                  value={photo.label}
                  onChange={(e) => updatePhotoLabel(photo.id, e.target.value)}
                  className="h-8 text-[11px] font-semibold rounded-xl border-[#E8E6F5] px-3 py-1.5 text-[#2D2A4A] bg-slate-50 focus-visible:ring-[#9A75F0] focus-visible:bg-white transition-all placeholder:text-[#8C89A0]"
                  placeholder="Legenda da foto..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
