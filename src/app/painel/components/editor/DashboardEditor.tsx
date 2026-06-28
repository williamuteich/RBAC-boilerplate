"use client";

import { useState } from "react";
import { EditorProvider } from "./EditorContext";
import { BasicInfoSection } from "./BasicInfoSection";
import { ThemeSelectionSection } from "./ThemeSelectionSection";
import { PhotoGallerySection } from "./PhotoGallerySection";
import { ContentMediaSection } from "./ContentMediaSection";
import { PublishSection } from "./PublishSection";
import { Heart, LayoutGrid, Image as ImageIcon, Music, Send, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardEditor() {
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, label: "Casal", icon: Heart },
    { id: 2, label: "Temas", icon: LayoutGrid },
    { id: 3, label: "Fotos", icon: ImageIcon },
    { id: 4, label: "Carta & Som", icon: Music },
    { id: 5, label: "Publicar", icon: Send },
  ];

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <EditorProvider>
      <div className="w-full flex flex-col gap-6 pb-12 font-sans selection:bg-[#9A75F0] selection:text-white">
        <div className="bg-white border border-[#E8E6F5] p-5 rounded-[24px] shadow-[0_4px_25px_rgba(45,42,74,0.02)]">
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-5">
            <div 
              className="bg-linear-to-r from-[#9A75F0] to-[#8B5CF6] h-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {steps.map((s) => {
              const Icon = s.icon;
              const isActive = step === s.id;
              const isCompleted = step > s.id;

              return (
                <div
                  key={s.id}
                  className="flex flex-col items-center justify-center gap-1.5 group focus:outline-none"
                >
                  <div className={`w-8 h-8 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? "bg-linear-to-br from-[#9A75F0] to-[#8B5CF6] text-white shadow-md shadow-[#9A75F0]/30 scale-105" 
                      : isCompleted 
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200" 
                        : "bg-slate-50 text-slate-400 border border-slate-100"
                  }`}>
                    <Icon className="w-3.5 h-3.5 md:w-5 md:h-5" />
                  </div>
                  <span className={`text-[9px] md:text-xs font-black transition-colors truncate w-full text-center ${
                    isActive 
                      ? "text-[#9A75F0]" 
                      : isCompleted 
                        ? "text-emerald-600" 
                        : "text-slate-400"
                  }`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="transition-all duration-300">
          {step === 1 && <BasicInfoSection />}
          {step === 2 && <ThemeSelectionSection />}
          {step === 3 && <PhotoGallerySection />}
          {step === 4 && <ContentMediaSection />}
          {step === 5 && <PublishSection />}
        </div>

        <div className="flex items-center justify-between gap-4 mt-2">
          <Button
            type="button"
            variant="outline"
            disabled={step === 1}
            onClick={handlePrev}
            className="rounded-2xl border-[#E8E6F5] text-slate-600 hover:bg-slate-50 text-xs px-5 py-5 font-bold h-11 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </Button>

          {step < 5 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="bg-[#9A75F0] hover:bg-[#8B5CF6] text-white rounded-2xl text-xs px-6 py-5 font-extrabold h-11 flex items-center gap-2 shadow-md shadow-[#9A75F0]/20 cursor-pointer"
            >
              Próximo
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <div className="w-auto" />
          )}
        </div>
      </div>
    </EditorProvider>
  );
}
