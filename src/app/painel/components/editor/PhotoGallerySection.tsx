"use client";

import { Image as ImageIcon, Trash2 } from "lucide-react";
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
        <ImageIcon className="w-5 h-5 text-indigo-500" />
        Galeria de Fotos
      </h3>
      <p className="text-xs text-[#696684] mb-6">
        Selecione fotos do seu dispositivo para ilustrar a história de vocês.
      </p>

      <div className={`border-2 border-dashed border-[#E8E6F5] hover:border-[#9A75F0] rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors relative group mb-6 ${photos.length >= 12 ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}`}>
        <input
          type="file"
          accept="image/*"
          multiple
          disabled={photos.length >= 12}
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        <ImageIcon className="w-10 h-10 text-slate-300 group-hover:text-[#9A75F0] mb-3 transition-colors" />
        <p className="text-xs font-bold text-slate-700">
          {photos.length >= 12 ? "Limite de 12 fotos atingido" : "Clique para selecionar do dispositivo"}
        </p>
        <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, JPEG ou WEBP (Máximo de 12 fotos)</p>
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
  );
}
