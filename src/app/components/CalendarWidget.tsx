"use client";

import { useState, useEffect } from "react";
import { Heart, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CalendarWidgetProps } from "@/src/types/love-widgets";


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

  const [timeElapsed, setTimeElapsed] = useState("");

  useEffect(() => {
    const parseDateTime = (str: string) => {
      const parts = str.trim().split(" ");
      const dateParts = parts[0].split("/");
      let d = 12, m = 6, y = 2023;
      let hr = 0, min = 0;

      if (dateParts.length === 3) {
        d = parseInt(dateParts[0], 10) || 12;
        m = parseInt(dateParts[1], 10) || 6;
        y = parseInt(dateParts[2], 10) || 2023;
      }
      if (parts[1]) {
        const timeParts = parts[1].split(":");
        hr = parseInt(timeParts[0], 10) || 0;
        min = parseInt(timeParts[1], 10) || 0;
      }
      return new Date(y, m - 1, d, hr, min);
    };

    const startDate = parseDateTime(dateStr);

    const updateTimer = () => {
      const now = new Date();
      const diffMs = now.getTime() - startDate.getTime();
      if (diffMs <= 0) {
        setTimeElapsed("Em breve!");
        return;
      }

      const totalSeconds = Math.floor(diffMs / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const daysCount = Math.floor(totalHours / 24);

      const hours = totalHours % 24;
      const minutes = totalMinutes % 60;
      const seconds = totalSeconds % 60;

      const pad = (n: number) => String(n).padStart(2, "0");

      setTimeElapsed(`${daysCount}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [dateStr]);

  return (
    <Card className={`w-full border shadow-xs relative overflow-hidden flex flex-col transition-all hover:scale-[1.01] shrink-0 ${dark
      ? "bg-[#18181A] border-white/10 text-white"
      : "bg-white border-[#E8E6F5] text-[#2D2A4A]"
      } ${isSm ? "p-3 rounded-xl gap-2" : "p-4.5 rounded-2xl gap-3.5"}`}>

      <div className="flex items-center justify-between">
        <span className={`font-extrabold tracking-wider uppercase flex items-center gap-1.5 ${dark ? "text-rose-400" : "text-rose-500"
          } ${isSm ? "text-[8px]" : "text-[11px]"}`}>
          <Calendar className={isSm ? "w-3 h-3" : "w-4 h-4"} /> Data Especial
        </span>
        <div className={`font-black tracking-wider text-rose-500 uppercase ${isSm ? "text-[8px]" : "text-[12px]"}`}>
          {monthName} <span className={dark ? "text-white/60" : "text-slate-400 font-bold"}>{year}</span>
        </div>
      </div>

      <div className={`grid grid-cols-7 gap-0.5 font-bold text-center border-t border-b py-1.5 ${dark ? "text-white/30 border-white/5" : "text-slate-300 border-slate-100"
        } ${isSm ? "text-[7.5px] my-0.5" : "text-[11px] my-1"}`}>
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
              className={`flex items-center justify-center font-extrabold rounded-full aspect-square w-full transition-all ${isTarget
                ? "bg-linear-to-br from-rose-500 to-pink-600 text-white scale-110 shadow-md shadow-rose-500/20 relative"
                : dark
                  ? "text-white/85 hover:bg-white/5"
                  : "text-slate-700 hover:bg-rose-500/5"
                } ${isSm ? "text-[8px]" : "text-[12px]"}`}
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

      <div className={`text-center pt-2.5 border-t flex flex-col gap-0.5 items-center justify-center ${dark ? "border-white/5" : "border-rose-100/60"}`}>
        <span className={`font-mono font-black tracking-wide ${dark ? "text-rose-400" : "text-rose-600"} ${isSm ? "text-[8.5px]" : "text-xs"}`}>
          {timeElapsed || "Calculando tempo..."}
        </span>
        <span className={`font-semibold italic ${dark ? "text-white/40" : "text-slate-400"} ${isSm ? "text-[6.5px]" : "text-[9px]"}`}>
          quando tudo começou...
        </span>
      </div>
    </Card>
  );
}
