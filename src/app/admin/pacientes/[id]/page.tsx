import { User, ChevronLeft, Calendar, Stethoscope, Activity, HeartPulse } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getPaciente } from "@/src/services/pacientes";
import { cn } from "@/lib/utils";

import OdontogramaTab from "./components/odontograma-tab";
import EvolucaoTab from "./components/evolucao-tab";
import AgendamentosTab from "./components/agendamentos-tab";
import CadastroTab from "./components/cadastro-tab";

export default async function ProntuarioPage({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ tab?: string }>;
}) {
    const { id } = await params;
    const { tab = "odontograma" } = await searchParams;
    const paciente = await getPaciente(id);

    if (!paciente) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 font-bold text-xl">!</div>
                <h2 className="text-xl font-bold text-slate-900">Paciente não encontrado</h2>
                <p className="text-muted-foreground max-w-xs">O paciente que você está tentando visualizar não existe ou foi removido.</p>
                <Link
                    href="/admin/pacientes"
                    className={cn(buttonVariants({ variant: "default" }), "bg-blue-600 hover:bg-blue-700 text-white")}
                >
                    Voltar para Pacientes
                </Link>
            </div>
        );
    }

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
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-row items-center gap-3 bg-white p-4 sm:p-6 rounded-sm border border-slate-200/80 shadow-xs w-full">
                <Link
                    href="/admin/pacientes"
                    className={cn(
                        buttonVariants({ variant: "outline", size: "icon" }),
                        "h-9 w-9 rounded-sm shrink-0"
                    )}
                    title="Voltar para a lista de pacientes"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Link>
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h1 className="text-xl md:text-3xl font-extrabold tracking-tight text-slate-900 truncate">
                            {paciente.name}
                        </h1>
                        <span
                            className={cn(
                                "w-2.5 h-2.5 rounded-full shadow-sm animate-pulse shrink-0",
                                paciente.active ? "bg-emerald-500" : "bg-rose-500"
                            )}
                            title={paciente.active ? "Paciente Ativo" : "Paciente Inativo"}
                        ></span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5 flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="hidden sm:inline">Prontuário Odontológico</span>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
                <div className="bg-white border border-slate-200/80 rounded-sm p-4 flex items-center gap-3.5 shadow-xs transition-all hover:border-slate-300">
                    <div className="w-9 h-9 rounded-sm bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                        <User className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Identificação Básica</p>
                        <p className="text-sm font-bold text-slate-800 mt-0.5 truncate">{calcIdade(paciente.birthDate)} anos</p>
                        <p className="text-[11px] font-semibold text-slate-500 mt-px truncate">CPF {paciente.cpf}</p>
                    </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-sm p-4 flex items-center gap-3.5 shadow-xs transition-all hover:border-slate-300">
                    <div className="w-9 h-9 rounded-sm bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                        <HeartPulse className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status do Paciente</p>
                        <p className="text-sm font-bold text-slate-800 mt-0.5">{paciente.active ? "Cadastro Ativo" : "Inativo"}</p>
                        <p className="text-[11px] font-semibold text-slate-500 mt-px truncate">Último Acesso: Hoje</p>
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
            </div>

            <div className="flex flex-wrap gap-1 border-b pb-px w-full mt-2">
                <Link
                    href="?tab=odontograma"
                    className={cn(
                        "px-3.5 py-2 rounded-t-md text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 relative",
                        tab === "odontograma"
                            ? "bg-blue-600 text-white shadow-sm font-semibold"
                            : "text-slate-600 hover:bg-slate-50 bg-white"
                    )}
                >
                    <Stethoscope className="h-4 w-4" />
                    Odontograma Interativo 3D
                </Link>

                <Link
                    href="?tab=evolucao"
                    className={cn(
                        "px-3.5 py-2 rounded-t-md text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 relative",
                        tab === "evolucao"
                            ? "bg-blue-600 text-white shadow-sm font-semibold"
                            : "text-slate-600 hover:bg-slate-50 bg-white"
                    )}
                >
                    <Activity className="h-4 w-4" />
                    Evolução & Procedimentos
                </Link>

                <Link
                    href="?tab=agendamentos"
                    className={cn(
                        "px-3.5 py-2 rounded-t-md text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 relative",
                        tab === "agendamentos"
                            ? "bg-blue-600 text-white shadow-sm font-semibold"
                            : "text-slate-600 hover:bg-slate-50 bg-white"
                    )}
                >
                    <Calendar className="h-4 w-4" />
                    Agendamentos
                </Link>

                <Link
                    href="?tab=cadastro"
                    className={cn(
                        "px-3.5 py-2 rounded-t-md text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 relative",
                        tab === "cadastro"
                            ? "bg-blue-600 text-white shadow-sm font-semibold"
                            : "text-slate-600 hover:bg-slate-50 bg-white"
                    )}
                >
                    <User className="h-4 w-4" />
                    Ficha Cadastral
                </Link>
            </div>

            <div className="w-full bg-white rounded-md border p-4 sm:p-6 shadow-sm">
                {tab === "odontograma" && <OdontogramaTab />}
                {tab === "evolucao" && <EvolucaoTab />}
                {tab === "agendamentos" && <AgendamentosTab />}
                {tab === "cadastro" && <CadastroTab paciente={paciente} />}
            </div>
        </div>
    );
}
