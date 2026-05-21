"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const initialAppointments = [
    { id: 1, date: "2026-05-28", time: "14:00", type: "Limpeza & Profilaxia", doctor: "Dra. Letícia Uteich", status: "Confirmado", price: "R$ 220,00" },
    { id: 2, date: "2026-06-15", time: "10:30", type: "Restauração Resina (Dente 14)", doctor: "Dr. William Uteich", status: "Agendado", price: "R$ 350,00" },
    { id: 3, date: "2026-04-10", time: "09:00", type: "Avaliação Geral", doctor: "Dra. Letícia Uteich", status: "Realizado", price: "R$ 150,00" },
];

export default function AgendamentosTab() {
    return (
        <div className="space-y-6 w-full animate-in fade-in duration-500">
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
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs h-9 rounded-md">
                    <Plus className="mr-1 h-3.5 w-3.5" /> Novo Agendamento
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {initialAppointments.map((appt) => (
                    <div
                        key={appt.id}
                        className="bg-slate-50/50 border hover:border-slate-300 hover:bg-white rounded-md p-5 transition-all duration-300 flex flex-col gap-4 shadow-sm"
                    >
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <Badge
                                    className={cn(
                                        "font-medium rounded-sm",
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
    );
}
