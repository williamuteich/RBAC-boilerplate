"use client";

import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, HelpCircle, Info, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToothStatus, OdontogramaTabProps } from "@/src/types/dashboard/pacientes";

const upperTeethRight = [18, 17, 16, 15, 14, 13, 12, 11];
const upperTeethLeft = [21, 22, 23, 24, 25, 26, 27, 28];
const lowerTeethLeft = [38, 37, 36, 35, 34, 33, 32, 31];
const lowerTeethRight = [41, 42, 43, 44, 45, 46, 47, 48];

export const statusConfig = {
    healthy: { label: "Saudável", color: "bg-emerald-500", border: "border-emerald-500", text: "text-emerald-700", bgLight: "bg-emerald-50/60" },
    cavity: { label: "Cárie / Canal", color: "bg-rose-500", border: "border-rose-500", text: "text-rose-700", bgLight: "bg-rose-50/60" },
    restored: { label: "Restaurado", color: "bg-blue-500", border: "border-blue-500", text: "text-blue-700", bgLight: "bg-blue-50/60" },
    extracted: { label: "Implante", color: "bg-amber-500", border: "border-amber-500", text: "text-amber-700", bgLight: "bg-amber-50/60" },
    missing: { label: "Ausente", color: "bg-slate-400", border: "border-slate-400", text: "text-slate-700", bgLight: "bg-slate-50" },
};

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

        let fillClass = "fill-emerald-500 hover:fill-emerald-600";
        if (info?.status === "cavity") {
            fillClass = "fill-rose-500 hover:fill-rose-600";
        } else if (info?.status === "restored") {
            fillClass = "fill-blue-500 hover:fill-blue-600";
        } else if (info?.status === "extracted") {
            fillClass = "fill-amber-500 hover:fill-amber-600";
        } else if (info?.status === "missing") {
            fillClass = "fill-slate-400 hover:fill-slate-500";
        }

        return (
            <button
                type="button"
                onClick={() => setSelectedTooth(toothId)}
                className={cn(
                    "flex flex-col items-center p-2 rounded-md transition-all duration-300 relative border",
                    active
                        ? "border-blue-600 bg-blue-50/50 shadow-md shadow-blue-50/80 scale-110 z-10"
                        : "border-transparent hover:bg-slate-50 hover:scale-105"
                )}
            >
                <span className="text-[10px] font-bold text-slate-500 mb-1">#{toothId}</span>
                <svg viewBox="0 0 32 32" className="w-10 h-10 drop-shadow-sm transition-transform duration-300">
                    <path
                        d="M4.428 20.351c.336.805.621 2.198.896 3.546.379 1.856.708 3.459 1.262 4.292.1.149.195.305.291.462.251.408.535.872.914 1.276.556.595 1.259.952 1.978 1.006a2.843 2.843 0 0 0 1.93-.602c.707-.557.971-1.302 1.183-1.901l.1-.277c.07-.186.139-.358.207-.526.164-.409.333-.832.474-1.349 1.307-4.809 2.143-5.242 2.286-5.278h.137c.437.004.53 0 .822.638.527 1.15.979 2.49 1.464 4.345.291 1.11.578 2.065.931 3.099.422 1.236 1.302 1.917 2.477 1.917 1.582 0 2.824-1.608 3.62-2.818.515-.783.924-2.302 1.538-4.711.357-1.404.727-2.855 1.06-3.656.494-1.187.934-2.139 1.312-2.958C30.363 14.57 31 13.19 31 10.728c0-2.513-.857-4.897-2.412-6.712-1.67-1.951-3.974-3.025-6.487-3.025-2.009 0-3.979 1.133-5.416 1.96-.089.051-.201.121-.322.196-.087.055-.216.135-.333.203-.313-.173-.57-.317-.71-.398-1.435-.828-3.4-1.961-5.421-1.961-2.513 0-4.816 1.074-6.487 3.023C1.857 5.829 1 8.21 1 10.718c0 2.424.79 4.04 1.882 6.277.466.952.993 2.032 1.546 3.356zm.503-15.037C6.216 3.815 7.98 2.99 9.899 2.99c1.485 0 3.183.979 4.423 1.695 3.472 1.998 3.878 1.998 4.052 1.998a1 1 0 0 0 .233-1.973 8.154 8.154 0 0 1-.525-.255c1.192-.678 2.696-1.464 4.018-1.464 1.919 0 3.684.826 4.968 2.326C28.314 6.77 29 8.691 29 10.728c0 2.023-.504 3.115-1.508 5.289a82.345 82.345 0 0 0-1.343 3.028c-.389.936-.76 2.391-1.152 3.931-.402 1.58-.902 3.546-1.27 4.105-1.171 1.78-1.788 1.918-1.949 1.918-.184 0-.392 0-.584-.563a41.11 41.11 0 0 1-.889-2.959c-.516-1.972-1.004-3.412-1.581-4.671C17.963 19.142 16.965 19 16.058 19h-.11c-1.976 0-3.114 2.7-4.215 6.754-.11.404-.245.74-.4 1.128-.072.18-.146.366-.222.566l-.113.313c-.175.496-.295.809-.534.997a.803.803 0 0 1-.542.18c-.216-.017-.46-.154-.67-.379-.24-.257-.449-.596-.669-.956-.111-.177-.22-.353-.333-.523-.338-.507-.687-2.212-.967-3.583-.294-1.441-.599-2.932-1.01-3.916-.575-1.378-1.117-2.486-1.594-3.464C3.668 14.047 3 12.68 3 10.718c0-2.031.686-3.95 1.931-5.404z"
                        className={cn("transition-all duration-300", fillClass)}
                    />
                </svg>
                <span className={cn("w-2 h-2 rounded-full mt-2", conf.color)}></span>
            </button>
        );
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 w-full">
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
                            <div key={key} className="flex items-center gap-1.5 text-xs bg-slate-50 border px-2 py-1 rounded-md">
                                <span className={cn("w-2.5 h-2.5 rounded-full", value.color)}></span>
                                <span className="text-slate-600">{value.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-50/50 border border-slate-100 rounded-md p-6 flex flex-col items-center justify-center gap-10 select-none shadow-inner min-h-[350px] relative overflow-hidden">
                    <div className="absolute top-3 left-4 text-xs font-semibold text-slate-400 tracking-wider">SUPERIOR (ARCADA SUPERIOR)</div>
                    <div className="absolute bottom-3 left-4 text-xs font-semibold text-slate-400 tracking-wider">INFERIOR (ARCADA INFERIOR)</div>

                    <div className="flex flex-col items-center gap-2 w-full max-w-2xl">
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full">
                            <div className="flex gap-1.5 sm:gap-2">
                                {upperTeethRight.map((t) => (
                                    <ToothSvg key={t} toothId={t} active={selectedTooth === t} />
                                ))}
                            </div>
                            <div className="w-px bg-slate-300 self-stretch my-2"></div>
                            <div className="flex gap-1.5 sm:gap-2">
                                {upperTeethLeft.map((t) => (
                                    <ToothSvg key={t} toothId={t} active={selectedTooth === t} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-2xl border-t border-dashed border-slate-200"></div>

                    <div className="flex flex-col items-center gap-2 w-full max-w-2xl">
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full">
                            <div className="flex gap-1.5 sm:gap-2">
                                {lowerTeethLeft.map((t) => (
                                    <ToothSvg key={t} toothId={t} active={selectedTooth === t} />
                                ))}
                            </div>
                            <div className="w-px bg-slate-300 self-stretch my-2"></div>
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
                        <div key={key} className="flex items-center gap-1 text-[11px] bg-slate-50 border px-2 py-1 rounded-md">
                            <span className={cn("w-2.5 h-2.5 rounded-full", value.color)}></span>
                            <span className="text-slate-600">{value.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full lg:w-[320px] bg-slate-50 border rounded-md p-5 flex flex-col gap-5 self-stretch shadow-sm">
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
                            <Badge className={cn("font-medium py-1 px-2.5 border rounded-sm", statusConfig[teeth[selectedTooth]?.status || "healthy"].bgLight, statusConfig[teeth[selectedTooth]?.status || "healthy"].text)}>
                                {statusConfig[teeth[selectedTooth]?.status || "healthy"].label}
                            </Badge>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Alterar Estado do Dente</Label>
                            <div className="grid grid-cols-1 gap-2">
                                {Object.entries(statusConfig).map(([key, value]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => onStatusUpdate(key as ToothStatus)}
                                        className={cn(
                                            "flex items-center gap-3 p-2.5 rounded-md border text-sm transition-all duration-300 font-medium",
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
                                className="w-full h-24 rounded-md border bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-slate-400"
                            />
                        </div>

                        <div className="bg-blue-50/50 border border-blue-100 rounded-md p-3 flex gap-2.5">
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
