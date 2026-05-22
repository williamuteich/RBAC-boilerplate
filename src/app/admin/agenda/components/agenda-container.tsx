"use client";

import { useState } from "react";
import CalendarGrid from "./calendar-grid";
import { CalendarDays } from "lucide-react";

export interface Appointment {
    id: number;
    patientName: string;
    date: string;
    time: string;
    procedure: string;
    status: "Confirmado" | "Pendente" | "Cancelado";
    isNew?: boolean;
    isGuest?: boolean;
}

function mkDate(offsetDays: number) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split("T")[0];
}

const INITIAL_APPOINTMENTS: Appointment[] = [
    { id: 1, patientName: "Matheus Uteich", date: mkDate(0), time: "09:00", procedure: "Implante Dentário", status: "Confirmado" },
    { id: 2, patientName: "Ana Clara Silva", date: mkDate(0), time: "10:30", procedure: "Profilaxia e Limpeza", status: "Pendente" },
    { id: 3, patientName: "Carlos Eduardo Souza", date: mkDate(0), time: "14:00", procedure: "Tratamento de Canal", status: "Confirmado" },
    { id: 4, patientName: "Fernanda Lima", date: mkDate(-2), time: "08:00", procedure: "Clareamento Dental", status: "Confirmado" },
    { id: 5, patientName: "Roberto Santos", date: mkDate(-2), time: "11:00", procedure: "Extração Simples", status: "Cancelado" },
    { id: 6, patientName: "Juliana Pereira", date: mkDate(1), time: "09:30", procedure: "Ortodontia", status: "Pendente" },
    { id: 7, patientName: "Bruno Costa", date: mkDate(1), time: "15:00", procedure: "Restauração", status: "Pendente" },
    { id: 8, patientName: "Mariana Alves", date: mkDate(3), time: "10:00", procedure: "Consulta de Avaliação", status: "Confirmado" },
    { id: 9, patientName: "Pedro Oliveira", date: mkDate(5), time: "08:30", procedure: "Periodontia", status: "Pendente" },
    { id: 10, patientName: "Sofia Mendes", date: mkDate(5), time: "13:00", procedure: "Prótese Dentária", status: "Confirmado" },
    { id: 11, patientName: "Lucas Ferreira", date: mkDate(7), time: "16:00", procedure: "Implante Dentário", status: "Pendente" },
    { id: 12, patientName: "Camila Ramos", date: mkDate(-5), time: "09:00", procedure: "Clareamento Dental", status: "Confirmado" },
];

export default function AgendaContainer() {
    const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);

    const handleStatusChange = (id: number, newStatus: "Confirmado" | "Cancelado") => {
        setAppointments((prev) =>
            prev.map((a) => (a.id === id ? { ...a, status: newStatus, isNew: false } : a))
        );
    };

    const handleAdd = (apt: Omit<Appointment, "id">) => {
        setAppointments((prev) => [...prev, { ...apt, id: Date.now(), isNew: true }]);
    };

    const hoje = new Date();
    const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
    }).format(hoje);

    return (
        <div className="space-y-6 w-full animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <CalendarDays className="h-6 w-6 text-blue-600" />
                        Agenda
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 capitalize">{dataFormatada}</p>
                </div>
            </div>
            <CalendarGrid
                appointments={appointments}
                onStatusChange={handleStatusChange}
                onAdd={handleAdd}
            />
        </div>
    );
}
