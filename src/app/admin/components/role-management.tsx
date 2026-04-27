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
import { Badge } from "@/components/ui/badge";
import { Plus, Loader2, ShieldAlert, Key, CheckCircle2, Pencil, Trash2 } from "lucide-react";

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

const RESOURCES = ["usuarios", "configuracoes", "relatorios"];
const ACTIONS = ["visualizar", "criar", "editar", "deletar"];

export function RoleManagement() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Form state
    const [editingId, setEditingId] = useState<number | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState<{resource: string, action: string}[]>([]);

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
        if (!confirm("Tem certeza que deseja remover este cargo?")) return;

        try {
            const res = await fetch(`/api/admin/roles/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchRoles();
            } else {
                const data = await res.json();
                alert(data.error || "Erro ao excluir cargo");
            }
        } catch (err) {
            console.error(err);
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
                                    {RESOURCES.map(resource => (
                                        <div key={resource} className="space-y-2 border rounded-lg p-3 bg-muted/30">
                                            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                                {resource}
                                            </h4>
                                            <div className="grid grid-cols-2 gap-2">
                                                {ACTIONS.map(action => {
                                                    const isSelected = selectedPermissions.some(p => p.resource === resource && p.action === action);
                                                    return (
                                                        <button
                                                            key={action}
                                                            type="button"
                                                            onClick={() => togglePermission(resource, action)}
                                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                                                                isSelected 
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
                                            {(() => {
                                                const grouped: Record<string, string[]> = {};
                                                role.permissions.forEach(p => {
                                                    const res = p.permission.resource;
                                                    const action = p.permission.action;
                                                    const code = action === "visualizar" ? "V" : 
                                                                action === "criar" ? "C" : 
                                                                action === "editar" ? "E" : 
                                                                action === "deletar" ? "D" : action.charAt(0).toUpperCase();
                                                    
                                                    if (!grouped[res]) grouped[res] = [];
                                                    grouped[res].push(code);
                                                });

                                                return Object.entries(grouped).map(([resource, codes]) => (
                                                    <div key={resource} className="flex items-center gap-2">
                                                        <span className="text-[10px] font-bold uppercase text-slate-400 w-20">{resource}:</span>
                                                        <div className="flex gap-1">
                                                            {codes.map((code, idx) => (
                                                                <span key={idx} className="flex items-center justify-center w-5 h-5 text-[9px] font-bold bg-indigo-50 text-indigo-600 rounded-md border border-indigo-100">
                                                                    {code}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ));
                                            })()}
                                            {role.permissions.length === 0 && (
                                                <span className="text-xs text-muted-foreground italic">Sem permissões</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon-sm" onClick={() => startEdit(role)}>
                                                <Pencil className="h-4 w-4 text-slate-500" />
                                            </Button>
                                            <Button variant="ghost" size="icon-sm" onClick={() => handleDelete(role.id)}>
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
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
