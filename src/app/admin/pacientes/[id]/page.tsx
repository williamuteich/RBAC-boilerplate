import { User } from "lucide-react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProntuarioPage({ params }: { params: { id: string } }) {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon-sm">
                    <Link href="/admin/pacientes">
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3 text-slate-900">
                        <User className="h-8 w-8 text-blue-600" />
                        Prontuário do Paciente
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Gerencie o histórico e anotações deste paciente.
                    </p>
                </div>
            </div>

            <div className="bg-card rounded-xl border p-6 shadow-sm min-h-[400px] flex items-center justify-center">
                <div className="text-center space-y-3">
                    <p className="text-muted-foreground">
                        A interface do prontuário será construída aqui.
                    </p>
                    <p className="text-xs text-slate-400">
                        ID do Paciente: {params.id}
                    </p>
                </div>
            </div>
        </div>
    );
}
