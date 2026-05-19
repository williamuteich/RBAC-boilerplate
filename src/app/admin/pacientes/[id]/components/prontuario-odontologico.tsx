"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Loader2, User, Phone, MapPin, CalendarDays, Save, CheckCircle, AlertCircle,
    Activity, Calendar, DollarSign, Stethoscope, ChevronRight, Plus, HelpCircle,
    Info, Clock, Check, FileSpreadsheet, HeartPulse
} from "lucide-react";
import { Paciente } from "@/src/types/dashboard/pacientes";
import { updatePaciente } from "@/src/services/pacientes";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock data for premium frontend demo
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

// 32 adult teeth definitions with clinical nomenclature
const upperTeethRight = [18, 17, 16, 15, 14, 13, 12, 11];
const upperTeethLeft = [21, 22, 23, 24, 25, 26, 27, 28];
const lowerTeethLeft = [38, 37, 36, 35, 34, 33, 32, 31];
const lowerTeethRight = [41, 42, 43, 44, 45, 46, 47, 48];

type ToothStatus = "healthy" | "cavity" | "restored" | "extracted" | "missing";

interface ToothInfo {
    id: number;
    status: ToothStatus;
    notes: string;
}

const statusConfig = {
    healthy: { label: "Saudável", color: "bg-emerald-500", border: "border-emerald-500", text: "text-emerald-700", bgLight: "bg-emerald-50/60" },
    cavity: { label: "Cárie / Canal", color: "bg-rose-500", border: "border-rose-500", text: "text-rose-700", bgLight: "bg-rose-50/60" },
    restored: { label: "Restaurado", color: "bg-blue-500", border: "border-blue-500", text: "text-blue-700", bgLight: "bg-blue-50/60" },
    extracted: { label: "Implante", color: "bg-amber-500", border: "border-amber-500", text: "text-amber-700", bgLight: "bg-amber-50/60" },
    missing: { label: "Ausente", color: "bg-slate-400", border: "border-slate-400", text: "text-slate-700", bgLight: "bg-slate-50" },
};

export default function ProntuarioOdontologico({ paciente }: { paciente: Paciente }) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"odontograma" | "cadastro" | "evolucao" | "agendamentos" | "financeiro">("odontograma");
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // Evolution notes list
    const [evolution, setEvolution] = useState(initialEvolution);
    const [newEvolutionText, setNewEvolutionText] = useState("");

    // Odontograma interactive teeth state
    const [teeth, setTeeth] = useState<Record<number, ToothInfo>>(() => {
        const initial: Record<number, ToothInfo> = {};
        const allTeeth = [...upperTeethRight, ...upperTeethLeft, ...lowerTeethLeft, ...lowerTeethRight];
        allTeeth.forEach(t => {
            // Mock some initial issues for visual richness
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

    // CEP auto-fill variables
    const [cepLoading, setCepLoading] = useState(false);
    const [addressFields, setAddressFields] = useState({
        estado: paciente.estado || "",
        cidade: paciente.cidade || "",
        rua: paciente.rua || "",
    });

    // Form masks
    const [masks, setMasks] = useState({
        cpf: paciente.cpf || "",
        telefone: paciente.telefone || "",
        cep: paciente.cep || "",
    });

    const maskCPF = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
    };

    const maskPhone = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4,5})(\d{4})$/, "$1-$2");
    };

    const maskCEP = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{3})\d+?$/, "$1");
    };

    const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (!val) return;
        setCepLoading(true);
        try {
            const clean = val.replace(/\D/g, "");
            if (clean.length === 8) {
                const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
                const data = await res.json();
                if (!data.erro) {
                    setAddressFields({
                        estado: data.uf,
                        cidade: data.localidade,
                        rua: data.logradouro,
                    });
                }
            }
        } catch {}
        setCepLoading(false);
    };

    const handleMaskChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        maskFn: (val: string) => string,
        field: keyof typeof masks
    ) => {
        setMasks((prev) => ({ ...prev, [field]: maskFn(e.target.value) }));
    };

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
            author: "Dr. William Uteich" // Mock current user
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

    // Age calculator helper
    const calcIdade = (dataNascimento: string) => {
        if (!dataNascimento) return 0;
        const hoje = new Date();
        const nasc = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nasc.getFullYear();
        const m = hoje.getMonth() - nasc.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
        return idade;
    };

    // Tooth rendering component (SVG 3D styled vector)
    const ToothSvg = ({ toothId, active }: { toothId: number; active: boolean }) => {
        const info = teeth[toothId];
        const conf = statusConfig[info?.status || "healthy"];

        // Determine color gradients and effects based on status
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
                    {/* Visual tooth modeling - sophisticated 3D look */}
                    <path
                        d="M 25,20 C 25,10 75,10 75,20 C 80,35 85,60 70,80 C 65,85 55,90 50,95 C 45,90 35,85 30,80 C 15,60 20,35 25,20 Z"
                        className={cn("stroke-2 transition-all duration-300", fillColor)}
                    />
                    {/* Crown details */}
                    <path
                        d="M 35,35 Q 50,55 65,35"
                        fill="none"
                        className={cn("stroke-2 opacity-50", info?.status === "missing" ? "stroke-slate-400" : "stroke-current")}
                    />
                    {/* Center fissure lines */}
                    <path
                        d="M 50,20 L 50,60"
                        fill="none"
                        className={cn("stroke-1 opacity-40", info?.status === "missing" ? "stroke-slate-400" : "stroke-current")}
                    />
                </svg>
                {/* Visual indicator small dot */}
                <span className={cn("w-2 h-2 rounded-full mt-2", conf.color)}></span>
            </button>
        );
    };

    return (
        <div className="w-full flex flex-col gap-6">
            {/* Quick stats grid overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-blue-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                        <User className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-medium">Idade / CPF</p>
                        <p className="text-sm font-semibold text-slate-800 mt-0.5">
                            {calcIdade(paciente.dataNascimento)} anos
                        </p>
                        <p className="text-xs text-slate-500 font-mono">{paciente.cpf}</p>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-600">
                        <HeartPulse className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-medium">Status do Prontuário</p>
                        <Badge className="bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border-emerald-200 mt-1 font-semibold">
                            Ativo & Estável
                        </Badge>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-amber-600/10 flex items-center justify-center text-amber-600">
                        <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-medium">Próxima Consulta</p>
                        <p className="text-sm font-semibold text-slate-800 mt-0.5">28 Mai 2026, às 14:00</p>
                        <p className="text-xs text-slate-500">Limpeza & Profilaxia</p>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-600">
                        <DollarSign className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-medium">Planos & Orçamentos</p>
                        <p className="text-sm font-semibold text-slate-800 mt-0.5">R$ 2.450,00</p>
                        <p className="text-xs text-emerald-600 font-medium">R$ 1.200,00 pago</p>
                    </div>
                </div>
            </div>

            {/* Custom Premium Tabs */}
            <div className="flex flex-wrap gap-2 border-b pb-1 w-full mt-2">
                <button
                    type="button"
                    onClick={() => setActiveTab("odontograma")}
                    className={cn(
                        "px-4 py-2.5 rounded-t-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 relative",
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
                        "px-4 py-2.5 rounded-t-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 relative",
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
                        "px-4 py-2.5 rounded-t-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 relative",
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
                        "px-4 py-2.5 rounded-t-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 relative",
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
                        "px-4 py-2.5 rounded-t-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 relative",
                        activeTab === "cadastro"
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-50"
                    )}
                >
                    <User className="h-4 w-4" />
                    Ficha Cadastral
                </button>
            </div>

            {/* Content box based on activeTab */}
            <div className="w-full bg-white rounded-2xl border p-6 md:p-8 shadow-sm">
                {activeTab === "odontograma" && (
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

                            {/* Dental Arch Map container (Sophisticated graphical representation) */}
                            <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center gap-10 select-none shadow-inner min-h-[350px] relative overflow-hidden">
                                <div className="absolute top-3 left-4 text-xs font-semibold text-slate-400 tracking-wider">SUPERIOR (ARCADA SUPERIOR)</div>
                                <div className="absolute bottom-3 left-4 text-xs font-semibold text-slate-400 tracking-wider">INFERIOR (ARCADA INFERIOR)</div>

                                {/* ARCADA SUPERIOR */}
                                <div className="flex flex-col items-center gap-2 w-full max-w-2xl">
                                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full">
                                        {/* Upper Right Quadrant */}
                                        <div className="flex gap-1.5 sm:gap-2">
                                            {upperTeethRight.map((t) => (
                                                <ToothSvg key={t} toothId={t} active={selectedTooth === t} />
                                            ))}
                                        </div>
                                        {/* Divider */}
                                        <div className="w-[1px] bg-slate-300 self-stretch my-2"></div>
                                        {/* Upper Left Quadrant */}
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
                                        {/* Lower Left Quadrant */}
                                        <div className="flex gap-1.5 sm:gap-2">
                                            {lowerTeethLeft.map((t) => (
                                                <ToothSvg key={t} toothId={t} active={selectedTooth === t} />
                                            ))}
                                        </div>
                                        {/* Divider */}
                                        <div className="w-[1px] bg-slate-300 self-stretch my-2"></div>
                                        {/* Lower Right Quadrant */}
                                        <div className="flex gap-1.5 sm:gap-2">
                                            {lowerTeethRight.map((t) => (
                                                <ToothSvg key={t} toothId={t} active={selectedTooth === t} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Visual Legend for Mobile */}
                            <div className="flex sm:hidden flex-wrap justify-center gap-2 pt-2">
                                {Object.entries(statusConfig).map(([key, value]) => (
                                    <div key={key} className="flex items-center gap-1 text-[11px] bg-slate-50 border px-2 py-1 rounded-lg">
                                        <span className={cn("w-2 h-2 rounded-full", value.color)}></span>
                                        <span className="text-slate-600">{value.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tooth details pane (updates in real-time) */}
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
                                                    onClick={() => handleToothStatusUpdate(key as ToothStatus)}
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

                                    {/* Tooth specific notes */}
                                    <div className="space-y-1.5 pt-2">
                                        <Label htmlFor="toothNotes" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Anotações Clínicas</Label>
                                        <textarea
                                            id="toothNotes"
                                            value={teeth[selectedTooth]?.notes || ""}
                                            onChange={(e) => handleToothNoteUpdate(e.target.value)}
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
                )}

                {activeTab === "evolucao" && (
                    <div className="space-y-6 w-full">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                <Activity className="h-5 w-5 text-blue-600" />
                                Evolução Clínica & Procedimentos
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                Histórico detalhado de evoluções, queixas e tratamentos realizados ao longo do tempo.
                            </p>
                        </div>

                        {/* Add New Evolution Field */}
                        <form onSubmit={handleAddEvolution} className="bg-slate-50 border rounded-2xl p-4 flex flex-col gap-3">
                            <Label htmlFor="evolText" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nova Evolução Clínica</Label>
                            <div className="flex gap-3">
                                <Input
                                    id="evolText"
                                    value={newEvolutionText}
                                    onChange={(e) => setNewEvolutionText(e.target.value)}
                                    placeholder="Ex: Realizada profilaxia completa com jato de bicarbonato e aplicação tópica de flúor..."
                                    className="bg-white h-11"
                                />
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 h-11 px-5 shrink-0 flex items-center gap-2">
                                    <Plus className="h-4 w-4" /> Gravar
                                </Button>
                            </div>
                        </form>

                        {/* Timeline */}
                        <div className="relative border-l border-slate-200 ml-4 pl-6 space-y-6 pt-2">
                            {evolution.map((item) => (
                                <div key={item.id} className="relative animate-in fade-in duration-500">
                                    {/* Timeline bullet indicator */}
                                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm ring-1 ring-slate-200"></div>

                                    <div className="bg-slate-50/50 border hover:border-slate-200 hover:bg-white rounded-xl p-4 transition-all duration-300">
                                        <div className="flex items-center justify-between gap-4 border-b pb-2 mb-2">
                                            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                                                <CalendarDays className="h-3.5 w-3.5" />
                                                {new Date(item.date).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}
                                            </span>
                                            <Badge variant="outline" className="bg-blue-50/50 text-blue-700 border-blue-100 font-medium">
                                                {item.author}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-slate-700 leading-relaxed">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "agendamentos" && (
                    <div className="space-y-6 w-full">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-blue-600" />
                                    Histórico de Agendamentos & Consultas
                                </h3>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Agenda de consultas futuras e histórico de visitas anteriores do paciente.
                                </p>
                            </div>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs h-9">
                                <Plus className="mr-1 h-3.5 w-3.5" /> Novo Agendamento
                            </Button>
                        </div>

                        {/* List grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {initialAppointments.map((appt) => (
                                <div
                                    key={appt.id}
                                    className="bg-slate-50/50 border hover:border-slate-300 hover:bg-white rounded-2xl p-5 transition-all duration-300 flex flex-col gap-4 shadow-sm"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <Badge
                                                className={cn(
                                                    "font-medium",
                                                    appt.status === "Confirmado"
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                                        : appt.status === "Agendado"
                                                        ? "bg-blue-50 text-blue-700 border-blue-100"
                                                        : "bg-slate-100 text-slate-700 border-slate-200"
                                                )}
                                            >
                                                {appt.status}
                                            </Badge>
                                            <h4 className="font-bold text-slate-800 text-base pt-1">{appt.type}</h4>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-semibold text-slate-500 flex items-center gap-1 justify-end">
                                                <Clock className="h-3.5 w-3.5" />
                                                {appt.time}
                                            </p>
                                            <p className="text-[11px] text-slate-400 mt-0.5">
                                                {new Date(appt.date).toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="border-t pt-3 flex justify-between items-center text-xs">
                                        <div>
                                            <span className="text-slate-400">Profissional:</span>
                                            <p className="font-semibold text-slate-700">{appt.doctor}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-slate-400">Valor Estimado:</span>
                                            <p className="font-semibold text-slate-800">{appt.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "financeiro" && (
                    <div className="space-y-6 w-full">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-blue-600" />
                                    Orçamentos & Tratamentos Financiados
                                </h3>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Controle de planos de tratamento, parcelamentos e orçamentos aprovados.
                                </p>
                            </div>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs h-9">
                                <Plus className="mr-1 h-3.5 w-3.5" /> Novo Orçamento
                            </Button>
                        </div>

                        {/* List grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {initialBudgets.map((budget) => {
                                const totalNum = parseFloat(budget.total.replace(/[^\d]/g, "")) / 100;
                                const paidNum = parseFloat(budget.paid.replace(/[^\d]/g, "")) / 100;
                                const percent = Math.min(100, Math.round((paidNum / totalNum) * 100));

                                return (
                                    <div
                                        key={budget.id}
                                        className="bg-slate-50/50 border hover:border-slate-300 hover:bg-white rounded-2xl p-5 transition-all duration-300 flex flex-col gap-4 shadow-sm"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Plano Clínico</span>
                                                <h4 className="font-bold text-slate-800 text-base">{budget.title}</h4>
                                                <p className="text-xs text-muted-foreground mt-0.5">Aprovado em {budget.date}</p>
                                            </div>
                                            <Badge
                                                className={cn(
                                                    "font-medium",
                                                    budget.status === "Concluído"
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                                        : "bg-amber-50 text-amber-700 border-amber-100"
                                                )}
                                            >
                                                {budget.status}
                                            </Badge>
                                        </div>

                                        {/* Progress bar */}
                                        <div className="space-y-1.5 pt-2">
                                            <div className="flex justify-between text-xs font-semibold text-slate-600">
                                                <span>Progresso de Pagamento</span>
                                                <span>{percent}%</span>
                                            </div>
                                            <div className="w-full bg-slate-200/60 rounded-full h-2 overflow-hidden">
                                                <div
                                                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                                                    style={{ width: `${percent}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="border-t pt-3 flex justify-between items-center text-xs">
                                            <div>
                                                <span className="text-slate-400">Total Pago:</span>
                                                <p className="font-semibold text-emerald-600 text-sm">{budget.paid}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-slate-400">Valor Total do Tratamento:</span>
                                                <p className="font-bold text-slate-800 text-sm">{budget.total}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeTab === "cadastro" && (
                    <form onSubmit={handleCadastroSubmit} className="space-y-8 w-full">
                        {success && (
                            <div className="flex items-center gap-3 p-4 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
                                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
                                <div>
                                    <p className="font-semibold">Alterações salvas com sucesso!</p>
                                    <p className="text-sm opacity-90">Os dados do paciente foram atualizados no sistema.</p>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="flex items-center gap-3 p-4 text-red-700 bg-red-50 border border-red-200 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
                                <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                                <div>
                                    <p className="font-semibold">Erro ao salvar</p>
                                    <p className="text-sm opacity-90">{error}</p>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                            {/* Seção 1: Dados Pessoais */}
                            <div className="space-y-6 w-full">
                                <div className="border-b pb-2">
                                    <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                        <User className="h-5 w-5 text-blue-600" />
                                        Dados Pessoais
                                    </h2>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        Identificação e contatos principais do paciente.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="nomeCompleto" className="text-sm font-medium">Nome Completo</Label>
                                        <Input
                                            id="nomeCompleto"
                                            name="nomeCompleto"
                                            defaultValue={paciente.nomeCompleto}
                                            placeholder="João da Silva"
                                            required
                                            className="h-10 bg-white"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="cpf" className="text-sm font-medium">CPF</Label>
                                            <Input
                                                id="cpf"
                                                name="cpf"
                                                value={masks.cpf}
                                                onChange={(e) => handleMaskChange(e, maskCPF, "cpf")}
                                                placeholder="000.000.000-00"
                                                required
                                                className="h-10 bg-white"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="dataNascimento" className="text-sm font-medium flex items-center gap-1.5">
                                                <CalendarDays className="h-4 w-4 text-slate-500" />
                                                Nascimento
                                            </Label>
                                            <Input
                                                id="dataNascimento"
                                                name="dataNascimento"
                                                type="date"
                                                defaultValue={
                                                    paciente.dataNascimento
                                                        ? new Date(paciente.dataNascimento).toISOString().split("T")[0]
                                                        : ""
                                                }
                                                required
                                                className="h-10 bg-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="telefone" className="text-sm font-medium flex items-center gap-1.5">
                                            <Phone className="h-4 w-4 text-slate-500" />
                                            Telefone / WhatsApp
                                        </Label>
                                        <Input
                                            id="telefone"
                                            name="telefone"
                                            value={masks.telefone}
                                            onChange={(e) => handleMaskChange(e, maskPhone, "telefone")}
                                            placeholder="(51) 99999-9999"
                                            required
                                            className="h-10 bg-white"
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 pt-4">
                                        <input
                                            type="checkbox"
                                            name="ativo"
                                            id="ativo"
                                            defaultChecked={paciente.ativo}
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                        />
                                        <Label htmlFor="ativo" className="text-sm font-medium text-slate-700 cursor-pointer select-none">
                                            Paciente com cadastro ativo
                                        </Label>
                                    </div>
                                </div>
                            </div>

                            {/* Seção 2: Endereço */}
                            <div className="space-y-6 w-full">
                                <div className="border-b pb-2">
                                    <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-blue-600" />
                                        Endereço Residencial
                                    </h2>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        Localização atualizada para correspondências ou contatos.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="cep" className="text-sm font-medium">CEP</Label>
                                            <div className="relative">
                                                <Input
                                                    id="cep"
                                                    name="cep"
                                                    value={masks.cep}
                                                    onChange={(e) => handleMaskChange(e, maskCEP, "cep")}
                                                    onBlur={handleCepBlur}
                                                    placeholder="00000-000"
                                                    required
                                                    className="h-10 bg-white"
                                                />
                                                {cepLoading && (
                                                    <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-blue-500" />
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="estado" className="text-sm font-medium">Estado (UF)</Label>
                                            <Input
                                                id="estado"
                                                name="estado"
                                                value={addressFields.estado}
                                                onChange={(e) =>
                                                    setAddressFields((p) => ({ ...p, estado: e.target.value.toUpperCase() }))
                                                }
                                                placeholder="RS"
                                                maxLength={2}
                                                required
                                                className="h-10 bg-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="cidade" className="text-sm font-medium">Cidade</Label>
                                        <Input
                                            id="cidade"
                                            name="cidade"
                                            value={addressFields.cidade}
                                            onChange={(e) => setAddressFields((p) => ({ ...p, cidade: e.target.value }))}
                                            placeholder="Porto Alegre"
                                            required
                                            className="h-10 bg-white"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="rua" className="text-sm font-medium">Rua / Logradouro</Label>
                                        <Input
                                            id="rua"
                                            name="rua"
                                            value={addressFields.rua}
                                            onChange={(e) => setAddressFields((p) => ({ ...p, rua: e.target.value }))}
                                            placeholder="Rua das Flores"
                                            required
                                            className="h-10 bg-white"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="numero" className="text-sm font-medium">Número</Label>
                                            <Input
                                                id="numero"
                                                name="numero"
                                                defaultValue={paciente.numero}
                                                placeholder="123"
                                                required
                                                className="h-10 bg-white"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="complemento" className="text-sm font-medium">Complemento</Label>
                                            <Input
                                                id="complemento"
                                                name="complemento"
                                                defaultValue={paciente.complemento || ""}
                                                placeholder="Apto 2B"
                                                className="h-10 bg-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-6 flex items-center justify-end gap-3">
                            <Link
                                href="/admin/pacientes"
                                className={cn(buttonVariants({ variant: "outline" }), "h-11 px-6 flex items-center justify-center")}
                            >
                                Cancelar
                            </Link>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200 h-11 px-6 min-w-[160px] flex items-center justify-center gap-2"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>Salvando...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        <span>Salvar Alterações</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
