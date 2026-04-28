"use client";

import { useState, useTransition } from "react";
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
import { Plus, Loader2, Mail, Shield, ShieldCheck, Trash2, Pencil, Clock, AlertTriangle } from "lucide-react";
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
import { Admin, Role } from "@/src/types/dashboard/admins";
import { createAdmin, updateAdmin, deleteAdmin } from "@/src/services/administrator";

export function AdminManagement({ 
    initialAdmins, 
    initialRoles 
}: { 
    initialAdmins: Admin[], 
    initialRoles: Role[] 
}) {
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);

    const handleAction = (formData: FormData) => {
        startTransition(async () => {
            const name = formData.get("name") as string;
            const email = formData.get("email") as string;
            const roleId = formData.get("roleId") as string;
            const active = formData.get("active") === "on";
            
            const data = { name, email, roleId, active };
            const res = editingAdmin ? await updateAdmin(editingAdmin.id, data) : await createAdmin(data);
            
            if (res.success) {
                setOpen(false);
            } else {
                setError(res.error || "Erro ao salvar");
            }
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2"><Shield className="h-5 w-5 text-blue-500" /> Administradores</h2>
                    <p className="text-sm text-muted-foreground">Gerencie quem tem acesso total ao painel administrativo.</p>
                </div>

                <Dialog open={open} onOpenChange={(val) => { if (!val) { setEditingAdmin(null); setError(""); } setOpen(val); }}>
                    <DialogTrigger render={<Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"><Plus className="mr-2 h-4 w-4" /> Novo Administrador</Button>} />
                    <DialogContent className="sm:max-w-[425px]">
                        <form key={editingAdmin?.id || "new-admin"} action={handleAction}>
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-blue-600" /> {editingAdmin ? "Editar Administrador" : "Novo Administrador"}</DialogTitle>
                                <DialogDescription>Configure o acesso do administrador.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                {error && <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">{error}</div>}
                                <div className="space-y-2">
                                    <Label>Nome Completo</Label>
                                    <Input name="name" defaultValue={editingAdmin?.name || ""} placeholder="Ex: William Uteich" required />
                                </div>
                                <div className="space-y-2">
                                    <Label>E-mail Profissional</Label>
                                    <Input name="email" type="email" defaultValue={editingAdmin?.email || ""} placeholder="exemplo@empresa.com" required />
                                </div>
                                <div className="space-y-2">
                                    <Label>Cargo / Nível de Acesso</Label>
                                    <select name="roleId" className="w-full px-3 py-2 border rounded-md bg-background text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" defaultValue={editingAdmin?.role?.id ? String(editingAdmin.role.id) : ""} required>
                                        <option value="">Selecione um cargo</option>
                                        {initialRoles.filter(role => role.name !== "Admin").map((role) => (
                                            <option key={role.id} value={String(role.id)}>{role.name}</option>
                                        ))}
                                    </select>
                                </div>
                                {editingAdmin && (
                                    <div className="flex items-center gap-2 py-2">
                                        <input name="active" type="checkbox" id="active" defaultChecked={editingAdmin.active} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                                        <Label htmlFor="active" className="cursor-pointer">Acesso Ativo</Label>
                                    </div>
                                )}
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={isPending} className="w-full bg-blue-600">
                                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Salvar"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-xl border bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>E-mail</TableHead>
                            <TableHead>Cargo</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="flex items-center gap-1"><Clock className="h-3 w-3" /> Último Login</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialAdmins.map((admin) => (
                            <TableRow key={admin.id} className={`hover:bg-muted/30 transition-opacity ${isPending ? 'opacity-50' : ''}`}>
                                <TableCell className="font-medium text-slate-800">{admin.name || "Sem nome"}</TableCell>
                                <TableCell><div className="flex items-center gap-2 text-slate-600 italic"><Mail className="h-3 w-3" /> {admin.email}</div></TableCell>
                                <TableCell>
                                    {admin.role ? (
                                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full w-fit text-[11px] font-bold tracking-tight shadow-sm ${admin.role.name === "Admin" ? "text-amber-700 bg-amber-50 border border-amber-200" : "text-blue-700 bg-blue-50 border border-blue-100"}`}>
                                            <ShieldCheck className="h-3 w-3" /> {admin.role.name}
                                        </div>
                                    ) : <span className="text-xs text-muted-foreground">-</span>}
                                </TableCell>
                                <TableCell><Badge variant={admin.active ? "default" : "secondary"} className={admin.active ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-200/50" : ""}>{admin.active ? "Ativo" : "Inativo"}</Badge></TableCell>
                                <TableCell className="text-xs text-muted-foreground">{admin.lastLogin ? new Date(admin.lastLogin).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "Nunca logou"}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        {admin.email !== "williamuteich14@gmail.com" ? (
                                            <>
                                                <Button variant="ghost" size="icon-sm" onClick={() => { setEditingAdmin(admin); setOpen(true); }} disabled={isPending}><Pencil className="h-4 w-4 text-slate-500" /></Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger render={<Button variant="ghost" size="icon-sm" disabled={isPending}><Trash2 className="h-4 w-4 text-red-500" /></Button>} />
                                                    <AlertDialogContent className="border-red-100">
                                                        <AlertDialogHeader>
                                                            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-2"><AlertTriangle className="h-6 w-6 text-red-600" /></div>
                                                            <AlertDialogTitle>Remover Administrador</AlertDialogTitle>
                                                            <AlertDialogDescription>Remover <strong>{admin.name || admin.email}</strong>?</AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                            <AlertDialogAction disabled={isPending} onClick={() => startTransition(async () => {
                                                                const res = await deleteAdmin(admin.id);
                                                                if (!res.success) setError(res.error || "Erro ao excluir");
                                                            })} className="bg-red-600 hover:bg-red-700 text-white">Sim, excluir</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </>
                                        ) : <div className="px-2 py-1 text-[10px] font-bold text-amber-600 uppercase tracking-widest border border-amber-200 rounded bg-amber-50">Sistema</div>}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
