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
                nomeCompleto: formData.get("nomeCompleto") as string,
                cpf: formData.get("cpf") as string,
                dataNascimento: formData.get("dataNascimento") as string,
                telefone: formData.get("telefone") as string,
                cep: formData.get("cep") as string,
                estado: formData.get("estado") as string,
                cidade: formData.get("cidade") as string,
                rua: formData.get("rua") as string,
                numero: formData.get("numero") as string,
                complemento: (formData.get("complemento") as string) || null,
                ativo: formData.get("ativo") === "on",
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

    const calcIdade = (dataNascimento: string) => {
        if (!dataNascimento) return 0;
        const hoje = new Date();
        const nasc = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nasc.getFullYear();
        const m = hoje.getMonth() - nasc.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
        return idade;
    };

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
                <div className="bg-linear-to-br from-blue-500/10 to-indigo-500/5 border border-blue-100 rounded-md p-4 flex items-center gap-4 shadow-sm">
                    <div className="w-10 h-10 rounded-md bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0">
                        <User className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-medium">Idade / CPF</p>
                        <p className="text-sm font-semibold text-slate-800 mt-0.5">
                            {calcIdade(paciente.dataNascimento)} anos
                        </p>
                        <p className="text-xs text-slate-500 font-mono">{paciente.cpf}</p>
                    </div>
                </div>

                <div className="bg-linear-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-100 rounded-md p-4 flex items-center gap-4 shadow-sm">
                    <div className="w-10 h-10 rounded-md bg-emerald-600/10 flex items-center justify-center text-emerald-600 shrink-0">
                        <HeartPulse className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-medium">Status do Prontuário</p>
                        <Badge className="bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border-emerald-200 mt-1 font-semibold rounded-sm">
                            Ativo & Estável
                        </Badge>
                    </div>
                </div>

                <div className="bg-linear-to-br from-amber-500/10 to-orange-500/5 border border-amber-100 rounded-md p-4 flex items-center gap-4 shadow-sm">
                    <div className="w-10 h-10 rounded-md bg-amber-600/10 flex items-center justify-center text-amber-600 shrink-0">
                        <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-medium">Próxima Consulta</p>
                        <p className="text-sm font-semibold text-slate-800 mt-0.5">28 Mai 2026, às 14:00</p>
                        <p className="text-xs text-slate-500">Limpeza & Profilaxia</p>
                    </div>
                </div>

                <div className="bg-linear-to-br from-purple-500/10 to-pink-500/5 border border-purple-100 rounded-md p-4 flex items-center gap-4 shadow-sm">
                    <div className="w-10 h-10 rounded-md bg-purple-600/10 flex items-center justify-center text-purple-600 shrink-0">
                        <DollarSign className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-medium">Planos & Orçamentos</p>
                        <p className="text-sm font-semibold text-slate-800 mt-0.5">R$ 2.450,00</p>
                        <p className="text-xs text-emerald-600 font-medium">R$ 1.200,00 pago</p>
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
