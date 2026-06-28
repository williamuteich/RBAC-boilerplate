"use client";

import { QrCode, Globe, Check, Save, Copy, ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditor } from "./EditorContext";
import { useState, useEffect } from "react";

export function PublishSection() {
  const {
    tributeId,
    isSaving,
    saveSuccess,
    setSaveSuccess,
    errorMessage,
    setErrorMessage,
    handleSave,
  } = useEditor();

  const [copied, setCopied] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const absoluteUrl = `/p/${tributeId}`;

  useEffect(() => {
    if (saveSuccess) {
      setShowSuccessAlert(true);
      const timer = setTimeout(() => {
        setShowSuccessAlert(false);
        setSaveSuccess(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [saveSuccess, setSaveSuccess]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(absoluteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQrCode = async () => {
    try {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(absoluteUrl)}`;
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `qrcode-${tributeId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      window.open(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(absoluteUrl)}`, "_blank");
    }
  };

  return (
    <div className="bg-white border border-[#E8E6F5] p-6 md:p-8 rounded-[32px] shadow-[0_10px_40px_rgba(45,42,74,0.02)] flex flex-col items-center text-center">

      {showSuccessAlert && (
        <div className="w-full bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div className="text-left flex-1">
            <h4 className="text-xs font-black text-emerald-900">Salvo com Sucesso!</h4>
            <p className="text-[10px] text-emerald-700 mt-0.5">Sua homenagem eterna foi atualizada com sucesso.</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="w-full bg-rose-50 border border-rose-100 rounded-2xl p-4 flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
            <span className="text-sm font-bold">!</span>
          </div>
          <div className="text-left flex-1">
            <h4 className="text-xs font-black text-rose-900">Falha ao Salvar</h4>
            <p className="text-[10px] text-rose-700 mt-0.5">{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage("")}
            className="text-[10px] font-bold text-slate-400 hover:text-slate-600 px-2 shrink-0 cursor-pointer"
          >
            Fechar
          </button>
        </div>
      )}

      <h3 className="text-base font-bold text-[#2D2A4A] flex items-center gap-2 mb-4 self-start">
        <QrCode className="w-5 h-5 text-[#9A75F0]" />
        Publicação
      </h3>

      <div className="w-full bg-[#FAF9FF] border border-[#E8E6F5] rounded-[24px] p-6 flex flex-col items-center gap-4 mb-6">
        <div className="p-3 bg-white border border-slate-100 rounded-2xl shadow-xs flex flex-col items-center gap-2">
          <div className="w-32 h-32 bg-white flex items-center justify-center relative overflow-hidden">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(absoluteUrl)}`}
              alt="QR Code Oficial"
              className="w-full h-full object-contain select-none"
            />
          </div>
          <button
            type="button"
            onClick={handleDownloadQrCode}
            className="cursor-pointer flex items-center gap-1 text-[10px] font-bold text-[#9A75F0] hover:text-[#8B5CF6] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar QR Code</span>
          </button>
        </div>

        <a
          href={absoluteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group w-full relative flex items-center gap-3 bg-linear-to-r from-[#9A75F0] to-[#8B5CF6] hover:from-[#8b6fe3] hover:to-[#7c4ee6] text-white rounded-2xl px-5 py-4 shadow-lg shadow-[#9A75F0]/25 hover:shadow-[#9A75F0]/40 transition-all duration-200 active:scale-[0.98] cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Globe className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-xs font-extrabold text-white leading-tight">Ver Minha Homenagem</p>
            <p className="text-[10px] text-white/70 mt-0.5">Abre em nova aba</p>
          </div>
          <ExternalLink className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 shrink-0" />
        </a>
      </div>

      <Button
        type="button"
        onClick={handleSave}
        disabled={isSaving}
        className="w-full bg-linear-to-r from-[#9A75F0] to-[#8B5CF6] hover:from-[#8b6fe3] hover:to-[#7c4ee6] text-white font-extrabold py-4 px-6 rounded-2xl cursor-pointer shadow-lg shadow-[#9A75F0]/20 flex items-center justify-center gap-2 text-xs transition-all active:scale-[0.98] h-12"
      >
        {isSaving ? (
          <>
            <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            <span>Salvando Homenagem...</span>
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            <span>Salvar Minha Página</span>
          </>
        )}
      </Button>

      <div className="mt-4 text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
        <span>O link é ativado e atualizado imediatamente</span>
      </div>
    </div>
  );
}
