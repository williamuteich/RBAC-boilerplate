"use client";

import { useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Appointment, CreateAgendamentoInput, UpdateAgendamentoInput } from "@/src/types/dashboard/pacientes";
import { createAgendamento, updateAgendamento } from "@/src/services/pacientes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const statusLabel: Record<Appointment["status"], string> = {
    PENDENTE: "Pendente",
    CONFIRMADO: "Confirmado",
    CANCELADO: "Cancelado",
    REALIZADO: "Realizado",
};

export default function AgendamentosClient({ patientId, initialAppointments }: { patientId: string; initialAppointments: Appointment[] }) {
    const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
    const [newlyCreatedIds, setNewlyCreatedIds] = useState<string[]>([]);
    const [isPending, startTransition] = useTransition();
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [scheduledAt, setScheduledAt] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [estimatedValue, setEstimatedValue] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<Appointment["status"]>("PENDENTE");

    const [editScheduledAt, setEditScheduledAt] = useState("");
    const [editServiceType, setEditServiceType] = useState("");
    const [editEstimatedValue, setEditEstimatedValue] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editStatus, setEditStatus] = useState<Appointment["status"]>("PENDENTE");

    const sortedAppointments = useMemo(
        () => [...appointments].sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()),
        [appointments]
    );

    const toDateTimeLocalValue = (isoDate: string) => {
        const date = new Date(isoDate);
        const pad = (n: number) => String(n).padStart(2, "0");
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };

    const handleCreate = () => {
        if (!scheduledAt || !serviceType || estimatedValue === "") {
            toast.error("Preencha data/hora, tipo de serviço e valor estimado.");
            return;
        }

        const payload: CreateAgendamentoInput = {
            patientId,
            scheduledAt,
            serviceType,
            estimatedValue: Number(estimatedValue),
            description: description.trim() || undefined,
            status,
        };

        startTransition(async () => {
            const res = await createAgendamento(payload);
            if (!res.success || !res.data) {
                toast.error(res.error || "Erro ao criar agendamento.");
                return;
            }

            setAppointments((prev) => [res.data as Appointment, ...prev]);
            setNewlyCreatedIds((prev) => [res.data!.id, ...prev]);
            setShowForm(false);
            setScheduledAt("");
            setServiceType("");
            setEstimatedValue("");
            setDescription("");
            setStatus("PENDENTE");
            toast.success("Agendamento criado com sucesso!");
        });
    };

    const handleStartEdit = (appointment: Appointment) => {
        setEditingId(appointment.id);
        setEditScheduledAt(toDateTimeLocalValue(appointment.scheduledAt));
        setEditServiceType(appointment.serviceType);
        setEditEstimatedValue(String(appointment.estimatedValue));
        setEditDescription(appointment.description || "");
        setEditStatus(appointment.status);
    };

    const handleSaveEdit = (id: string) => {
        if (!editScheduledAt || !editServiceType || editEstimatedValue === "") {
            toast.error("Preencha data/hora, tipo de serviço e valor estimado para editar.");
            return;
        }

        const payload: UpdateAgendamentoInput = {
            scheduledAt: editScheduledAt,
            serviceType: editServiceType,
            estimatedValue: Number(editEstimatedValue),
            description: editDescription.trim() || undefined,
            status: editStatus,
        };

        startTransition(async () => {
            const res = await updateAgendamento(id, payload);
            if (!res.success || !res.data) {
                toast.error(res.error || "Erro ao atualizar agendamento.");
                return;
            }

            setAppointments((prev) => prev.map((item) => (item.id === id ? res.data as Appointment : item)));
            setEditingId(null);
            toast.success("Agendamento atualizado com sucesso!");
        });
    };

    return (
        <div className="space-y-6 w-full animate-in fade-in duration-500">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        Agendamentos do Paciente
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        Consultas futuras e histórico de atendimentos deste paciente.
                    </p>
                </div>
                <Button
                    onClick={() => setShowForm((v) => !v)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs h-9 rounded-md"
                >
                    <Plus className="mr-1 h-3.5 w-3.5" /> Novo Agendamento
                </Button>
            </div>

            {showForm && (
                <div className="border rounded-md p-4 bg-slate-50/40 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-600">Data e Hora</label>
                        <input
                            type="datetime-local"
                            value={scheduledAt}
                            onChange={(e) => setScheduledAt(e.target.value)}
                            className="w-full h-9 rounded-md border bg-white px-3 text-sm"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-600">Tipo de Serviço</label>
                        <input
                            type="text"
                            value={serviceType}
                            onChange={(e) => setServiceType(e.target.value)}
                            placeholder="Ex: Limpeza e profilaxia"
                            className="w-full h-9 rounded-md border bg-white px-3 text-sm"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-600">Valor Estimado</label>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={estimatedValue}
                            onChange={(e) => setEstimatedValue(e.target.value)}
                            placeholder="Ex: 250"
                            className="w-full h-9 rounded-md border bg-white px-3 text-sm"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-600">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as Appointment["status"])}
                            className="w-full h-9 rounded-md border bg-white px-3 text-sm"
                        >
                            <option value="PENDENTE">Pendente</option>
                            <option value="CONFIRMADO">Confirmado</option>
                            <option value="CANCELADO">Cancelado</option>
                            <option value="REALIZADO">Realizado</option>
                        </select>
                    </div>
                    <div className="space-y-1 md:col-span-2">
                        <label className="text-xs font-semibold text-slate-600">Descrição (opcional)</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Observações do agendamento"
                            className="w-full h-20 rounded-md border bg-white p-3 text-sm resize-none"
                        />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                        <Button onClick={handleCreate} disabled={isPending} className="bg-blue-600 hover:bg-blue-700 text-white">
                            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar Agendamento"}
                        </Button>
                    </div>
                </div>
            )}

            {sortedAppointments.length === 0 ? (
                <div className="border border-dashed rounded-md p-8 text-center text-sm text-slate-500">
                    Nenhum agendamento registrado para este paciente.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sortedAppointments.map((appt) => (
                        <div
                            key={appt.id}
                            className={cn(
                                "border hover:border-slate-300 hover:bg-white rounded-md p-5 transition-all duration-300 flex flex-col gap-4 shadow-sm",
                                newlyCreatedIds.includes(appt.id)
                                    ? "bg-blue-50/70 border-blue-200 shadow-blue-100"
                                    : "bg-slate-50/50"
                            )}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            className={cn(
                                                "font-medium rounded-sm",
                                                appt.status === "CONFIRMADO" && "bg-emerald-50 text-emerald-700 border-emerald-100",
                                                appt.status === "PENDENTE" && "bg-blue-50 text-blue-700 border-blue-100",
                                                appt.status === "CANCELADO" && "bg-rose-50 text-rose-700 border-rose-100",
                                                appt.status === "REALIZADO" && "bg-slate-100 text-slate-700 border-slate-200"
                                            )}
                                        >
                                            {statusLabel[appt.status]}
                                        </Badge>
                                        {newlyCreatedIds.includes(appt.id) && (
                                            <Badge className="font-medium rounded-sm bg-blue-600 text-white border-blue-600">
                                                Novo
                                            </Badge>
                                        )}
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-base pt-1">{appt.serviceType}</h4>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-semibold text-slate-500 flex items-center gap-1 justify-end">
                                        <Clock className="h-3.5 w-3.5" />
                                        {new Date(appt.scheduledAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                                    </p>
                                    <p className="text-[11px] text-slate-400 mt-0.5">
                                        {new Date(appt.scheduledAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })}
                                    </p>
                                </div>
                            </div>

                            <div className="border-t pt-3 flex justify-between items-end text-xs gap-3">
                                <div className="min-w-0">
                                    <span className="text-slate-400">Descrição:</span>
                                    <p className="font-semibold text-slate-700 truncate">{appt.description || "Sem observações"}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="text-slate-400">Valor Estimado:</span>
                                    <p className="font-semibold text-slate-800">
                                        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(appt.estimatedValue)}
                                    </p>
                                </div>
                            </div>

                            {editingId === appt.id ? (
                                <div className="border-t pt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <input
                                        type="datetime-local"
                                        value={editScheduledAt}
                                        onChange={(e) => setEditScheduledAt(e.target.value)}
                                        className="w-full h-9 rounded-md border bg-white px-3 text-sm"
                                    />
                                    <input
                                        type="text"
                                        value={editServiceType}
                                        onChange={(e) => setEditServiceType(e.target.value)}
                                        className="w-full h-9 rounded-md border bg-white px-3 text-sm"
                                    />
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={editEstimatedValue}
                                        onChange={(e) => setEditEstimatedValue(e.target.value)}
                                        className="w-full h-9 rounded-md border bg-white px-3 text-sm"
                                    />
                                    <select
                                        value={editStatus}
                                        onChange={(e) => setEditStatus(e.target.value as Appointment["status"])}
                                        className="w-full h-9 rounded-md border bg-white px-3 text-sm"
                                    >
                                        <option value="PENDENTE">Pendente</option>
                                        <option value="CONFIRMADO">Confirmado</option>
                                        <option value="CANCELADO">Cancelado</option>
                                        <option value="REALIZADO">Realizado</option>
                                    </select>
                                    <textarea
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        className="md:col-span-2 w-full h-20 rounded-md border bg-white p-3 text-sm resize-none"
                                    />
                                    <div className="md:col-span-2 flex justify-end gap-2">
                                        <Button variant="outline" onClick={() => setEditingId(null)} disabled={isPending}>Cancelar</Button>
                                        <Button onClick={() => handleSaveEdit(appt.id)} disabled={isPending} className="bg-blue-600 hover:bg-blue-700 text-white">
                                            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar Alterações"}
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="border-t pt-3 flex justify-end">
                                    <Button onClick={() => handleStartEdit(appt)} className="text-xs bg-blue-600 hover:bg-blue-700 text-white">
                                        Editar Agendamento
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        </div>
    );
}
