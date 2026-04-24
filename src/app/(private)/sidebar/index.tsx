"use client";

import { LayoutDashboard, Calendar, UserRound } from "lucide-react";
import { NavItem } from "./components/nav-item";

export function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col h-full shrink-0 relative transition-transform">
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

                <NavItem href="/dashboard" icon={<LayoutDashboard strokeWidth={2.5} size={18} />} active>
                    Dashboard
                </NavItem>
                <NavItem href="#" icon={<Calendar strokeWidth={2.5} size={18} />}>
                    Calendar
                </NavItem>
                <NavItem href="#" icon={<UserRound strokeWidth={2.5} size={18} />}>
                    Profile
                </NavItem>
            </div>
        </aside>
    );
}
