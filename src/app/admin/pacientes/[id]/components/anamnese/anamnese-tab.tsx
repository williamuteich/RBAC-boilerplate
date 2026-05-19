"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
    HeartPulse, 
    AlertTriangle, 
    Pill, 
    ShieldCheck, 
    Activity,
    ClipboardList,
    Save,
    RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AnamneseTabProps {
    patientId: string;
}

interface AnamneseState {
    sobTratamento: boolean;
    tratamentoDetalhes: string;
    medicamentosContinuos: boolean;
    medicamentosDetalhes: string;
    alergias: {
        penicilina: boolean;
        anestesicos: boolean;
        latex: boolean;
        outros: boolean;
        outrosDetalhes: string;
    };
    condicoes: {
        hipertensao: boolean;
        diabetes: boolean;
        cardiaco: boolean;
        marcapasso: boolean;
        sangramento: boolean;
        asma: boolean;
        gestante: boolean;
    };
    observacoesClinicas: string;
}

const defaultAnamnese: AnamneseState = {
    sobTratamento: false,
    tratamentoDetalhes: "",
    medicamentosContinuos: false,
    medicamentosDetalhes: "",
    alergias: {
        penicilina: false,
        anestesicos: false,
        latex: false,
        outros: false,
        outrosDetalhes: "",
    },
    condicoes: {
        hipertensao: false,
        diabetes: false,
        cardiaco: false,
        marcapasso: false,
        sangramento: false,
        asma: false,
        gestante: false,
    },
    observacoesClinicas: "",
};

export default function AnamneseTab({ patientId }: AnamneseTabProps) {
    const [fields, setFields] = useState<AnamneseState>(defaultAnamnese);
    const [isSaving, setIsSaving] = useState(false);

    // Carregar do localStorage na montagem
    useEffect(() => {
        const stored = localStorage.getItem(`anamnese-patient-${patientId}`);
        if (stored) {
            try {
                setFields(JSON.parse(stored));
            } catch (e) {
                console.error("Erro ao carregar anamnese:", e);
            }
        }
    }, [patientId]);

    const handleCheckboxChange = (category: "condicoes" | "alergias", field: string) => {
        setFields(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: !((prev[category] as any)[field])
            }
        }));
    };

    const handleGeneralCheckbox = (field: "sobTratamento" | "medicamentosContinuos") => {
        setFields(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleTextChange = (field: keyof AnamneseState | string, value: string, subCategory?: "alergias") => {
        if (subCategory === "alergias") {
            setFields(prev => ({
                ...prev,
                alergias: {
                    ...prev.alergias,
                    [field]: value
                }
            }));
        } else {
            setFields(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        
        setTimeout(() => {
            try {
                localStorage.setItem(`anamnese-patient-${patientId}`, JSON.stringify(fields));
                toast.success("Ficha de Anamnese & Saúde salva com sucesso!");
            } catch (error) {
                toast.error("Erro ao salvar as informações clínicas.");
            } finally {
                setIsSaving(false);
            }
        }, 600);
    };

    const handleReset = () => {
        if (confirm("Deseja realmente limpar as informações de saúde deste paciente?")) {
            setFields(defaultAnamnese);
            localStorage.removeItem(`anamnese-patient-${patientId}`);
            toast.info("Ficha de Anamnese limpa localmente.");
        }
    };

    // Alertas Críticos Ativos
    const activeAlertsCount = 
        (fields.condicoes.hipertensao ? 1 : 0) +
        (fields.condicoes.cardiaco ? 1 : 0) +
        (fields.condicoes.marcapasso ? 1 : 0) +
        (fields.condicoes.sangramento ? 1 : 0) +
        (fields.alergias.anestesicos ? 1 : 0) +
        (fields.alergias.penicilina ? 1 : 0);

    return (
        <form onSubmit={handleSave} className="space-y-8 w-full animate-in fade-in duration-500">
            <ToastContainer position="top-right" autoClose={3000} theme="colored" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                        <HeartPulse className="h-5 w-5 text-rose-600" />
                        Histórico Médico & Anamnese Clínica
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        Ficha de triagem e fatores de risco sistêmicos essenciais para intervenções cirúrgicas e anestésicas.
                    </p>
                </div>

                {activeAlertsCount > 0 && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-1.5 rounded-md flex items-center gap-2 text-xs font-bold shrink-0 animate-bounce">
                        <AlertTriangle className="h-4 w-4 text-rose-600" />
                        {activeAlertsCount} {activeAlertsCount === 1 ? "ALERTA CRÍTICO ATIVO" : "ALERTAS CRÍTICOS ATIVOS"}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Coluna 1: Condições Sistêmicas */}
                <div className="bg-white border rounded-xl p-5 space-y-5 shadow-xs hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 border-b pb-3 text-slate-800 font-bold text-sm uppercase tracking-wide">
                        <HeartPulse className="h-4 w-4 text-rose-500" />
                        Doenças Sistêmicas & Condições
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">Marque todas as condições médicas diagnosticadas do paciente.</p>
                    
                    <div className="space-y-3.5 pt-2">
                        {[
                            { id: "hipertensao", label: "Hipertensão Arterial", critical: true },
                            { id: "diabetes", label: "Diabetes Mellitus", critical: false },
                            { id: "cardiaco", label: "Problemas Cardíacos", critical: true },
                            { id: "marcapasso", label: "Portador de Marcapasso", critical: true },
                            { id: "sangramento", label: "Histórico de Sangramento / Hemofilia", critical: true },
                            { id: "asma", label: "Asma ou Dificuldade Respiratória", critical: false },
                            { id: "gestante", label: "Gestante (Gravidez ativa)", critical: false },
                        ].map((cond) => (
                            <div 
                                key={cond.id} 
                                onClick={() => handleCheckboxChange("condicoes", cond.id)}
                                className={cn(
                                    "flex items-center gap-3 p-3 rounded-lg border text-xs font-bold transition-all cursor-pointer select-none",
                                    (fields.condicoes as any)[cond.id]
                                        ? cond.critical 
                                            ? "bg-rose-50/50 border-rose-300 text-rose-700 shadow-xs"
                                            : "bg-amber-50/50 border-amber-300 text-amber-800 shadow-xs"
                                        : "bg-slate-50/40 border-slate-100 hover:border-slate-200 text-slate-600 hover:bg-slate-50"
                                )}
                            >
                                <input
                                    type="checkbox"
                                    checked={(fields.condicoes as any)[cond.id]}
                                    onChange={() => {}} // Tratado no clique do container
                                    className={cn(
                                        "h-4.5 w-4.5 rounded border-slate-300 focus:ring-offset-0 shrink-0 pointer-events-none",
                                        cond.critical ? "text-rose-600 focus:ring-rose-500" : "text-amber-600 focus:ring-amber-500"
                                    )}
                                />
                                <span>{cond.label}</span>
                                {(fields.condicoes as any)[cond.id] && cond.critical && (
                                    <span className="text-[9px] bg-rose-200/60 border border-rose-200 text-rose-700 px-1.5 py-0.5 rounded ml-auto">Risco</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Coluna 2: Alergias & Reações */}
                <div className="bg-white border rounded-xl p-5 space-y-5 shadow-xs hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 border-b pb-3 text-slate-800 font-bold text-sm uppercase tracking-wide">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        Alergias & Hipersensibilidade
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">Identifique todas as substâncias que provocam alergia no paciente.</p>
                    
                    <div className="space-y-3.5 pt-2">
                        {[
                            { id: "penicilina", label: "Alergia a Penicilina / Amoxicilina", critical: true },
                            { id: "anestesicos", label: "Alergia a Anestésicos Odontológicos", critical: true },
                            { id: "latex", label: "Alergia a Látex / Borracha", critical: false },
                        ].map((alergia) => (
                            <div 
                                key={alergia.id} 
                                onClick={() => handleCheckboxChange("alergias", alergia.id)}
                                className={cn(
                                    "flex items-center gap-3 p-3 rounded-lg border text-xs font-bold transition-all cursor-pointer select-none",
                                    (fields.alergias as any)[alergia.id]
                                        ? alergia.critical 
                                            ? "bg-rose-50/50 border-rose-300 text-rose-700 shadow-xs"
                                            : "bg-amber-50/50 border-amber-300 text-amber-800 shadow-xs"
                                        : "bg-slate-50/40 border-slate-100 hover:border-slate-200 text-slate-600 hover:bg-slate-50"
                                )}
                            >
                                <input
                                    type="checkbox"
                                    checked={(fields.alergias as any)[alergia.id]}
                                    onChange={() => {}}
                                    className="h-4.5 w-4.5 rounded border-slate-300 text-rose-600 focus:ring-rose-500 shrink-0 pointer-events-none"
                                />
                                <span>{alergia.label}</span>
                            </div>
                        ))}

                        <div 
                            onClick={() => handleCheckboxChange("alergias", "outros")}
                            className={cn(
                                "flex items-center gap-3 p-3 rounded-lg border text-xs font-bold transition-all cursor-pointer select-none",
                                fields.alergias.outros
                                    ? "bg-amber-50/50 border-amber-300 text-amber-800"
                                    : "bg-slate-50/40 border-slate-100 hover:border-slate-200 text-slate-600 hover:bg-slate-50"
                            )}
                        >
                            <input
                                type="checkbox"
                                checked={fields.alergias.outros}
                                onChange={() => {}}
                                className="h-4.5 w-4.5 rounded border-slate-300 text-amber-600 focus:ring-amber-500 shrink-0 pointer-events-none"
                            />
                            <span>Outras Alergias</span>
                        </div>

                        {fields.alergias.outros && (
                            <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300 pl-1">
                                <Label htmlFor="outrosDetalhes" className="text-[10px] font-bold text-slate-400 uppercase">Quais alergias adicionais?</Label>
                                <Input
                                    id="outrosDetalhes"
                                    value={fields.alergias.outrosDetalhes}
                                    onChange={(e) => handleTextChange("outrosDetalhes", e.target.value, "alergias")}
                                    placeholder="Ex: Anti-inflamatórios, Ibuprofeno..."
                                    className="h-9 text-xs rounded-md bg-white border-slate-200 focus:ring-amber-500 focus:border-transparent"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Coluna 3: Tratamentos & Medicamentos */}
                <div className="bg-white border rounded-xl p-5 space-y-5 shadow-xs hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 border-b pb-3 text-slate-800 font-bold text-sm uppercase tracking-wide">
                        <Pill className="h-4 w-4 text-blue-500" />
                        Histórico de Uso Continuo
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">Insira informações sobre acompanhamentos médicos atuais.</p>
                    
                    <div className="space-y-5 pt-2">
                        {/* Tratamento Médico */}
                        <div className="space-y-3">
                            <div 
                                onClick={() => handleGeneralCheckbox("sobTratamento")}
                                className={cn(
                                    "flex items-center gap-3 p-3 rounded-lg border text-xs font-bold transition-all cursor-pointer select-none",
                                    fields.sobTratamento
                                        ? "bg-blue-50/50 border-blue-300 text-blue-800"
                                        : "bg-slate-50/40 border-slate-100 hover:border-slate-200 text-slate-600 hover:bg-slate-50"
                                )}
                            >
                                <input
                                    type="checkbox"
                                    checked={fields.sobTratamento}
                                    onChange={() => {}}
                                    className="h-4.5 w-4.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 shrink-0 pointer-events-none"
                                />
                                <span>Sob Tratamento Médico Atualmente</span>
                            </div>

                            {fields.sobTratamento && (
                                <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
                                    <Label htmlFor="tratamentoDetalhes" className="text-[10px] font-bold text-slate-400 uppercase">Qual o motivo / especialista?</Label>
                                    <textarea
                                        id="tratamentoDetalhes"
                                        value={fields.tratamentoDetalhes}
                                        onChange={(e) => handleTextChange("tratamentoDetalhes", e.target.value)}
                                        placeholder="Ex: Tratamento oncológico, ortopédico, depressão..."
                                        rows={2}
                                        className="w-full rounded-md border border-slate-200 bg-white p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none leading-normal placeholder:text-slate-400"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Medicamentos */}
                        <div className="space-y-3">
                            <div 
                                onClick={() => handleGeneralCheckbox("medicamentosContinuos")}
                                className={cn(
                                    "flex items-center gap-3 p-3 rounded-lg border text-xs font-bold transition-all cursor-pointer select-none",
                                    fields.medicamentosContinuos
                                        ? "bg-blue-50/50 border-blue-300 text-blue-800"
                                        : "bg-slate-50/40 border-slate-100 hover:border-slate-200 text-slate-600 hover:bg-slate-50"
                                )}
                            >
                                <input
                                    type="checkbox"
                                    checked={fields.medicamentosContinuos}
                                    onChange={() => {}}
                                    className="h-4.5 w-4.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 shrink-0 pointer-events-none"
                                />
                                <span>Uso de Medicamentos de Uso Contínuo</span>
                            </div>

                            {fields.medicamentosContinuos && (
                                <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
                                    <Label htmlFor="medicamentosDetalhes" className="text-[10px] font-bold text-slate-400 uppercase">Quais medicamentos e dosagem?</Label>
                                    <textarea
                                        id="medicamentosDetalhes"
                                        value={fields.medicamentosDetalhes}
                                        onChange={(e) => handleTextChange("medicamentosDetalhes", e.target.value)}
                                        placeholder="Ex: AAS, Anticoagulantes, Antidepressivos, Insulina..."
                                        rows={2}
                                        className="w-full rounded-md border border-slate-200 bg-white p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none leading-normal placeholder:text-slate-400"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Seção 4: Observações Clínicas Adicionais */}
            <div className="bg-slate-50/50 border rounded-xl p-5 space-y-3 w-full shadow-inner">
                <Label htmlFor="observacoesClinicas" className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <ClipboardList className="h-4 w-4 text-slate-600" />
                    Observações e Anotações Odontológicas Importantes
                </Label>
                <textarea
                    id="observacoesClinicas"
                    value={fields.observacoesClinicas}
                    onChange={(e) => handleTextChange("observacoesClinicas", e.target.value)}
                    placeholder="Descreva restrições especiais, indicações do médico do paciente, recomendações anestésicas, observações de comportamento ou pânico, etc."
                    rows={4}
                    className="w-full rounded-lg border border-slate-200 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all placeholder:text-slate-400 leading-relaxed"
                />
                
                <div className="flex gap-2.5 bg-rose-50/60 border border-rose-100/60 rounded-md p-3.5 mt-2">
                    <ShieldCheck className="h-5 w-5 text-rose-600 shrink-0 mt-0.5 animate-pulse" />
                    <div className="text-[11px] text-rose-800 leading-normal font-semibold">
                        Atenção Profissional: Esta ficha deve ser revisada a cada nova consulta clínica antes de qualquer anestesia ou procedimento cirúrgico.
                    </div>
                </div>
            </div>

            {/* Ações de Formulário */}
            <div className="border-t pt-6 flex items-center justify-between w-full">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={handleReset}
                    className="text-slate-500 hover:text-slate-700 hover:bg-slate-100 h-10 px-4 rounded-md text-xs font-bold flex items-center gap-2 cursor-pointer"
                >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Limpar Ficha
                </Button>
                
                <Button
                    type="submit"
                    disabled={isSaving}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold h-11 px-6 rounded-md shadow-md shadow-rose-200 flex items-center gap-2 min-w-[170px] justify-center cursor-pointer"
                >
                    {isSaving ? (
                        <>
                            <Activity className="h-4 w-4 animate-spin" />
                            <span>Salvando Ficha...</span>
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4" />
                            <span>Salvar Anamnese</span>
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}
