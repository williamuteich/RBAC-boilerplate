"use client";

import { LayoutDashboard, Calendar, UserRound, ShieldCheck, Key } from "lucide-react";
import { NavItem } from "./nav-item";
import { usePathname } from "next/navigation";

export function SidebarContent({ onClose }: { onClose?: () => void }) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full bg-white border-r border-slate-200 lg:border-none">
            <div className="h-20 flex items-center px-6 border-b border-transparent shrink-0">
                <div className="flex items-center gap-3 font-semibold text-2xl text-slate-800 tracking-tight">
                    <div className="w-8 h-8 rounded-full bg-linear-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-sm">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    NextAdmin
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-3 px-3 flex flex-col gap-1 custom-scrollbar">
                <div className="text-[11px] font-semibold text-slate-400 mb-2 px-3 tracking-wider mt-4">MAIN MENU</div>

                <div onClick={onClose}>
                    <NavItem href="/admin" icon={<LayoutDashboard strokeWidth={2.5} size={18} />} active={pathname === "/admin"}>
                        Dashboard
                    </NavItem>
                </div>
                <div onClick={onClose}>
                    <NavItem href="/admin/usuarios" icon={<ShieldCheck strokeWidth={2.5} size={18} />} active={pathname === "/admin/usuarios"}>
                        Administradores
                    </NavItem>
                </div>
                <div onClick={onClose}>
                    <NavItem href="/admin/cargos" icon={<Key strokeWidth={2.5} size={18} />} active={pathname === "/admin/cargos"}>
                        Cargos e Permissões
                    </NavItem>
                </div>
                
                <div className="text-[11px] font-semibold text-slate-400 mb-2 px-3 tracking-wider mt-4">SISTEMA</div>
                
                <div onClick={onClose}>
                    <NavItem href="#" icon={<Calendar strokeWidth={2.5} size={18} />}>
                        Calendário
                    </NavItem>
                </div>
                <div onClick={onClose}>
                    <NavItem href="#" icon={<UserRound strokeWidth={2.5} size={18} />}>
                        Perfil
                    </NavItem>
                </div>
            </div>
        </div>
    );
}
