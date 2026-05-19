"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Plus, CalendarDays } from "lucide-react";
import { EvolucaoTabProps } from "@/src/types/dashboard/pacientes";

export default function EvolucaoTab({
    evolution,
    newEvolutionText,
    onTextChange,
    onSubmit
}: EvolucaoTabProps) {
    return (
        <div className="space-y-6 w-full animate-in fade-in duration-500">
            <div>
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    Evolução Clínica & Procedimentos
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                    Histórico detalhado de evoluções, queixas e tratamentos realizados ao longo do tempo.
                </p>
            </div>

            <form onSubmit={onSubmit} className="bg-slate-50 border rounded-2xl p-4 flex flex-col gap-3">
                <Label htmlFor="evolText" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nova Evolução Clínica</Label>
                <div className="flex gap-3">
                    <Input
                        id="evolText"
                        value={newEvolutionText}
                        onChange={(e) => onTextChange(e.target.value)}
                        placeholder="Ex: Realizada profilaxia completa com jato de bicarbonato e aplicação tópica de flúor..."
                        className="bg-white h-11"
                    />
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 h-11 px-5 shrink-0 flex items-center gap-2">
                        <Plus className="h-4 w-4" /> Gravar
                    </Button>
                </div>
            </form>

            <div className="relative border-l border-slate-200 ml-4 pl-6 space-y-6 pt-2">
                {evolution.map((item) => (
                    <div key={item.id} className="relative animate-in fade-in duration-500">
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
    );
}
