"use client";

import { useState } from "react";
import CalendarGrid from "./calendar-grid";
import { CalendarDays, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Appointment {
    id: number;
    patientName: string;
    date: string;
    time: string;
    procedure: string;
    status: "Confirmado" | "Pendente" | "Cancelado";
}

const INITIAL_APPOINTMENTS: Appointment[] = [
    {
        id: 1,
        patientName: "Matheus Uteich",
        date: new Date().toISOString().split('T')[0],
        time: "09:00",
        procedure: "Implante Dentário",
        status: "Confirmado"
    },
    {
        id: 2,
        patientName: "Ana Clara Silva",
        date: new Date().toISOString().split('T')[0],
        time: "10:30",
        procedure: "Profilaxia e Limpeza",
        status: "Pendente"
    },
    {
        id: 3,
        patientName: "Carlos Eduardo Souza",
        date: new Date().toISOString().split('T')[0],
        time: "14:00",
        procedure: "Tratamento de Canal",
        status: "Confirmado"
    }
];

export default function AgendaContainer() {
    const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
    const [filterStatus, setFilterStatus] = useState("all");
    const [view, setView] = useState<"day" | "list">("day");

    const handleStatusChange = (id: number, newStatus: "Confirmado" | "Cancelado") => {
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    };

    const filtered = appointments.filter(a => {
        return filterStatus === "all" || a.status === filterStatus;
    });

    const hoje = new Date();
    const dataFormatada = new Intl.DateTimeFormat('pt-BR', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    }).format(hoje);

    return (
        <div className="space-y-6 w-full animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <CalendarDays className="h-6 w-6 text-blue-600" />
                        Agenda
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 capitalize">
                        {dataFormatada}
                    </p>
                </div>

                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Nova Consulta
                </Button>
            </div>

            <div className="bg-white border rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <Filter className="h-4 w-4 text-slate-400" />
                        Filtrar Status:
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="h-8.5 px-3 text-xs bg-slate-50 border-none rounded-lg outline-none focus:ring-1 focus:ring-blue-600 font-semibold text-slate-600 cursor-pointer"
                    >
                        <option value="all">Todos os Status</option>
                        <option value="Confirmado">Confirmado</option>
                        <option value="Pendente">Pendente</option>
                        <option value="Cancelado">Cancelado</option>
                    </select>
                </div>

                <div className="flex items-center gap-1.5 border border-slate-100 p-1 rounded-lg bg-slate-50 w-fit shrink-0">
                    <button
                        onClick={() => setView("day")}
                        className={cn(
                            "h-7 px-3 text-xs font-bold rounded-md transition-all cursor-pointer",
                            view === "day" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
                        )}
                    >
                        Dia
                    </button>
                    <button
                        onClick={() => setView("list")}
                        className={cn(
                            "h-7 px-3 text-xs font-bold rounded-md transition-all cursor-pointer",
                            view === "list" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
                        )}
                    >
                        Tabela
                    </button>
                </div>
            </div>

            <CalendarGrid appointments={filtered} view={view} onStatusChange={handleStatusChange} />
        </div>
    );
}
