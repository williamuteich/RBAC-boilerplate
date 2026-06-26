import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0B081B] flex flex-col items-center justify-center px-4 text-center">
            <div className="max-w-md w-full space-y-6">
                <div className="inline-flex p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <FileQuestion className="w-12 h-12" />
                </div>

                <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
                    404
                </h1>
                <h2 className="text-xl font-bold text-slate-200">
                    Página não encontrada
                </h2>

                <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Desculpe, o link que você acessou pode estar quebrado ou a página foi movida para outro endereço.
                </p>

                <div className="pt-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                    >
                        <Home className="w-4 h-4" />
                        <span>Voltar para o Início</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
