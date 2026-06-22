"use client";

import React from "react";
import { Heart, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CalendarWidgetProps {
  dateStr: string;
  size?: "sm" | "md";
  dark?: boolean;
}

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const parseAnniversary = (dateStr: string) => {
  const parts = dateStr.split("/");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return { day, month, year };
    }
  }
  return { day: 12, month: 6, year: 2023 };
};

const getCalendarDays = (month: number, year: number) => {
  const firstDayIndex = new Date(year, month - 1, 1).getDay();
  const totalDays = new Date(year, month, 0).getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null);
  }
  for (let d = 1; d <= totalDays; d++) {
    days.push(d);
  }
  return days;
};

export function CalendarWidget({ dateStr, size = "md", dark = false }: CalendarWidgetProps) {
  const { day, month, year } = parseAnniversary(dateStr);
  const monthName = MONTH_NAMES[month - 1] || "Junho";
  const days = getCalendarDays(month, year);
  const isSm = size === "sm";

  return (
    <Card className={`w-full border shadow-xs relative overflow-hidden flex flex-col transition-all hover:scale-[1.01] shrink-0 ${
      dark 
        ? "bg-[#18181A] border-white/10 text-white" 
        : "bg-white border-[#E8E6F5] text-[#2D2A4A]"
    } ${isSm ? "p-2.5 rounded-xl gap-1.5" : "p-4 rounded-2xl gap-3"}`}>
      
      <div className="flex items-center justify-between">
        <span className={`font-extrabold tracking-wider uppercase flex items-center gap-1.5 ${
          dark ? "text-rose-400" : "text-rose-500"
        } ${isSm ? "text-[6px]" : "text-[8.5px]"}`}>
          <Calendar className={isSm ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} /> Data Especial
        </span>
        <div className={`font-black tracking-wider text-rose-500 uppercase ${isSm ? "text-[6px]" : "text-[9px]"}`}>
          {monthName} <span className={dark ? "text-white/60" : "text-slate-400 font-bold"}>{year}</span>
        </div>
      </div>

      <div className={`grid grid-cols-7 gap-0.5 font-bold text-center border-t border-b py-1 ${
        dark ? "text-white/30 border-white/5" : "text-slate-300 border-slate-100"
      } ${isSm ? "text-[5px] my-0.5" : "text-[8.5px] my-1"}`}>
        {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
          <span key={i} className={i === 0 || i === 6 ? "text-rose-500/70" : ""}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-center">
        {days.map((d, i) => {
          if (d === null) return <span key={i}></span>;
          const isTarget = d === day;
          return (
            <span
              key={i}
              className={`flex items-center justify-center font-extrabold rounded-full aspect-square w-full transition-all ${
                isTarget
                  ? "bg-linear-to-br from-rose-500 to-pink-600 text-white scale-110 shadow-md shadow-rose-500/20 relative"
                  : dark 
                    ? "text-white/80 hover:bg-white/5" 
                    : "text-slate-700 hover:bg-rose-500/5"
              } ${isSm ? "text-[5.5px]" : "text-[9px]"}`}
            >
              {isTarget ? (
                <>
                  <span className="absolute -inset-0.5 rounded-full bg-rose-500/20 animate-ping"></span>
                  <Heart className="w-1/2 h-1/2 fill-current text-white shrink-0" />
                </>
              ) : d}
            </span>
          );
        })}
      </div>

      <div className={`text-center font-semibold italic pt-2 border-t ${
        dark ? "border-white/5 text-rose-400" : "border-rose-100/60 text-rose-500"
      } ${isSm ? "text-[5px]" : "text-[8px]"}`}>
        ✨ quando tudo começou...
      </div>
    </Card>
  );
}
