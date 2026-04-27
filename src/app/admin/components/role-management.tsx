"use client";

import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Loader2, ShieldAlert, Key, CheckCircle2, Pencil, Trash2, AlertTriangle } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Role {
    id: number;
    name: string;
    description: string | null;
    permissions: {
        permission: {
            resource: string;
            action: string;
        }
    }[];
}

import { ALL_RESOURCES, ALL_ACTIONS } from "@/src/lib/navigation";
import { ViewPermissions } from "./view-permissions";

export function RoleManagement() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [editingId, setEditingId] = useState<number | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState<{ resource: string, action: string }[]>([]);

    async function fetchRoles() {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/roles");
            if (res.ok) {
                setRoles(await res.json());
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRoles();
    }, []);

    const resetForm = () => {
        setEditingId(null);
        setName("");
        setDescription("");
        setSelectedPermissions([]);
        setError("");
    };

    const togglePermission = (resource: string, action: string) => {
        setSelectedPermissions(prev => {
            const exists = prev.find(p => p.resource === resource && p.action === action);
            if (exists) {
                return prev.filter(p => !(p.resource === resource && p.action === action));
            }
            return [...prev, { resource, action }];
        });
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (selectedPermissions.length === 0) {
            setError("Selecione ao menos uma permissão");
            return;
        }
        setSaving(true);
        setError("");

        const url = editingId ? `/api/admin/roles/${editingId}` : "/api/admin/roles";
        const method = editingId ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    description,
                    permissions: selectedPermissions
                }),
            });

            if (res.ok) {
                setOpen(false);
                resetForm();
                fetchRoles();
            } else {
                const data = await res.json();
                setError(data.error || "Erro ao salvar cargo");
            }
        } catch (err) {
            setError("Erro de rede");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id: number) {
        try {
            const res = await fetch(`/api/admin/roles/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchRoles();
            } else {
                const data = await res.json();
                setError(data.error || "Erro ao excluir cargo");
            }
        } catch (err) {
            console.error(err);
            setError("Erro de rede ao excluir");
        }
    }

    const startEdit = (role: Role) => {
        setEditingId(role.id);
        setName(role.name);
        setDescription(role.description || "");
        setSelectedPermissions(role.permissions.map(p => ({
            resource: p.permission.resource,
            action: p.permission.action
        })));
        setOpen(true);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Key className="h-5 w-5 text-indigo-500" />
                        Gestão de Cargos
                    </h2>
                    <p className="text-sm text-muted-foreground">Defina os níveis de acesso e permissões do sistema.</p>
                </div>

                <Dialog open={open} onOpenChange={(val) => {
                    if (!val) resetForm();
                    setOpen(val);
                }}>
                    <DialogTrigger
                        render={
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Novo Cargo
                            </Button>
                        }
                    />
                    <DialogContent className="sm:max-w-[500px] border-none shadow-2xl overflow-y-auto max-h-[90vh]">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <ShieldAlert className="h-5 w-5" />
                                {editingId ? "Editar Cargo" : "Criar Novo Cargo"}
                            </DialogTitle>
                            <DialogDescription>
                                Nomeie o cargo e selecione as permissões granulares.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6 py-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="role-name">Nome do Cargo</Label>
                                    <Input
                                        id="role-name"
                                        placeholder="Ex: Gerente de Suporte"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role-desc">Descrição (Opcional)</Label>
                                    <Input
                                        id="role-desc"
                                        placeholder="Ex: Acesso total a usuários e relatórios"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-base font-semibold">Permissões</Label>
                                <div className="grid gap-4">
                                    {ALL_RESOURCES.map(resource => (
                                        <div key={resource} className="space-y-2 border rounded-lg p-3 bg-muted/30">
                                            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                                {resource}
                                            </h4>
                                            <div className="grid grid-cols-2 gap-2">
                                                {ALL_ACTIONS.map(action => {
                                                    const isSelected = selectedPermissions.some(p => p.resource === resource && p.action === action);
                                                    return (
                                                        <button
                                                            key={action}
                                                            type="button"
                                                            onClick={() => togglePermission(resource, action)}
                                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${isSelected
                                                                ? "bg-indigo-600 text-white shadow-sm"
                                                                : "bg-white border text-zinc-600 hover:border-indigo-300"
                                                                }`}
                                                        >
                                                            {isSelected && <CheckCircle2 className="h-3 w-3" />}
                                                            {action.charAt(0).toUpperCase() + action.slice(1)}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

                            <DialogFooter>
                                <Button type="submit" disabled={saving} className="w-full bg-indigo-600">
                                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (editingId ? "Salvar Alterações" : "Salvar Cargo")}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-xl border bg-card/50 backdrop-blur-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead>Cargo</TableHead>
                            <TableHead>Descrição</TableHead>
                            <TableHead>Permissões</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8">
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                                </TableCell>
                            </TableRow>
                        ) : roles.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                    Nenhum cargo encontrado.
                                </TableCell>
                            </TableRow>
                        ) : (
                            roles.map((role) => (
                                <TableRow key={role.id} className="hover:bg-muted/30">
                                    <TableCell className="font-bold text-slate-800">{role.name}</TableCell>
                                    <TableCell className="text-sm text-slate-500">{role.description || "-"}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1.5">
                                            <ViewPermissions permissions={role.permissions} roleName={role.name} />

                                            {role.permissions.length === 0 && (
                                                <span className="text-xs text-muted-foreground italic">Sem permissões</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {role.name !== "Admin" ? (
                                                <>
                                                    <Button variant="ghost" size="icon-sm" onClick={() => startEdit(role)}>
                                                        <Pencil className="h-4 w-4 text-slate-500" />
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger render={
                                                            <Button variant="ghost" size="icon-sm">
                                                                <Trash2 className="h-4 w-4 text-red-500" />
                                                            </Button>
                                                        } />
                                                        <AlertDialogContent className="border-red-100">
                                                            <AlertDialogHeader>
                                                                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-2">
                                                                    <AlertTriangle className="h-6 w-6 text-red-600" />
                                                                </div>
                                                                <AlertDialogTitle>Remover Cargo</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Tem certeza que deseja remover o cargo <strong>{role.name}</strong>?
                                                                    Esta ação é irreversível e pode afetar o acesso de vários administradores vinculados a este cargo.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleDelete(role.id)}
                                                                    className="bg-red-600 hover:bg-red-700 text-white"
                                                                >
                                                                    Sim, excluir
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </>
                                            ) : (
                                                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-200 rounded bg-slate-50">
                                                    Sistema
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
