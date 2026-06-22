"use client";

import { QrCode, Globe, Sparkles, Check, Save, Copy, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditor } from "./EditorContext";
import { useState } from "react";

export function PublishSection() {
  const {
    tributeId,
    pageUrl,
    isSaving,
    saveSuccess,
    setSaveSuccess,
    errorMessage,
    setErrorMessage,
    handleSave,
  } = useEditor();

  const [copied, setCopied] = useState(false);

  const absoluteUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/p/${tributeId}` 
    : `https://glamourlindoia.com.br/p/${tributeId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(absoluteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-[#E8E6F5] p-6 md:p-8 rounded-[32px] shadow-[0_10px_40px_rgba(45,42,74,0.02)] flex flex-col items-center text-center">
      
      {isSaving && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex flex-col items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-3xl shadow-2xl max-w-xs text-center border border-slate-100">
            <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100">
              <div className="w-8 h-8 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
            </div>
            <div>
              <h4 className="font-extrabold text-[#2D2A4A] text-sm">Salvando Homenagem</h4>
              <p className="text-[10px] text-slate-400 mt-1">Gravando suas alterações com segurança no servidor...</p>
            </div>
          </div>
        </div>
      )}

      {saveSuccess && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex flex-col items-center justify-center z-50 animate-in fade-in duration-200 px-4">
          <div className="flex flex-col items-center p-8 bg-white rounded-[32px] shadow-2xl w-full max-w-md text-center border border-slate-100 scale-95 animate-in zoom-in-95 duration-200 relative">
            <button 
              onClick={() => setSaveSuccess(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 mb-4">
              <Check className="w-8 h-8 text-emerald-600 animate-bounce" />
            </div>

            <h4 className="font-extrabold text-[#2D2A4A] text-lg">Salvo com Sucesso!</h4>
            <p className="text-xs text-slate-400 mt-1.5 mb-6">
              Sua homenagem eterna foi salva. Veja abaixo como você pode utilizá-la agora:
            </p>

            <div className="w-full space-y-4 text-left mb-6">
              <div className="p-4 bg-[#FAF9FF] border border-[#E8E6F5] rounded-2xl flex flex-col gap-2">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Globe className="w-3 h-3 text-indigo-500" /> Link de Acesso Permanente
                </span>
                <div className="flex items-center justify-between gap-2 bg-white border border-slate-100 px-3 py-2 rounded-xl">
                  <span className="text-xs font-bold text-[#2D2A4A] truncate select-all flex-1">
                    {absoluteUrl}
                  </span>
                  <button 
                    onClick={handleCopyLink}
                    className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer shrink-0"
                    title="Copiar Link"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 shrink-0">
                    1
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#2D2A4A]">Veja como ficou</h5>
                    <p className="text-[10px] text-slate-400">Abra a página em tempo real para visualizar o design final.</p>
                    <a 
                      href={`/p/${tributeId}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-indigo-600 hover:text-indigo-700 mt-1.5 transition-colors"
                    >
                      Visualizar Homenagem <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              onClick={() => setSaveSuccess(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-11 text-xs rounded-xl cursor-pointer"
            >
              Voltar ao Editor
            </Button>
          </div>
        </div>
      )}

      {errorMessage && !isSaving && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex flex-col items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-3xl shadow-2xl max-w-xs text-center border border-slate-100 scale-95 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100">
              <span className="text-2xl font-bold text-rose-600">!</span>
            </div>
            <div>
              <h4 className="font-extrabold text-[#2D2A4A] text-sm">Falha ao Salvar</h4>
              <p className="text-[10px] text-rose-500 mt-1">{errorMessage}</p>
            </div>
            <Button 
              onClick={() => setErrorMessage("")}
              className="mt-2 w-full bg-slate-800 hover:bg-slate-900 text-white text-xs h-9 rounded-xl cursor-pointer font-bold"
            >
              Fechar
            </Button>
          </div>
        </div>
      )}

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
        <Save className="w-4 h-4" />
        Salvar Minha Página
      </Button>

      <div className="mt-4 text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-rose-400" />
        <span>O link é ativado e atualizado imediatamente</span>
      </div>
    </div>
  );
}
