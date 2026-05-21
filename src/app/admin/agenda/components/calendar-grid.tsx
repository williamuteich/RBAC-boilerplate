import { Stethoscope, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Appointment {
    id: number;
    patientName: string;
    date: string;
    time: string;
    procedure: string;
    status: "Confirmado" | "Pendente" | "Cancelado";
}

interface CalendarGridProps {
    appointments: Appointment[];
    view: "day" | "list";
    onStatusChange: (id: number, status: "Confirmado" | "Cancelado") => void;
}

export default function CalendarGrid({ appointments, view, onStatusChange }: CalendarGridProps) {
    const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
    const hoje = new Date();
    const currentMonthName = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(hoje);
    const todayNum = hoje.getDate();

    if (view === "list" || appointments.length === 0) {
        return (
            <div className="w-full bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Paciente</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Horário / Data</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Procedimento</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {appointments.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-5 py-10 text-center text-xs font-semibold text-slate-400">
                                        Nenhuma consulta encontrada.
                                    </td>
                                </tr>
                            ) : (
                                appointments.map((appointment) => (
                                    <tr key={appointment.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-5 py-3.5 font-bold text-slate-800 text-xs">{appointment.patientName}</td>
                                        <td className="px-5 py-3.5 text-xs text-slate-500 font-semibold">
                                            {appointment.date.split("-").reverse().join("/")} às {appointment.time}
                                        </td>
                                        <td className="px-5 py-3.5 text-xs text-slate-600 font-semibold">{appointment.procedure}</td>
                                        <td className="px-5 py-3.5">
                                            <span className={cn(
                                                "px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wide uppercase inline-block",
                                                appointment.status === "Confirmado" && "bg-emerald-50 text-emerald-700 border border-emerald-100",
                                                appointment.status === "Pendente" && "bg-amber-50 text-amber-700 border border-amber-100",
                                                appointment.status === "Cancelado" && "bg-rose-50 text-rose-700 border border-rose-100"
                                            )}>
                                                {appointment.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 text-right">
                                            {appointment.status === "Pendente" && (
                                                <div className="flex justify-end gap-1.5">
                                                    <button
                                                        onClick={() => onStatusChange(appointment.id, "Confirmado")}
                                                        className="px-2 py-1 bg-emerald-500 text-white rounded text-[10px] font-bold hover:bg-emerald-600 cursor-pointer"
                                                    >
                                                        Confirmar
                                                    </button>
                                                    <button
                                                        onClick={() => onStatusChange(appointment.id, "Cancelado")}
                                                        className="px-2 py-1 bg-rose-50 text-rose-600 rounded text-[10px] font-bold hover:bg-rose-100 border border-rose-200 cursor-pointer"
                                                    >
                                                        Cancelar
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 w-full">
            <div className="lg:col-span-2 bg-white border rounded-xl p-4 flex flex-col gap-4 shadow-sm h-fit">
                <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider capitalize">
                        {currentMonthName}
                    </span>
                    <div className="flex gap-1">
                        <button className="p-1 hover:bg-slate-100 rounded text-slate-500 cursor-pointer"><ChevronLeft className="h-4 w-4" /></button>
                        <button className="p-1 hover:bg-slate-100 rounded text-slate-500 cursor-pointer"><ChevronRight className="h-4 w-4" /></button>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                    {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
                        <span key={i} className="text-[10px] font-bold text-slate-400">{d}</span>
                    ))}
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                        const hasApt = day === todayNum; // Simplificação para mostrar o dia atual
                        return (
                            <button
                                key={day}
                                className={cn(
                                    "h-7 w-7 text-xs font-semibold rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all relative hover:bg-blue-50 hover:text-blue-600",
                                    day === todayNum ? "bg-blue-600 text-white hover:bg-blue-600 hover:text-white font-bold shadow-md" : "text-slate-600"
                                )}
                            >
                                {day}
                                {hasApt && day !== todayNum && <span className="absolute bottom-1 w-1 h-1 rounded-full bg-blue-500"></span>}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="lg:col-span-5 bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col h-[550px]">
                <div className="flex items-center justify-between border-b px-4 py-3 bg-slate-50">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Grade Horária</span>
                    <span className="text-xs font-bold text-slate-500">Hoje</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {hours.map((hour) => {
                        const matching = appointments.filter(a => a.time.startsWith(hour.slice(0, 2)));
                        return (
                            <div key={hour} className="flex gap-4 items-start border-b border-slate-100 pb-3 last:border-b-0">
                                <span className="text-xs font-bold text-slate-400 w-12 shrink-0 pt-0.5">{hour}</span>
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {matching.length === 0 ? (
                                        <div className="text-[11px] text-slate-300 font-semibold py-1.5 px-3 border border-dashed border-slate-100 rounded-lg">
                                            Horário livre
                                        </div>
                                    ) : (
                                        matching.map((apt) => (
                                            <div
                                                key={apt.id}
                                                className={cn(
                                                    "border rounded-xl p-3 shadow-xs relative flex flex-col gap-1 transition-all hover:shadow-md",
                                                    apt.status === "Confirmado" && "bg-emerald-50/30 border-emerald-200 text-emerald-800",
                                                    apt.status === "Pendente" && "bg-amber-50/30 border-amber-200 text-amber-800",
                                                    apt.status === "Cancelado" && "bg-rose-50/20 border-rose-200 text-rose-800 opacity-60"
                                                )}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <span className="text-xs font-bold truncate max-w-[150px]">{apt.patientName}</span>
                                                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white shadow-xs">
                                                        {apt.time}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-1 font-semibold">
                                                    <Stethoscope className="h-3 w-3" />
                                                    <span>{apt.procedure}</span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
