"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
    User, Calendar, DollarSign, Stethoscope, Activity, HeartPulse
} from "lucide-react";
import { Paciente, ToothInfo, ToothStatus } from "@/src/types/dashboard/pacientes";
import { updatePaciente } from "@/src/services/pacientes";
import { cn } from "@/lib/utils";

import OdontogramaTab from "./odontograma-tab";
import EvolucaoTab from "./evolucao-tab";
import AgendamentosTab from "./agendamentos-tab";
import FinanceiroTab from "./financeiro-tab";
import CadastroTab from "./cadastro-tab";

const initialAppointments = [
    { id: 1, date: "2026-05-28", time: "14:00", type: "Limpeza & Profilaxia", doctor: "Dra. Letícia Uteich", status: "Confirmado", price: "R$ 220,00" },
    { id: 2, date: "2026-06-15", time: "10:30", type: "Restauração Resina (Dente 14)", doctor: "Dr. William Uteich", status: "Agendado", price: "R$ 350,00" },
    { id: 3, date: "2026-04-10", time: "09:00", type: "Avaliação Geral", doctor: "Dra. Letícia Uteich", status: "Realizado", price: "R$ 150,00" },
];

const initialEvolution = [
    { id: 1, date: "2026-05-19", text: "Paciente relatou leve sensibilidade ao frio no quadrante superior direito. Realizado teste de sensibilidade térmica.", author: "Dr. William Uteich" },
    { id: 2, date: "2026-04-10", text: "Remoção de cárie oclusal profunda no dente 16 com posterior forramento de hidróxido de cálcio e restauração provisória.", author: "Dra. Letícia Uteich" },
    { id: 3, date: "2026-03-05", text: "Início do tratamento periodontal básico. Raspagem supra e subgengival realizada com ultrassom e curetas.", author: "Dr. William Uteich" },
];

const initialBudgets = [
    { id: 1, title: "Plano de Tratamento Estético", total: "R$ 2.450,00", paid: "R$ 1.200,00", date: "10/05/2026", status: "Em Execução" },
    { id: 2, title: "Tratamento de Canal & Coroa dente 36", total: "R$ 1.800,00", paid: "R$ 1.800,00", date: "05/03/2026", status: "Concluído" },
];

const upperTeethRight = [18, 17, 16, 15, 14, 13, 12, 11];
const upperTeethLeft = [21, 22, 23, 24, 25, 26, 27, 28];
const lowerTeethLeft = [38, 37, 36, 35, 34, 33, 32, 31];
const lowerTeethRight = [41, 42, 43, 44, 45, 46, 47, 48];

export default function ProntuarioOdontologico({ paciente }: { paciente: Paciente }) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"odontograma" | "cadastro" | "evolucao" | "agendamentos" | "financeiro">("odontograma");
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const [evolution, setEvolution] = useState(initialEvolution);
    const [newEvolutionText, setNewEvolutionText] = useState("");

    const [teeth, setTeeth] = useState<Record<number, ToothInfo>>(() => {
        const initial: Record<number, ToothInfo> = {};
        const allTeeth = [...upperTeethRight, ...upperTeethLeft, ...lowerTeethLeft, ...lowerTeethRight];
        allTeeth.forEach(t => {
            let status: ToothStatus = "healthy";
            let notes = "";
            if (t === 16) { status = "cavity"; notes = "Cárie oclusal detectada"; }
            else if (t === 14) { status = "restored"; notes = "Restauração de resina oclusal realizada"; }
            else if (t === 36) { status = "extracted"; notes = "Implante osseointegrado instalado em 2024"; }
            else if (t === 38 || t === 48) { status = "missing"; notes = "Dente do siso não erupcionado / ausente"; }
            initial[t] = { id: t, status, notes };
        });
        return initial;
    });

    const [selectedTooth, setSelectedTooth] = useState<number | null>(16);

    const handleToothStatusUpdate = (status: ToothStatus) => {
        if (selectedTooth === null) return;
        setTeeth(prev => ({
            ...prev,
            [selectedTooth]: {
                ...prev[selectedTooth],
                status
            }
        }));
    };

    const handleToothNoteUpdate = (notes: string) => {
        if (selectedTooth === null) return;
        setTeeth(prev => ({
            ...prev,
            [selectedTooth]: {
                ...prev[selectedTooth],
                notes
            }
        }));
    };

    const handleAddEvolution = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEvolutionText.trim()) return;

        const newEvent = {
            id: Date.now(),
            date: new Date().toISOString().split("T")[0],
            text: newEvolutionText,
            author: "Dr. William Uteich"
        };

        setEvolution([newEvent, ...evolution]);
        setNewEvolutionText("");
    };

    const handleCadastroSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const payload: Partial<Paciente> = {
                name: formData.get("name") as string,
                cpf: formData.get("cpf") as string,
                birthDate: formData.get("birthDate") as string,
                phone: formData.get("phone") as string,
                zipCode: formData.get("zipCode") as string,
                state: formData.get("state") as string,
                city: formData.get("city") as string,
                street: formData.get("street") as string,
                number: formData.get("number") as string,
                complement: (formData.get("complement") as string) || null,
                active: formData.get("active") === "on",
            };

            const res = await updatePaciente(paciente.id, payload);

            if (res.success) {
                setSuccess(true);
                router.refresh();
                setTimeout(() => setSuccess(false), 4500);
            } else {
                setError(res.error || "Erro ao salvar alterações");
            }
        });
    };

    const calcIdade = (birthDate: string) => {
        if (!birthDate) return 0;
        const hoje = new Date();
        const nasc = new Date(birthDate);
        let idade = hoje.getFullYear() - nasc.getFullYear();
        const m = hoje.getMonth() - nasc.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
        return idade;
    };

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
                <div className="bg-white border border-slate-200/80 rounded-sm p-4 flex items-center gap-3.5 shadow-xs transition-all hover:border-slate-300">
                    <div className="w-9 h-9 rounded-sm bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                        <User className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Idade / CPF</p>
                        <p className="text-sm font-bold text-slate-800 mt-0.5 truncate">
                            {calcIdade(paciente.birthDate)} anos
                        </p>
                        <p className="text-[11px] font-semibold text-slate-500 font-mono mt-px">{paciente.cpf}</p>
                    </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-sm p-4 flex items-center gap-3.5 shadow-xs transition-all hover:border-slate-300">
                    <div className="w-9 h-9 rounded-sm bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                        <HeartPulse className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status do Prontuário</p>
                        <div className="mt-1 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse"></span>
                            <span className="text-xs font-bold text-slate-700">Ativo & Estável</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-sm p-4 flex items-center gap-3.5 shadow-xs transition-all hover:border-slate-300">
                    <div className="w-9 h-9 rounded-sm bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                        <Calendar className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Próxima Consulta</p>
                        <p className="text-sm font-bold text-slate-800 mt-0.5 truncate">28 Mai 2026 • 14:00</p>
                        <p className="text-[11px] font-semibold text-slate-500 mt-px truncate">Limpeza & Profilaxia</p>
                    </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-sm p-4 flex items-center gap-3.5 shadow-xs transition-all hover:border-slate-300">
                    <div className="w-9 h-9 rounded-sm bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                        <DollarSign className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Planos & Orçamentos</p>
                        <p className="text-sm font-bold text-slate-800 mt-0.5">R$ 2.450,00</p>
                        <p className="text-[11px] font-semibold text-emerald-600 mt-px">R$ 1.200,00 pago</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-1 border-b pb-px w-full mt-2">
                <button
                    type="button"
                    onClick={() => setActiveTab("odontograma")}
                    className={cn(
                        "px-3.5 py-2 rounded-t-md text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 relative",
                        activeTab === "odontograma"
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-50"
                    )}
                >
                    <Stethoscope className="h-4 w-4" />
                    Odontograma Interativo 3D
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("evolucao")}
                    className={cn(
                        "px-3.5 py-2 rounded-t-md text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 relative",
                        activeTab === "evolucao"
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-50"
                    )}
                >
                    <Activity className="h-4 w-4" />
                    Evolução & Procedimentos
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("agendamentos")}
                    className={cn(
                        "px-3.5 py-2 rounded-t-md text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 relative",
                        activeTab === "agendamentos"
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-50"
                    )}
                >
                    <Calendar className="h-4 w-4" />
                    Agendamentos
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("financeiro")}
                    className={cn(
                        "px-3.5 py-2 rounded-t-md text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 relative",
                        activeTab === "financeiro"
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-50"
                    )}
                >
                    <DollarSign className="h-4 w-4" />
                    Orçamentos & Tratamentos
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("cadastro")}
                    className={cn(
                        "px-3.5 py-2 rounded-t-md text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 relative",
                        activeTab === "cadastro"
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-50"
                    )}
                >
                    <User className="h-4 w-4" />
                    Ficha Cadastral
                </button>
            </div>

            <div className="w-full bg-white rounded-md border p-4 sm:p-6 shadow-sm">
                {activeTab === "odontograma" && (
                    <OdontogramaTab
                        teeth={teeth}
                        selectedTooth={selectedTooth}
                        setSelectedTooth={setSelectedTooth}
                        onStatusUpdate={handleToothStatusUpdate}
                        onNoteUpdate={handleToothNoteUpdate}
                    />
                )}

                {activeTab === "evolucao" && (
                    <EvolucaoTab
                        evolution={evolution}
                        newEvolutionText={newEvolutionText}
                        onTextChange={setNewEvolutionText}
                        onSubmit={handleAddEvolution}
                    />
                )}

                {activeTab === "agendamentos" && (
                    <AgendamentosTab
                        appointments={initialAppointments}
                    />
                )}

                {activeTab === "financeiro" && (
                    <FinanceiroTab
                        budgets={initialBudgets}
                    />
                )}

                {activeTab === "cadastro" && (
                    <CadastroTab
                        paciente={paciente}
                        onSubmit={handleCadastroSubmit}
                        isPending={isPending}
                        success={success}
                        error={error}
                    />
                )}
            </div>
        </div>
    );
}
