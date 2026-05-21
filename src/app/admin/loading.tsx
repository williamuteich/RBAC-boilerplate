import { Loader2 } from "lucide-react";

export default function AdminLoading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4 animate-in fade-in duration-500">
            <div className="relative flex items-center justify-center">
                <div className="h-16 w-16 rounded-full border-4 border-blue-500/20 border-t-blue-600 animate-spin" />
                <Loader2 className="absolute h-6 w-6 text-blue-600 animate-pulse" />
            </div>
            <div className="flex flex-col items-center gap-1">
                <h3 className="text-sm font-semibold text-slate-800 tracking-wide">
                    Carregando painel...
                </h3>
                <p className="text-xs text-slate-400">
                    Buscando informações atualizadas
                </p>
            </div>
        </div>
    );
}
