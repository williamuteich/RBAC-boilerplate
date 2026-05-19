"use client";

import { useState, useTransition, useEffect } from "react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Plus, Loader2, Trash2, Pencil, Search, ChevronLeft, ChevronRight,
    AlertTriangle, User, Phone, MapPin, FileText, CalendarDays
} from "lucide-react";
import { Paciente, PacientesResponse, PacienteFilters } from "@/src/types/dashboard/pacientes";
import {
    getPacientes, createPaciente, updatePaciente, deletePaciente
} from "@/src/services/pacientes";
import Link from "next/link";

async function fetchCep(cep: string) {
    const clean = cep.replace(/\D/g, "");
    if (clean.length !== 8) return null;
    const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
    const data = await res.json();
    return data.erro ? null : data;
}

const maskCPF = (value: string) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
};

const maskPhone = (value: string) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4,5})(\d{4})$/, "$1-$2");
};

const maskCEP = (value: string) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{3})\d+?$/, "$1");
};

function PacienteForm({
    editing,
    onSubmit,
    isPending,
    error,
}: {
    editing: Paciente | null;
    onSubmit: (data: FormData) => void;
    isPending: boolean;
    error: string;
}) {
    const [cepLoading, setCepLoading] = useState(false);
    const [addressFields, setAddressFields] = useState({
        state: editing?.state || "",
        city: editing?.city || "",
        street: editing?.street || "",
    });
    const [masks, setMasks] = useState({
        cpf: editing?.cpf || "",
        phone: editing?.phone || "",
        zipCode: editing?.zipCode || "",
    });

    const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        setCepLoading(true);
        const data = await fetchCep(e.target.value);
        if (data) {
            setAddressFields({ state: data.uf, city: data.localidade, street: data.logradouro });
            setMasks(prev => ({ ...prev, zipCode: maskCEP(e.target.value) }));
        }
        setCepLoading(false);
    };

    const handleMaskChange = (e: React.ChangeEvent<HTMLInputElement>, maskFn: (val: string) => string, field: string) => {
        setMasks(prev => ({ ...prev, [field]: maskFn(e.target.value) }));
    };

    return (
        <form
            key={editing?.id || "new"}
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(new FormData(e.currentTarget));
            }}
            className="space-y-4"
        >
            {error && <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">{error}</div>}

            <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 space-y-1">
                    <Label className="text-xs flex items-center gap-1"><User className="h-3 w-3" /> Nome Completo</Label>
                    <Input name="name" defaultValue={editing?.name || ""} placeholder="João da Silva" required />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs">CPF</Label>
                    <Input name="cpf" value={masks.cpf} onChange={e => handleMaskChange(e, maskCPF, 'cpf')} placeholder="000.000.000-00" required />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs flex items-center gap-1"><CalendarDays className="h-3 w-3" /> Data de Nascimento</Label>
                    <Input name="birthDate" type="date" defaultValue={editing?.birthDate ? new Date(editing.birthDate).toISOString().split("T")[0] : ""} required />
                </div>
                <div className="col-span-2 space-y-1">
                    <Label className="text-xs flex items-center gap-1"><Phone className="h-3 w-3" /> Telefone</Label>
                    <Input name="phone" value={masks.phone} onChange={e => handleMaskChange(e, maskPhone, 'phone')} placeholder="(51) 99999-9999" required />
                </div>
            </div>

            <div className="border-t pt-3">
                <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1 mb-3">
                    <MapPin className="h-3 w-3" /> Endereço
                </p>
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <Label className="text-xs">CEP</Label>
                        <div className="relative">
                            <Input name="zipCode" value={masks.zipCode} onChange={e => handleMaskChange(e, maskCEP, 'zipCode')} placeholder="00000-000" onBlur={handleCepBlur} required />
                            {cepLoading && <Loader2 className="absolute right-2 top-2.5 h-4 w-4 animate-spin text-blue-500" />}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Estado (UF)</Label>
                        <Input name="state" value={addressFields.state} onChange={e => setAddressFields(p => ({ ...p, state: e.target.value }))} placeholder="RS" required />
                    </div>
                    <div className="col-span-2 space-y-1">
                        <Label className="text-xs">Cidade</Label>
                        <Input name="city" value={addressFields.city} onChange={e => setAddressFields(p => ({ ...p, city: e.target.value }))} placeholder="Porto Alegre" required />
                    </div>
                    <div className="col-span-2 space-y-1">
                        <Label className="text-xs">Rua / Logradouro</Label>
                        <Input name="street" value={addressFields.street} onChange={e => setAddressFields(p => ({ ...p, street: e.target.value }))} placeholder="Rua das Flores" required />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Número</Label>
                        <Input name="number" defaultValue={editing?.number || ""} placeholder="123" required />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Complemento</Label>
                        <Input name="complement" defaultValue={editing?.complement || ""} placeholder="Apto 2B" />
                    </div>
                </div>
            </div>

            {editing && (
                <div className="flex items-center gap-2 pt-1">
                    <input name="active" type="checkbox" id="active" defaultChecked={editing.active} className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                    <Label htmlFor="active" className="cursor-pointer text-sm">Paciente Ativo</Label>
                </div>
            )}

            <DialogFooter>
                <Button type="submit" disabled={isPending} className="w-full bg-blue-600 hover:bg-blue-700">
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : (editing ? "Salvar Alterações" : "Cadastrar Paciente")}
                </Button>
            </DialogFooter>
        </form>
    );
}

export function PacientesManagement({ initialData }: { initialData: PacientesResponse }) {
    const [data, setData] = useState<PacientesResponse>(initialData);
    const [filters, setFilters] = useState<PacienteFilters>({ page: 1, limit: 20 });
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [editing, setEditing] = useState<Paciente | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            const isCpf = /[\d]/.test(searchTerm);
            if (searchTerm) {
                fetchPacientes({
                    ...filters,
                    name: isCpf ? undefined : searchTerm,
                    cpf: isCpf ? searchTerm : undefined,
                    page: 1
                });
            } else {
                fetchPacientes({
                    ...filters,
                    name: undefined,
                    cpf: undefined,
                    page: 1
                });
            }
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const fetchPacientes = (newFilters: PacienteFilters) => {
        startTransition(async () => {
            const result = await getPacientes(newFilters);
            if (result) { setData(result); setFilters(newFilters); }
        });
    };

    const handleAction = (formData: FormData) => {
        startTransition(async () => {
            const payload: any = {
                name: formData.get("name") as string,
                cpf: formData.get("cpf") as string,
                birthDate: formData.get("birthDate") as string,
                phone: formData.get("phone") as string,
                zipCode: formData.get("zipCode") as string,
                state: formData.get("state") as string,
                city: formData.get("city") as string,
                street: formData.get("street") as string,
                number: formData.get("number") as string,
                complement: formData.get("complement") as string || undefined,
            };

            if (editing) {
                payload.active = formData.get("active") === "on";
            }

            const res = editing
                ? await updatePaciente(editing.id, payload)
                : await createPaciente(payload);

            if (res.success) {
                setOpen(false);
                setEditing(null);
                setError("");
                fetchPacientes(filters);
            } else {
                setError(res.error || "Erro ao salvar");
            }
        });
    };

    const calcIdade = (birthDate: string) => {
        const hoje = new Date();
        const nasc = new Date(birthDate);
        let idade = hoje.getFullYear() - nasc.getFullYear();
        const m = hoje.getMonth() - nasc.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
        return idade;
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por nome ou CPF..."
                            className="pl-9 w-[260px] h-10 bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {isPending && <Loader2 className="h-5 w-5 animate-spin text-blue-500" />}
                </div>

                <Dialog open={open} onOpenChange={(val) => { if (!val) { setEditing(null); setError(""); } setOpen(val); }}>
                    <DialogTrigger render={
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 h-10">
                            <Plus className="mr-2 h-4 w-4" /> Novo Paciente
                        </Button>
                    } />
                    <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-blue-600" />
                                {editing ? "Editar Paciente" : "Novo Paciente"}
                            </DialogTitle>
                            <DialogDescription>Preencha os dados do paciente.</DialogDescription>
                        </DialogHeader>
                        <PacienteForm editing={editing} onSubmit={handleAction} isPending={isPending} error={error} />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-xl border bg-card/50 overflow-hidden shadow-sm">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead>Paciente</TableHead>
                            <TableHead>CPF</TableHead>
                            <TableHead>Idade</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>Cidade/UF</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.pacientes.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                                    Nenhum paciente cadastrado.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.pacientes.map((paciente) => (
                                <TableRow key={paciente.id} className={`hover:bg-muted/30 transition-opacity ${isPending ? "opacity-50" : ""}`}>
                                    <TableCell>
                                        <div className="font-medium text-slate-800">{paciente.name}</div>
                                    </TableCell>
                                    <TableCell className="text-sm text-slate-500 font-mono">{maskCPF(paciente.cpf)}</TableCell>
                                    <TableCell className="text-sm">{calcIdade(paciente.birthDate)} anos</TableCell>
                                    <TableCell className="text-sm">{maskPhone(paciente.phone)}</TableCell>
                                    <TableCell className="text-sm">{paciente.city}/{paciente.state}</TableCell>
                                    <TableCell>
                                        <Badge variant={paciente.active ? "default" : "secondary"}
                                            className={paciente.active ? "bg-emerald-500/10 text-emerald-600 border-emerald-200/50" : ""}>
                                            {paciente.active ? "Ativo" : "Inativo"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-1">
                                            <Link href={`/admin/pacientes/${paciente.id}`} title="Acessar Prontuário">
                                                <Button variant="ghost" size="icon-sm" type="button">
                                                    <FileText className="h-4 w-4 text-blue-500" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon-sm"
                                                onClick={() => { setEditing(paciente); setOpen(true); }}
                                                title="Editar"
                                            >
                                                <Pencil className="h-4 w-4 text-slate-500" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger render={
                                                    <Button variant="ghost" size="icon-sm" disabled={isPending}>
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                } />
                                                <AlertDialogContent className="border-red-100">
                                                    <AlertDialogHeader>
                                                        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-2">
                                                            <AlertTriangle className="h-6 w-6 text-red-600" />
                                                        </div>
                                                        <AlertDialogTitle>Remover Paciente?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Todos os prontuários de <strong>{paciente.name}</strong> serão excluídos permanentemente.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => startTransition(async () => {
                                                                const res = await deletePaciente(paciente.id);
                                                                if (res.success) fetchPacientes(filters);
                                                            })}
                                                            className="bg-red-600 hover:bg-red-700 text-white"
                                                        >
                                                            Sim, excluir
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                {data.totalPages > 1 && (
                    <div className="p-4 border-t bg-muted/20 flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                            Mostrando <span className="font-medium">{(data.page - 1) * data.limit + 1}</span>–
                            <span className="font-medium">{Math.min(data.page * data.limit, data.total)}</span> de
                            <span className="font-medium"> {data.total}</span> pacientes
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => fetchPacientes({ ...filters, page: data.page - 1 })} disabled={data.page === 1 || isPending}>
                                <ChevronLeft className="h-4 w-4" /> Anterior
                            </Button>
                            <span className="text-sm font-medium">{data.page} / {data.totalPages}</span>
                            <Button variant="outline" size="sm" onClick={() => fetchPacientes({ ...filters, page: data.page + 1 })} disabled={data.page === data.totalPages || isPending}>
                                Próximo <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
