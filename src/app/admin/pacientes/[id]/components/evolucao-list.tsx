"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CalendarDays, ClipboardList, Clock, Pencil, X, Activity, Plus, Trash2 } from "lucide-react";
import { EvolucaoListProps, HistoricoPatient } from "@/src/types/dashboard/pacientes";
import { createHistoricoPaciente, updateHistoricoPaciente, deleteHistoricoPaciente } from "@/src/services/pacientes";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EvolucaoList({ initialItems, patientId }: EvolucaoListProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [items, setItems] = useState<HistoricoPatient[]>(initialItems);
    useEffect(() => {
        setItems(initialItems);
    }, [initialItems]);

    const [action, setAction] = useState<"new" | "edit" | null>(null);
    const [editId, setEditId] = useState<string | null>(null);
    const isModalOpen = action === "new" || action === "edit";

    useEffect(() => {
        const urlAction = searchParams.get("action") as "new" | "edit" | null;
        const urlEditId = searchParams.get("editId");
        if (urlAction) {
            setAction(urlAction);
            if (urlEditId) {
                setEditId(urlEditId);
            }
        }
    }, [searchParams]);

    const [description, setDescription] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState("");
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        if (action === "edit" && editId) {
            const item = items.find(i => i.id === editId);
            if (item) {
                setDescription(item.description);
            }
        } else if (action === "new") {
            setDescription("");
        }
        setError("");
    }, [action, editId, items]);

    const handleAddClick = () => {
        setAction("new");
        setEditId(null);
        const params = new URLSearchParams(window.location.search);
        params.set("action", "new");
        params.delete("editId");
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({ ...window.history.state, as: newUrl, url: newUrl }, "", newUrl);
    };

    const handleEditClick = (id: string) => {
        setAction("edit");
        setEditId(id);
        const params = new URLSearchParams(window.location.search);
        params.set("action", "edit");
        params.set("editId", id);
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({ ...window.history.state, as: newUrl, url: newUrl }, "", newUrl);
    };

    const handleCloseModal = () => {
        setAction(null);
        setEditId(null);
        const params = new URLSearchParams(window.location.search);
        params.delete("action");
        params.delete("editId");
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({ ...window.history.state, as: newUrl, url: newUrl }, "", newUrl);
    };

    const handleSave = async () => {
        if (description.trim().length < 3) {
            setError("A evolução clínica deve conter pelo menos 3 caracteres.");
            toast.warning("A evolução clínica deve conter pelo menos 3 caracteres.");
            return;
        }

        setIsPending(true);
        setError("");

        try {
            if (action === "new") {
                const res = await createHistoricoPaciente(patientId, description);
                if (res.success) {
                    toast.success("Evolução clínica criada com sucesso!");
                    handleCloseModal();
                    router.refresh();
                } else {
                    const errMsg = res.error || "Erro ao criar evolução.";
                    setError(errMsg);
                    toast.error(errMsg);
                }
            } else if (action === "edit" && editId) {
                const res = await updateHistoricoPaciente(patientId, editId, description);
                if (res.success) {
                    toast.success("Evolução clínica atualizada com sucesso!");
                    setItems(prev =>
                        prev.map(item =>
                            item.id === editId ? { ...item, description } : item
                        )
                    );
                    handleCloseModal();
                    router.refresh();
                } else {
                    const errMsg = res.error || "Erro ao salvar alterações.";
                    setError(errMsg);
                    toast.error(errMsg);
                }
            }
        } catch (err) {
            console.error("Erro ao salvar evolução clínica:", err);
            setError("Erro interno do servidor.");
            toast.error("Erro interno do servidor ao salvar.");
        } finally {
            setIsPending(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!deleteId) return;

        setIsPending(true);
        setError("");

        try {
            const res = await deleteHistoricoPaciente(patientId, deleteId);
            if (res.success) {
                toast.success("Registro clínico excluído com sucesso!");
                setItems(prev => prev.filter(item => item.id !== deleteId));
                setDeleteId(null);
                router.refresh();
            } else {
                const errMsg = res.error || "Erro ao excluir registro.";
                setError(errMsg);
                toast.error(errMsg);
            }
        } catch (err) {
            console.error("Erro ao excluir histórico clínico:", err);
            setError("Erro interno ao processar a exclusão.");
            toast.error("Erro interno ao processar a exclusão.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="space-y-6 w-full animate-in fade-in duration-500">
            <ToastContainer position="top-right" autoClose={3000} theme="colored" />

            <div className="flex flex-row items-center justify-between border-b pb-4 gap-4">
                <div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 flex items-center gap-2">
                        <Activity className="h-5 w-5 text-blue-600" />
                        Evolução Clínica & Procedimentos
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        Histórico detalhado de evoluções, queixas e tratamentos realizados ao longo do tempo.
                    </p>
                </div>
                <Button
                    onClick={handleAddClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-4 rounded-md shrink-0 flex items-center gap-2 shadow-xs text-xs font-semibold"
                >
                    <Plus className="h-4 w-4" /> Nova Evolução
                </Button>
            </div>

            <div className="pt-2">
                {items.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 flex flex-col items-center justify-center p-6">
                        <ClipboardList className="h-10 w-10 text-slate-350 mb-3" />
                        <h4 className="text-sm font-semibold text-slate-700">Nenhum Registro Clínico</h4>
                        <p className="text-xs text-slate-400 mt-1 max-w-xs leading-normal">
                            Nenhuma evolução ou histórico de consulta foi adicionado a este prontuário ainda.
                        </p>
                    </div>
                ) : (
                    <div className="relative border-l border-slate-200 ml-4 pl-6 space-y-4 pt-2">
                        {items.map((evolucao) => (
                            <div key={evolucao.id} className="relative animate-in fade-in duration-500">
                                <div className="absolute -left-[32px] top-1.5 w-4 h-4 rounded-full bg-blue-50 border-2 border-blue-600 shadow-sm flex items-center justify-center ring-4 ring-white">
                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                </div>
                                <div className="bg-slate-50/40 hover:bg-white border hover:border-slate-200 rounded-lg p-3 transition-all duration-300 shadow-sm hover:shadow-slate-100/50 flex gap-4 items-start justify-between group">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <CalendarDays className="h-3.5 w-3.5 text-blue-500" />
                                                {new Date(evolucao.createdAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })}
                                            </span>
                                            <span className="text-slate-300">•</span>
                                            <span className="flex items-center gap-1 font-semibold text-slate-400">
                                                <Clock className="h-3.5 w-3.5 text-slate-400" />
                                                {new Date(evolucao.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-600 leading-normal font-medium whitespace-pre-wrap">
                                            {evolucao.description}
                                        </p>
                                    </div>

                                    <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-all duration-300 shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => handleEditClick(evolucao.id)}
                                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors"
                                            title="Editar relato clínico"
                                        >
                                            <Pencil className="h-3.5 w-3.5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setError("");
                                                setDeleteId(evolucao.id);
                                            }}
                                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                            title="Excluir relato clínico"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-350">
                    <div className="bg-white border border-slate-200 rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-5 border-b flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-sm sm:text-base">
                                <Activity className="h-4 w-4 text-blue-600" />
                                {action === "new" ? "Nova Evolução Clínica" : "Editar Registro Clínico"}
                            </h3>
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="text-slate-400 hover:text-slate-600 rounded-md p-1 hover:bg-slate-100 transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="p-5 space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="modalDescription" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Evolução Clínica / Relato</Label>
                                <textarea
                                    id="modalDescription"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Descreva aqui o diagnóstico, profilaxia, queixa do paciente ou procedimentos executados..."
                                    rows={5}
                                    className="w-full rounded-md border border-slate-200 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-slate-400 resize-none leading-relaxed"
                                    required
                                />
                            </div>
                            {error && <p className="text-xs font-medium text-rose-650">{error}</p>}
                        </div>

                        <div className="p-5 bg-slate-50/55 border-t flex justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCloseModal}
                                disabled={isPending}
                                className="h-9 text-xs"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="button"
                                onClick={handleSave}
                                disabled={isPending}
                                className="bg-blue-600 hover:bg-blue-700 h-9 text-xs text-white"
                            >
                                {isPending ? "Salvando..." : action === "new" ? "Criar Registro" : "Salvar Alterações"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-350">
                    <div className="bg-white border border-slate-200 rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-5 border-b flex justify-between items-center bg-red-50/30">
                            <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-sm sm:text-base">
                                <Trash2 className="h-4.5 w-4.5 text-red-650" />
                                Confirmar Exclusão
                            </h3>
                            <button
                                type="button"
                                onClick={() => setDeleteId(null)}
                                className="text-slate-400 hover:text-red-650 rounded-md p-1 hover:bg-slate-100 transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="p-5 space-y-2">
                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                                Tem certeza absoluta que deseja remover este registro clínico?
                            </p>
                            <p className="text-xs text-slate-400 leading-normal">
                                Esta ação é irreversível e removerá permanentemente o relato da linha do tempo oficial de consultas do paciente.
                            </p>
                            {error && <p className="text-xs font-semibold text-rose-650 mt-3">{error}</p>}
                        </div>

                        <div className="p-5 bg-slate-50/55 border-t flex justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setDeleteId(null)}
                                disabled={isPending}
                                className="h-9 text-xs"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="button"
                                onClick={handleDeleteConfirm}
                                disabled={isPending}
                                className="bg-red-600 hover:bg-red-700 h-9 text-xs text-white"
                            >
                                {isPending ? "Excluindo..." : "Sim, Excluir Registro"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
