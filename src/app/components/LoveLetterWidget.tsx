"use client";

import { Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LoveLetterWidgetProps } from "@/src/types/love-widgets";


const DEFAULT_NOTES = [
  "E pensar que tudo começou do nada...",
  "Olha só pra gente agora:",
  "Escrevendo nossa história,",
  "E eternizando nosso amor..."
];

export function LoveLetterWidget({ notes = DEFAULT_NOTES, size = "md", dark = false }: LoveLetterWidgetProps) {
  const isSm = size === "sm";

  return (
    <Card className={`w-full border shadow-none relative overflow-hidden flex flex-col transition-all hover:scale-[1.01] shrink-0 ${dark
        ? "bg-white/5 border-white/10 text-white backdrop-blur-md"
        : "bg-linear-to-br from-rose-5/70 to-pink-5/70 border-rose-100 text-rose-950"
      } ${isSm ? "p-3 rounded-xl gap-1.5" : "p-4.5 rounded-2xl gap-2.5"}`}>
      <span className={`font-extrabold tracking-wider uppercase flex items-center gap-1.5 ${dark ? "text-rose-400" : "text-rose-500"
        } ${isSm ? "text-[8px]" : "text-[11px]"}`}>
        <Mail className={isSm ? "w-3 h-3" : "w-4 h-4"} /> Carta de Amor
      </span>
      <div className={`space-y-1.5 mt-1 ${isSm ? "space-y-1" : "space-y-2"}`}>
        {notes.map((line, idx) => (
          <p
            key={idx}
            className={`font-bold leading-tight ${dark ? "text-white/90" : "text-rose-900"
              } ${isSm ? "text-[8px]" : "text-[12px]"}`}
          >
            {line}
          </p>
        ))}
      </div>
    </Card>
  );
}
