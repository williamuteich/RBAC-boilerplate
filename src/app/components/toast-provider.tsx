"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  const success = useCallback((message: string) => addToast(message, "success"), [addToast]);
  const error = useCallback((message: string) => addToast(message, "error"), [addToast]);
  const info = useCallback((message: string) => addToast(message, "info"), [addToast]);

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error, info }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "flex items-center gap-3 p-4 rounded-xl border shadow-lg pointer-events-auto animate-in slide-in-from-right-4 fade-in duration-300",
              t.type === "success" && "bg-emerald-50 border-emerald-100 text-emerald-900",
              t.type === "error" && "bg-rose-50 border-rose-100 text-rose-900",
              t.type === "info" && "bg-blue-50 border-blue-100 text-blue-900"
            )}
          >
            {t.type === "success" && <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />}
            {t.type === "error" && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
            {t.type === "info" && <Info className="w-5 h-5 text-blue-600 shrink-0" />}
            
            <p className="text-xs font-bold flex-1 leading-relaxed">{t.message}</p>
            
            <button
              onClick={() => removeToast(t.id)}
              className="p-1 rounded-md hover:bg-black/5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
