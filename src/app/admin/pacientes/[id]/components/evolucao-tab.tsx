"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Activity, Plus } from "lucide-react";

export default function EvolucaoTab() {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

    };

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

            <form onSubmit={handleSubmit} className="bg-slate-50 border rounded-md p-4 flex flex-col gap-3">
                <Label htmlFor="evolText" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nova Evolução Clínica</Label>
                <div className="flex gap-3">
                    <Input
                        id="evolText"
                        placeholder="Ex: Realizada profilaxia completa com jato de bicarbonato e aplicação tópica de flúor..."
                        className="bg-white h-11 rounded-md"
                    />
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 h-11 px-5 rounded-md shrink-0 flex items-center gap-2">
                        <Plus className="h-4 w-4" /> Gravar
                    </Button>
                </div>
            </form>

        </div>
    );
}
