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
import { Plus, Loader2, UserPlus, Mail, Shield, ShieldCheck, Trash2, Pencil, Clock, AlertTriangle } from "lucide-react";
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
}

interface Admin {
    id: number;
    email: string;
    name: string | null;
    active: boolean;
    createdAt: string;
    role: {
        id: number;
        name: string;
    } | null;
    lastLogin: string | null;
}

export function AdminManagement() {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Form state (Shared for Create/Edit)
    const [editingId, setEditingId] = useState<number | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [roleId, setRoleId] = useState("");
    const [active, setActive] = useState(true);

    async function fetchData() {
        setLoading(true);
        try {
            const [adminsRes, rolesRes] = await Promise.all([
                fetch("/api/admin/usuarios"),
                fetch("/api/admin/roles")
            ]);
            
            if (adminsRes.ok) setAdmins(await adminsRes.json());
            if (rolesRes.ok) setRoles(await rolesRes.json());
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const resetForm = () => {
        setEditingId(null);
        setName("");
        setEmail("");
        setRoleId("");
        setActive(true);
        setError("");
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setError("");

        const url = editingId ? `/api/admin/usuarios/${editingId}` : "/api/admin/usuarios";
        const method = editingId ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, roleId, active }),
            });

            if (res.ok) {
                setOpen(false);
                resetForm();
                fetchData();
            } else {
                const data = await res.json();
                setError(data.error || "Erro ao salvar administrador");
            }
        } catch (err) {
            setError("Erro de rede");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id: number) {
        try {
            const res = await fetch(`/api/admin/usuarios/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchData();
            } else {
                setError("Erro ao excluir administrador");
            }
        } catch (err) {
            console.error(err);
            setError("Ocorreu um erro inesperado");
        }
    }

    const startEdit = (admin: Admin) => {
        setEditingId(admin.id);
        setName(admin.name || "");
        setEmail(admin.email);
        setRoleId(admin.role?.id ? String(admin.role.id) : "");
        setActive(admin.active);
        setOpen(true);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Shield className="h-5 w-5 text-blue-500" />
                        Administradores
                    </h2>
                    <p className="text-sm text-muted-foreground">Gerencie quem tem acesso total ao painel administrativo.</p>
                </div>

                <Dialog open={open} onOpenChange={(val) => {
                    if (!val) resetForm();
                    setOpen(val);
                }}>
                    <DialogTrigger
                        render={
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Novo Administrador
                            </Button>
                        }
                    />
                    <DialogContent className="sm:max-w-[425px] border-none shadow-2xl">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <UserPlus className="h-5 w-5" />
                                {editingId ? "Editar Administrador" : "Criar Administrador"}
                            </DialogTitle>
                            <DialogDescription>
                                Preencha os dados abaixo para {editingId ? "atualizar o" : "criar um novo"} acesso administrativo.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome (Opcional)</Label>
                                <Input
                                    id="name"
                                    placeholder="Ex: João Silva"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="email@exemplo.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Cargo / Nível de Acesso</Label>
                                <select
                                    id="role"
                                    className="w-full px-3 py-2 border rounded-md bg-background text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    value={roleId}
                                    onChange={(e) => setRoleId(e.target.value)}
                                    required
                                >
                                    <option value="">Selecione um cargo</option>
                                    {roles
                                        .filter(role => role.name !== "Admin")
                                        .map((role) => (
                                            <option key={role.id} value={role.id}>
                                                {role.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            
                            {editingId && (
                                <div className="flex items-center gap-2 py-2">
                                    <input 
                                        type="checkbox" 
                                        id="active" 
                                        checked={active} 
                                        onChange={(e) => setActive(e.target.checked)} 
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                                    />
                                    <Label htmlFor="active" className="cursor-pointer">Acesso Ativo</Label>
                                </div>
                            )}

                            {error && <p className="text-sm text-red-500">{error}</p>}
                            <DialogFooter>
                                <Button type="submit" disabled={saving} className="w-full bg-blue-600">
                                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (editingId ? "Salvar Alterações" : "Liberar Acesso")}
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
                            <TableHead>Nome</TableHead>
                            <TableHead>E-mail</TableHead>
                            <TableHead>Cargo</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Último Login
                            </TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                                </TableCell>
                            </TableRow>
                        ) : admins.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                    Nenhum administrador encontrado.
                                </TableCell>
                            </TableRow>
                        ) : (
                            admins.map((admin) => (
                                <TableRow key={admin.id} className="hover:bg-muted/30">
                                    <TableCell className="font-medium">{admin.name || "Sem nome"}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-3 w-3 text-muted-foreground" />
                                            {admin.email}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {admin.role ? (
                                            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full w-fit text-xs font-semibold ${
                                                admin.role.name === "Admin" 
                                                ? "text-amber-600 bg-amber-50 border border-amber-200" 
                                                : "text-blue-600 bg-blue-50"
                                            }`}>
                                                <ShieldCheck className="h-3 w-3" />
                                                {admin.role.name}
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full w-fit text-xs font-medium border border-slate-200 italic">
                                                Sem cargo
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={admin.active ? "default" : "secondary"} className={admin.active ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" : ""}>
                                            {admin.active ? "Ativo" : "Inativo"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-xs text-muted-foreground">
                                        {admin.lastLogin 
                                            ? new Date(admin.lastLogin).toLocaleString("pt-BR", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit"
                                              }) 
                                            : "Nunca logou"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {admin.email !== "williamuteich14@gmail.com" ? (
                                                <>
                                                    <Button variant="ghost" size="icon-sm" onClick={() => startEdit(admin)}>
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
                                                                <AlertDialogTitle>Remover Administrador</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Tem certeza que deseja remover <strong>{admin.name || admin.email}</strong>? 
                                                                    Esta ação não poderá ser desfeita e o usuário perderá acesso imediato.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                <AlertDialogAction 
                                                                    onClick={() => handleDelete(admin.id)}
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
