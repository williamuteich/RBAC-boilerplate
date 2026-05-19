"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { FinanceiroTabProps } from "@/src/types/dashboard/pacientes";

export default function FinanceiroTab({ budgets }: FinanceiroTabProps) {
    return (
        <div className="space-y-6 w-full animate-in fade-in duration-500">
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
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs h-9 rounded-md">
                    <Plus className="mr-1 h-3.5 w-3.5" /> Novo Orçamento
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {budgets.map((budget) => {
                    const totalNum = parseFloat(budget.total.replace(/[^\d]/g, "")) / 100;
                    const paidNum = parseFloat(budget.paid.replace(/[^\d]/g, "")) / 100;
                    const percent = Math.min(100, Math.round((paidNum / totalNum) * 100));

                    return (
                        <div
                            key={budget.id}
                            className="bg-slate-50/50 border hover:border-slate-300 hover:bg-white rounded-md p-5 transition-all duration-300 flex flex-col gap-4 shadow-sm"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Plano Clínico</span>
                                    <h4 className="font-bold text-slate-800 text-base">{budget.title}</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Aprovado em {budget.date}</p>
                                </div>
                                <Badge
                                    className={cn(
                                        "font-medium rounded-sm",
                                        budget.status === "Concluído"
                                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                            : "bg-amber-50 text-amber-700 border-amber-100"
                                    )}
                                >
                                    {budget.status}
                                </Badge>
                            </div>

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
    );
}
