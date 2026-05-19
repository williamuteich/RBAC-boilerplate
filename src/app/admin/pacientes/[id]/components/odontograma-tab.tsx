"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, HelpCircle, Info, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const upperTeethRight = [18, 17, 16, 15, 14, 13, 12, 11];
const upperTeethLeft = [21, 22, 23, 24, 25, 26, 27, 28];
const lowerTeethLeft = [38, 37, 36, 35, 34, 33, 32, 31];
const lowerTeethRight = [41, 42, 43, 44, 45, 46, 47, 48];

export type ToothStatus = "healthy" | "cavity" | "restored" | "extracted" | "missing";

export interface ToothInfo {
    id: number;
    status: ToothStatus;
    notes: string;
}

export const statusConfig = {
    healthy: { label: "Saudável", color: "bg-emerald-500", border: "border-emerald-500", text: "text-emerald-700", bgLight: "bg-emerald-50/60" },
    cavity: { label: "Cárie / Canal", color: "bg-rose-500", border: "border-rose-500", text: "text-rose-700", bgLight: "bg-rose-50/60" },
    restored: { label: "Restaurado", color: "bg-blue-500", border: "border-blue-500", text: "text-blue-700", bgLight: "bg-blue-50/60" },
    extracted: { label: "Implante", color: "bg-amber-500", border: "border-amber-500", text: "text-amber-700", bgLight: "bg-amber-50/60" },
    missing: { label: "Ausente", color: "bg-slate-400", border: "border-slate-400", text: "text-slate-700", bgLight: "bg-slate-50" },
};

interface OdontogramaTabProps {
    teeth: Record<number, ToothInfo>;
    selectedTooth: number | null;
    setSelectedTooth: (id: number | null) => void;
    onStatusUpdate: (status: ToothStatus) => void;
    onNoteUpdate: (notes: string) => void;
}

export default function OdontogramaTab({
    teeth,
    selectedTooth,
    setSelectedTooth,
    onStatusUpdate,
    onNoteUpdate
}: OdontogramaTabProps) {

    const ToothSvg = ({ toothId, active }: { toothId: number; active: boolean }) => {
        const info = teeth[toothId];
        const conf = statusConfig[info?.status || "healthy"];

        let fillColor = "fill-emerald-100 hover:fill-emerald-200 stroke-emerald-600";
        if (info?.status === "cavity") {
            fillColor = "fill-rose-100 hover:fill-rose-200 stroke-rose-600";
        } else if (info?.status === "restored") {
            fillColor = "fill-blue-100 hover:fill-blue-200 stroke-blue-600";
        } else if (info?.status === "extracted") {
            fillColor = "fill-amber-100 hover:fill-amber-200 stroke-amber-600";
        } else if (info?.status === "missing") {
            fillColor = "fill-slate-100 hover:fill-slate-200 stroke-slate-400";
        }

        return (
            <button
                type="button"
                onClick={() => setSelectedTooth(toothId)}
                className={cn(
                    "flex flex-col items-center p-2 rounded-xl transition-all duration-300 relative border",
                    active
                        ? "border-blue-600 bg-blue-50/50 shadow-md shadow-blue-50/80 scale-110 z-10"
                        : "border-transparent hover:bg-slate-50 hover:scale-105"
                )}
            >
                <span className="text-[10px] font-bold text-slate-500 mb-1">#{toothId}</span>
                <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-sm transition-transform duration-300">
                    <path
                        d="M 25,20 C 25,10 75,10 75,20 C 80,35 85,60 70,80 C 65,85 55,90 50,95 C 45,90 35,85 30,80 C 15,60 20,35 25,20 Z"
                        className={cn("stroke-2 transition-all duration-300", fillColor)}
                    />
                    <path
                        d="M 35,35 Q 50,55 65,35"
                        fill="none"
                        className={cn("stroke-2 opacity-50", info?.status === "missing" ? "stroke-slate-400" : "stroke-current")}
                    />
                    <path
                        d="M 50,20 L 50,60"
                        fill="none"
                        className={cn("stroke-1 opacity-40", info?.status === "missing" ? "stroke-slate-400" : "stroke-current")}
                    />
                </svg>
                <span className={cn("w-2 h-2 rounded-full mt-2", conf.color)}></span>
            </button>
        );
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 w-full">
            {/* Interactive Odontogram Map */}
            <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                            <Stethoscope className="h-5 w-5 text-blue-600" />
                            Mapeamento Dentário (Odontograma)
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Selecione um dente na arcada para atualizar seu diagnóstico ou histórico.
                        </p>
                    </div>
                    <div className="hidden sm:flex flex-wrap gap-2">
                        {Object.entries(statusConfig).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-1.5 text-xs bg-slate-50 border px-2 py-1 rounded-lg">
                                <span className={cn("w-2.5 h-2.5 rounded-full", value.color)}></span>
                                <span className="text-slate-600">{value.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center gap-10 select-none shadow-inner min-h-[350px] relative overflow-hidden">
                    <div className="absolute top-3 left-4 text-xs font-semibold text-slate-400 tracking-wider">SUPERIOR (ARCADA SUPERIOR)</div>
                    <div className="absolute bottom-3 left-4 text-xs font-semibold text-slate-400 tracking-wider">INFERIOR (ARCADA INFERIOR)</div>

                    {/* ARCADA SUPERIOR */}
                    <div className="flex flex-col items-center gap-2 w-full max-w-2xl">
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full">
                            <div className="flex gap-1.5 sm:gap-2">
                                {upperTeethRight.map((t) => (
                                    <ToothSvg key={t} toothId={t} active={selectedTooth === t} />
                                ))}
                            </div>
                            <div className="w-[1px] bg-slate-300 self-stretch my-2"></div>
                            <div className="flex gap-1.5 sm:gap-2">
                                {upperTeethLeft.map((t) => (
                                    <ToothSvg key={t} toothId={t} active={selectedTooth === t} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Divider Line */}
                    <div className="w-full max-w-2xl border-t border-dashed border-slate-200"></div>

                    {/* ARCADA INFERIOR */}
                    <div className="flex flex-col items-center gap-2 w-full max-w-2xl">
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full">
                            <div className="flex gap-1.5 sm:gap-2">
                                {lowerTeethLeft.map((t) => (
                                    <ToothSvg key={t} toothId={t} active={selectedTooth === t} />
                                ))}
                            </div>
                            <div className="w-[1px] bg-slate-300 self-stretch my-2"></div>
                            <div className="flex gap-1.5 sm:gap-2">
                                {lowerTeethRight.map((t) => (
                                    <ToothSvg key={t} toothId={t} active={selectedTooth === t} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex sm:hidden flex-wrap justify-center gap-2 pt-2">
                    {Object.entries(statusConfig).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-1 text-[11px] bg-slate-50 border px-2 py-1 rounded-lg">
                            <span className={cn("w-2 h-2 rounded-full", value.color)}></span>
                            <span className="text-slate-600">{value.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tooth details pane */}
            <div className="w-full lg:w-[320px] bg-slate-50 border rounded-2xl p-5 flex flex-col gap-5 self-stretch shadow-sm">
                {selectedTooth !== null ? (
                    <div className="space-y-4 animate-in fade-in duration-300">
                        <div className="flex items-center justify-between border-b pb-3">
                            <div>
                                <h4 className="font-bold text-slate-800 text-lg">Dente #{selectedTooth}</h4>
                                <p className="text-xs text-muted-foreground">
                                    {selectedTooth <= 28 ? "Arcada Superior" : "Arcada Inferior"} •{" "}
                                    {[18, 17, 16, 26, 27, 28, 38, 37, 36, 46, 47, 48].includes(selectedTooth)
                                        ? "Molar"
                                        : [15, 14, 24, 25, 34, 35, 44, 45].includes(selectedTooth)
                                        ? "Pré-Molar"
                                        : [13, 23, 33, 43].includes(selectedTooth)
                                        ? "Canino"
                                        : "Incisivo"}
                                </p>
                            </div>
                            <Badge className={cn("font-medium py-1 px-2.5 border", statusConfig[teeth[selectedTooth]?.status || "healthy"].bgLight, statusConfig[teeth[selectedTooth]?.status || "healthy"].text)}>
                                {statusConfig[teeth[selectedTooth]?.status || "healthy"].label}
                            </Badge>
                        </div>

                        {/* Action Selector */}
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Alterar Estado do Dente</Label>
                            <div className="grid grid-cols-1 gap-2">
                                {Object.entries(statusConfig).map(([key, value]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => onStatusUpdate(key as ToothStatus)}
                                        className={cn(
                                            "flex items-center gap-3 p-2.5 rounded-xl border text-sm transition-all duration-300 font-medium",
                                            teeth[selectedTooth]?.status === key
                                                ? "bg-white border-blue-600 shadow-sm text-blue-700"
                                                : "bg-white/60 border-slate-100 hover:border-slate-300 text-slate-600"
                                        )}
                                    >
                                        <span className={cn("w-3.5 h-3.5 rounded-full shrink-0 border border-black/5", value.color)}></span>
                                        <span>{value.label}</span>
                                        {teeth[selectedTooth]?.status === key && (
                                            <Check className="h-4 w-4 text-blue-600 ml-auto" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-1.5 pt-2">
                            <Label htmlFor="toothNotes" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Anotações Clínicas</Label>
                            <textarea
                                id="toothNotes"
                                value={teeth[selectedTooth]?.notes || ""}
                                onChange={(e) => onNoteUpdate(e.target.value)}
                                placeholder="Descreva problemas, procedimentos futuros ou tratamentos realizados..."
                                className="w-full h-24 rounded-xl border bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-slate-400"
                            />
                        </div>

                        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 flex gap-2.5">
                            <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                            <p className="text-[11px] text-blue-700 leading-normal">
                                Alterações no Odontograma são salvas localmente nesta sessão para demonstração do front-end.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center py-10">
                        <HelpCircle className="h-10 w-10 text-slate-300 mb-2 animate-pulse" />
                        <h5 className="font-semibold text-slate-700 text-sm">Nenhum Dente Selecionado</h5>
                        <p className="text-xs text-muted-foreground max-w-xs mt-1">
                            Selecione um dente no gráfico para ver e gerenciar os dados clínicos.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
