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
            {/* Header section with back button and details */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border shadow-sm w-full">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/pacientes"
                        className={cn(
                            buttonVariants({ variant: "outline", size: "icon" }),
                            "h-10 w-10 rounded-xl"
                        )}
                        title="Voltar para a lista de pacientes"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2.5">
                            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                                {paciente.nomeCompleto}
                            </h1>
                            <span
                                className={cn(
                                    "w-3 h-3 rounded-full shadow-sm animate-pulse shrink-0",
                                    paciente.ativo ? "bg-emerald-500" : "bg-rose-500"
                                )}
                                title={paciente.ativo ? "Paciente Ativo" : "Paciente Inativo"}
                            ></span>
                        </div>
                        <p className="text-sm font-semibold text-slate-500 mt-1 flex items-center gap-1.5">
                            <User className="h-4 w-4 text-blue-500" />
                            Prontuário Odontológico • CPF: <span className="font-mono text-xs">{paciente.cpf}</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className={cn("text-xs font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider", paciente.ativo ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200")}>
                        {paciente.ativo ? "Cadastro Ativo" : "Cadastro Inativo"}
                    </span>
                </div>
            </div>

            {/* Core interactive prontuário dashboard tabs component */}
            <div className="w-full">
                <ProntuarioOdontologico paciente={paciente} />
            </div>
        </div>
    );
}
