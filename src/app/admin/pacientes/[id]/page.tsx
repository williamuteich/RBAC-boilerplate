import { User, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getPaciente } from "@/src/services/pacientes";
import ProntuarioOdontologico from "./components/prontuario-odontologico";
import { cn } from "@/lib/utils";

export default async function ProntuarioPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
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
                            {paciente.nomeCompleto}
                        </h1>
                        <span
                            className={cn(
                                "w-2.5 h-2.5 rounded-full shadow-sm animate-pulse shrink-0",
                                paciente.ativo ? "bg-emerald-500" : "bg-rose-500"
                            )}
                            title={paciente.ativo ? "Paciente Ativo" : "Paciente Inativo"}
                        ></span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5 flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="hidden sm:inline">Prontuário Odontológico</span>
                    </p>
                </div>
            </div>

            <div className="w-full">
                <ProntuarioOdontologico paciente={paciente} />
            </div>
        </div>
    );
}
