"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import { ShieldCheck, Eye, Plus, Pencil, Trash2, ShieldIcon, Fingerprint } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ViewPermissionsProps } from "@/src/types/components";

const ACTION_ICONS: Record<string, any> = {
    visualizar: { icon: Eye, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
    criar: { icon: Plus, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
    editar: { icon: Pencil, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
    deletar: { icon: Trash2, color: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
};

export function ViewPermissions({ permissions, roleName }: ViewPermissionsProps) {
    const grouped: Record<string, string[]> = {};
    permissions.forEach(p => {
        const res = p.permission.resource;
        const action = p.permission.action;
        if (!grouped[res]) grouped[res] = [];
        grouped[res].push(action);
    });

    return (
        <Dialog>
            <DialogTrigger render={
                <button className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-200 shadow-sm cursor-pointer">
                    <Fingerprint className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Ver Acessos</span>
                </button>
            } />
            
            <DialogContent className="max-w-md sm:max-w-lg border-none shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-2xl font-black">
                        <div className="p-2 rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-slate-900">Permissões</span>
                            <span className="text-sm font-medium text-indigo-600">Cargo: {roleName}</span>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="pt-2 text-slate-500">
                        Nível de acesso granular configurado para este perfil de usuário.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar mt-4">
                    {Object.entries(grouped).length === 0 ? (
                        <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                            <ShieldIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-400 font-medium">Nenhuma permissão vinculada.</p>
                        </div>
                    ) : (
                        Object.entries(grouped).map(([resource, actions]) => (
                            <div key={resource} className="relative overflow-hidden p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-indigo-600" />
                                        <h4 className="font-black text-slate-800 uppercase tracking-tighter text-sm">
                                            {resource}
                                        </h4>
                                    </div>
                                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-[10px] font-bold border-none px-2.5">
                                        {actions.length} {actions.length === 1 ? 'AÇÃO' : 'AÇÕES'}
                                    </Badge>
                                </div>
                                
                                <div className="flex flex-wrap gap-2">
                                    {actions.map(action => {
                                        const config = ACTION_ICONS[action] || { icon: ShieldIcon, color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-100" };
                                        const Icon = config.icon;
                                        
                                        return (
                                            <div 
                                                key={action} 
                                                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-bold border ${config.bg} ${config.color} ${config.border} transition-transform hover:scale-105 cursor-default`}
                                            >
                                                <Icon className="w-3 h-3" />
                                                <span className="capitalize">{action}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
