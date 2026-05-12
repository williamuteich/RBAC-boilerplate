"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, Store } from "lucide-react";
import { Button } from "@/components/ui/button";

function ConfirmarContent() {
    const searchParams = useSearchParams();
    const vid = searchParams.get("vid");
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("Confirmando sua visita...");

    useEffect(() => {
        if (!vid) {
            setStatus("error");
            setMessage("ID do visitante não encontrado no link.");
            return;
        }

        const confirmVisit = async () => {
            try {
                const response = await fetch("/api/public/visitor", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        visitorId: vid,
                        converted: true,
                    }),
                });

                if (response.ok) {
                    setStatus("success");
                    setMessage("Visita confirmada com sucesso! Obrigado por vir.");
                } else {
                    setStatus("error");
                    setMessage("Não foi possível confirmar sua visita. Tente novamente.");
                }
            } catch (error) {
                setStatus("error");
                setMessage("Erro de conexão. Verifique sua internet.");
            }
        };

        confirmVisit();
    }, [vid]);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-(family-name:--font-geist-sans)">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-100 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mb-6">
                    <Store className="w-8 h-8 text-indigo-600" />
                </div>

                <h1 className="text-2xl font-bold text-slate-900 mb-2">Confirmação de Visita</h1>

                <div className="my-8">
                    {status === "loading" && (
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                            <p className="text-slate-600 font-medium">{message}</p>
                        </div>
                    )}

                    {status === "success" && (
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center animate-bounce">
                                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                            </div>
                            <p className="text-emerald-700 font-semibold text-lg">{message}</p>
                            <p className="text-slate-500 text-sm">Sua presença foi registrada em nosso sistema.</p>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                                <XCircle className="w-10 h-10 text-red-600" />
                            </div>
                            <p className="text-red-700 font-semibold">{message}</p>
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => window.location.reload()}
                            >
                                Tentar novamente
                            </Button>
                        </div>
                    )}
                </div>

                <div className="pt-6 border-t border-slate-100 w-full">
                    <p className="text-xs text-slate-400">
                        Este é um sistema automático de rastreamento de conversões via Google Ads (GCLID).
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function ConfirmarPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
            </div>
        }>
            <ConfirmarContent />
        </Suspense>
    );
}
