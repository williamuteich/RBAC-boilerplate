"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, HelpCircle, Info, Check, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToothStatus, ToothInfo } from "@/src/types/dashboard/pacientes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const upperTeethRight = [18, 17, 16, 15, 14, 13, 12, 11];
const upperTeethLeft = [21, 22, 23, 24, 25, 26, 27, 28];
const lowerTeethLeft = [38, 37, 36, 35, 34, 33, 32, 31];
const lowerTeethRight = [41, 42, 43, 44, 45, 46, 47, 48];

const upperTeethRightChild = [55, 54, 53, 52, 51];
const upperTeethLeftChild = [61, 62, 63, 64, 65];
const lowerTeethLeftChild = [75, 74, 73, 72, 71];
const lowerTeethRightChild = [81, 82, 83, 84, 85];

export const statusConfig = {
    SAUDAVEL: { label: "Saudável", color: "bg-emerald-500", border: "border-emerald-500", text: "text-emerald-700", bgLight: "bg-emerald-50/60" },
    CARIE: { label: "Cárie", color: "bg-rose-500", border: "border-rose-500", text: "text-rose-700", bgLight: "bg-rose-50/60" },
    ENDODONTIA: { label: "Endodontia", color: "bg-blue-500", border: "border-blue-500", text: "text-blue-700", bgLight: "bg-blue-50/60" },
    PROTESE: { label: "Prótese", color: "bg-violet-500", border: "border-violet-500", text: "text-violet-700", bgLight: "bg-violet-50/60" },
    IMPLANTE: { label: "Implante", color: "bg-amber-500", border: "border-amber-500", text: "text-amber-700", bgLight: "bg-amber-50/60" },
    EXTRAIDO: { label: "Extraído", color: "bg-slate-400", border: "border-slate-400", text: "text-slate-700", bgLight: "bg-slate-50" },
    RETIDO: { label: "Retido", color: "bg-orange-500", border: "border-orange-500", text: "text-orange-700", bgLight: "bg-orange-50/60" },
    OUTRO: { label: "Outro", color: "bg-indigo-500", border: "border-indigo-500", text: "text-indigo-700", bgLight: "bg-indigo-50/60" },
} satisfies Record<ToothStatus, { label: string; color: string; border: string; text: string; bgLight: string }>;

interface CustomTooth {
    id: string;
    description: string;
    status: ToothStatus;
    notes: string;
}

export default function OdontogramaTab({ patientId, initialOdontogram }: { patientId?: string, initialOdontogram?: any }) {
    const [dentitionType, setDentitionType] = useState<"adult" | "child">("adult");

    const [teeth, setTeeth] = useState<Record<number, ToothInfo>>(() => {
        const initial: Record<number, ToothInfo> = {};
        const allTeeth = [
            ...upperTeethRight, ...upperTeethLeft, ...lowerTeethLeft, ...lowerTeethRight,
            ...upperTeethRightChild, ...upperTeethLeftChild, ...lowerTeethLeftChild, ...lowerTeethRightChild
        ];
        allTeeth.forEach(t => {
            let status: ToothStatus = "SAUDAVEL";
            let notes = "";
            if (t === 16) { status = "CARIE"; notes = "Cárie oclusal detectada"; }
            else if (t === 14) { status = "ENDODONTIA"; notes = "Restauração de resina oclusal realizada"; }
            else if (t === 36) { status = "IMPLANTE"; notes = "Implante osseointegrado instalado em 2024"; }
            else if (t === 38 || t === 48) { status = "RETIDO"; notes = "Dente do siso não erupcionado / ausente"; }
            initial[t] = { id: t, status, notes };
        });
        return initial;
    });

    const [customTeeth, setCustomTeeth] = useState<CustomTooth[]>([
        { id: "Supranumerário #1", description: "Dente extra entre 11 e 21 (Mesiodens)", status: "OUTRO", notes: "Acompanhar erupção ou possível extração futura" }
    ]);

    const [selectedTooth, setSelectedTooth] = useState<number | null>(16);
    const [selectedCustomToothId, setSelectedCustomToothId] = useState<string | null>(null);

    const handleToothStatusUpdate = (status: ToothStatus) => {
        if (selectedTooth !== null) {
            setTeeth(prev => ({
                ...prev,
                [selectedTooth]: {
                    ...prev[selectedTooth],
                    status
                }
            }));
        } else if (selectedCustomToothId !== null) {
            setCustomTeeth(prev => prev.map(ct => ct.id === selectedCustomToothId ? { ...ct, status } : ct));
        }
    };

    const handleToothNoteUpdate = (notes: string) => {
        if (selectedTooth !== null) {
            setTeeth(prev => ({
                ...prev,
                [selectedTooth]: {
                    ...prev[selectedTooth],
                    notes
                }
            }));
        } else if (selectedCustomToothId !== null) {
            setCustomTeeth(prev => prev.map(ct => ct.id === selectedCustomToothId ? { ...ct, notes } : ct));
        }
    };

    const handleCustomDescriptionUpdate = (description: string) => {
        if (selectedCustomToothId !== null) {
            setCustomTeeth(prev => prev.map(ct => ct.id === selectedCustomToothId ? { ...ct, description } : ct));
        }
    };

    const addCustomTooth = () => {
        const newId = `Supranumerário #${customTeeth.length + 1}`;
        const newTooth: CustomTooth = {
            id: newId,
            description: "Dente extra detectado",
            status: "SAUDAVEL",
            notes: ""
        };
        setCustomTeeth(prev => [...prev, newTooth]);
        setSelectedTooth(null);
        setSelectedCustomToothId(newId);
    };

    const removeCustomTooth = (id: string) => {
        setCustomTeeth(prev => prev.filter(ct => ct.id !== id));
        if (selectedCustomToothId === id) {
            setSelectedCustomToothId(null);
        }
    };

    const activeUpperRight = dentitionType === "adult" ? upperTeethRight : upperTeethRightChild;
    const activeUpperLeft = dentitionType === "adult" ? upperTeethLeft : upperTeethLeftChild;
    const activeLowerLeft = dentitionType === "adult" ? lowerTeethLeft : lowerTeethLeftChild;
    const activeLowerRight = dentitionType === "adult" ? lowerTeethRight : lowerTeethRightChild;

    const currentSelectedStatus = selectedTooth !== null
        ? teeth[selectedTooth]?.status || "SAUDAVEL"
        : selectedCustomToothId !== null
            ? customTeeth.find(ct => ct.id === selectedCustomToothId)?.status || "SAUDAVEL"
            : "SAUDAVEL";

    const currentSelectedNotes = selectedTooth !== null
        ? teeth[selectedTooth]?.notes || ""
        : selectedCustomToothId !== null
            ? customTeeth.find(ct => ct.id === selectedCustomToothId)?.notes || ""
            : "";

    const ToothSvg = ({ toothId, active }: { toothId: number; active: boolean }) => {
        const info = teeth[toothId];
        let fillClass = "fill-emerald-500 hover:fill-emerald-600";
        if (info?.status === "CARIE") {
            fillClass = "fill-rose-500 hover:fill-rose-600";
        } else if (info?.status === "ENDODONTIA") {
            fillClass = "fill-blue-500 hover:fill-blue-600";
        } else if (info?.status === "PROTESE") {
            fillClass = "fill-violet-500 hover:fill-violet-600";
        } else if (info?.status === "IMPLANTE") {
            fillClass = "fill-amber-500 hover:fill-amber-600";
        } else if (info?.status === "EXTRAIDO") {
            fillClass = "fill-slate-400 hover:fill-slate-500";
        } else if (info?.status === "RETIDO") {
            fillClass = "fill-orange-500 hover:fill-orange-600";
        } else if (info?.status === "OUTRO") {
            fillClass = "fill-indigo-500 hover:fill-indigo-600";
        }

        return (
            <button
                type="button"
                onClick={() => {
                    setSelectedTooth(toothId);
                    setSelectedCustomToothId(null);
                }}
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
                <span className={cn("w-2.5 h-2.5 rounded-full mt-2", statusConfig[info?.status || "SAUDAVEL"].color)}></span>
            </button>
        );
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 w-full animate-in fade-in duration-300">
            <div className="flex-1 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                            <Stethoscope className="h-5 w-5 text-blue-600" />
                            Odontograma Interativo
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Monitore a arcada padrão do paciente e registre dentes supranumerários ou anomalias.
                        </p>
                    </div>

                    <div className="flex items-center border border-slate-200 bg-slate-50 p-1 rounded-lg">
                        <button
                            onClick={() => {
                                setDentitionType("adult");
                                setSelectedTooth(16);
                                setSelectedCustomToothId(null);
                            }}
                            className={cn(
                                "h-8 px-3 text-xs font-semibold rounded-md transition-all",
                                dentitionType === "adult" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
                            )}
                        >
                            Dentição Permanente (Adulto)
                        </button>
                        <button
                            onClick={() => {
                                setDentitionType("child");
                                setSelectedTooth(51);
                                setSelectedCustomToothId(null);
                            }}
                            className={cn(
                                "h-8 px-3 text-xs font-semibold rounded-md transition-all",
                                dentitionType === "child" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
                            )}
                        >
                            Dentição Decídua (Infantil)
                        </button>
                    </div>
                </div>

                <div className="bg-slate-50/50 border border-slate-100 rounded-md p-6 flex flex-col items-center justify-center gap-10 select-none shadow-inner min-h-[350px] relative overflow-hidden">
                    <div className="absolute top-3 left-4 text-[9px] font-bold text-slate-400 tracking-wider">ARCADA SUPERIOR</div>
                    <div className="absolute bottom-3 left-4 text-[9px] font-bold text-slate-400 tracking-wider">ARCADA INFERIOR</div>

                    <div className="flex flex-col items-center gap-2 w-full max-w-2xl">
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full">
                            <div className="flex gap-1.5 sm:gap-2">
                                {activeUpperRight.map((t) => (
                                    <ToothSvg key={t} toothId={t} active={selectedTooth === t} />
                                ))}
                            </div>
                            <div className="w-px bg-slate-200 self-stretch my-2"></div>
                            <div className="flex gap-1.5 sm:gap-2">
                                {activeUpperLeft.map((t) => (
                                    <ToothSvg key={t} toothId={t} active={selectedTooth === t} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-2xl border-t border-dashed border-slate-200"></div>

                    <div className="flex flex-col items-center gap-2 w-full max-w-2xl">
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full">
                            <div className="flex gap-1.5 sm:gap-2">
                                {activeLowerLeft.map((t) => (
                                    <ToothSvg key={t} toothId={t} active={selectedTooth === t} />
                                ))}
                            </div>
                            <div className="w-px bg-slate-200 self-stretch my-2"></div>
                            <div className="flex gap-1.5 sm:gap-2">
                                {activeLowerRight.map((t) => (
                                    <ToothSvg key={t} toothId={t} active={selectedTooth === t} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border rounded-xl p-5 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between border-b pb-2">
                        <div className="space-y-0.5">
                            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                                Anomalias e Dentes Supranumerários
                            </h4>
                            <p className="text-[11px] text-slate-400">
                                Utilize esta seção para cadastrar dentes extras, sisos inclusos atípicos ou outras variações anatômicas.
                            </p>
                        </div>
                        <Button
                            onClick={addCustomTooth}
                            size="sm"
                            variant="outline"
                            className="text-xs h-8 px-3 border-indigo-200 bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-300 text-indigo-700 font-semibold gap-1.5"
                        >
                            <Plus className="h-3.5 w-3.5" /> Adicionar Caso Clínico Especial
                        </Button>
                    </div>

                    {customTeeth.length === 0 ? (
                        <div className="text-center py-6 text-xs text-slate-400 font-medium border border-dashed rounded-lg bg-slate-50/50">
                            Nenhum caso clínico especial ou dente supranumerário registrado para este paciente.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                            {customTeeth.map((ct) => {
                                const conf = statusConfig[ct.status || "SAUDAVEL"];
                                const isSelected = selectedCustomToothId === ct.id;
                                return (
                                    <div
                                        key={ct.id}
                                        onClick={() => {
                                            setSelectedCustomToothId(ct.id);
                                            setSelectedTooth(null);
                                        }}
                                        className={cn(
                                            "border rounded-xl p-3 shadow-xs relative flex flex-col gap-1 transition-all cursor-pointer",
                                            isSelected
                                                ? "border-blue-600 bg-blue-50/10"
                                                : "border-slate-100 hover:border-slate-350 bg-white"
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-slate-800">{ct.id}</span>
                                            <div className="flex items-center gap-2">
                                                <span className={cn(
                                                    "px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider",
                                                    conf.bgLight, conf.text
                                                )}>
                                                    {conf.label}
                                                </span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeCustomTooth(ct.id);
                                                    }}
                                                    className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-all"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-[11px] font-semibold text-slate-600 mt-1">{ct.description}</p>
                                        {ct.notes && (
                                            <p className="text-[10px] text-slate-400 mt-0.5 border-t pt-1 border-slate-50 italic">
                                                {ct.notes}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full lg:w-[320px] bg-slate-50 border rounded-md p-5 flex flex-col gap-5 self-stretch shadow-sm">
                {(selectedTooth !== null || selectedCustomToothId !== null) ? (
                    <div className="space-y-4 animate-in fade-in duration-300">
                        <div className="flex items-center justify-between border-b pb-3">
                            <div>
                                <h4 className="font-bold text-slate-800 text-lg">
                                    {selectedTooth !== null ? `Dente #${selectedTooth}` : selectedCustomToothId}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {selectedTooth !== null ? (
                                        selectedTooth <= (dentitionType === "adult" ? 28 : 65) ? "Arcada Superior" : "Arcada Inferior"
                                    ) : (
                                        "Dente Supranumerário / Especial"
                                    )}
                                </p>
                            </div>
                            <Badge className={cn("font-semibold py-1 px-2.5 border rounded-sm", statusConfig[currentSelectedStatus].bgLight, statusConfig[currentSelectedStatus].text)}>
                                {statusConfig[currentSelectedStatus].label}
                            </Badge>
                        </div>

                        {selectedCustomToothId !== null && (
                            <div className="space-y-1.5">
                                <Label htmlFor="customDescription" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nome / Descrição da Anomalia</Label>
                                <Input
                                    id="customDescription"
                                    value={customTeeth.find(ct => ct.id === selectedCustomToothId)?.description || ""}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCustomDescriptionUpdate(e.target.value)}
                                    placeholder="Ex: Mesiodens extra, Siso semi-incluso..."
                                    className="h-8.5 text-xs bg-white focus-visible:ring-1 focus-visible:ring-blue-600 font-semibold"
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Alterar Diagnóstico</Label>
                            <div className="grid grid-cols-1 gap-2">
                                {Object.entries(statusConfig).map(([key, value]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => handleToothStatusUpdate(key as ToothStatus)}
                                        className={cn(
                                            "flex items-center gap-3 p-2.5 rounded-md border text-sm transition-all duration-300 font-semibold cursor-pointer",
                                            currentSelectedStatus === key
                                                ? "bg-white border-blue-600 shadow-sm text-blue-700"
                                                : "bg-white/60 border-slate-100 hover:border-slate-350 text-slate-600"
                                        )}
                                    >
                                        <span className={cn("w-3.5 h-3.5 rounded-full shrink-0 border border-black/5", value.color)}></span>
                                        <span>{value.label}</span>
                                        {currentSelectedStatus === key && (
                                            <Check className="h-4 w-4 text-blue-600 ml-auto" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-1.5 pt-2">
                            <Label htmlFor="toothNotes" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Observações do Prontuário</Label>
                            <textarea
                                id="toothNotes"
                                value={currentSelectedNotes}
                                onChange={(e) => handleToothNoteUpdate(e.target.value)}
                                placeholder="Registre restaurações, cáries ou anomalias..."
                                className="w-full h-24 rounded-md border bg-white p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all placeholder:text-slate-400 resize-none leading-normal font-medium text-slate-700"
                            />
                        </div>

                        <div className="bg-blue-50/50 border border-blue-100 rounded-md p-3 flex gap-2.5">
                            <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                            <p className="text-[10px] text-blue-700 leading-normal">
                                As informações clínicas do odontograma e diagnósticos especiais são armazenadas diretamente no prontuário digital seguro do paciente.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center py-10">
                        <HelpCircle className="h-10 w-10 text-slate-300 mb-2 animate-pulse" />
                        <h5 className="font-semibold text-slate-700 text-sm">Selecione um Dente</h5>
                        <p className="text-xs text-muted-foreground max-w-xs mt-1">
                            Clique em um dente ou no botão de anomalias abaixo para lançar novos diagnósticos clínicos no prontuário.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
