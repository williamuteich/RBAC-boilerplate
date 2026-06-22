"use client";

import { QrCode, Globe, Sparkles, Check, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditor } from "./EditorContext";

export function PublishSection() {
  const {
    pageUrl,
    isSaving,
    saveSuccess,
    handleSave,
  } = useEditor();

  return (
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
  );
}
