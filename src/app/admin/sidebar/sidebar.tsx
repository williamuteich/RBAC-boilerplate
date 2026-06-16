"use client";

import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { NavItem } from "./components/nav-item";
import { hasPermission } from "@/src/lib/auth-helpers/auth-helpers";
import { ADMIN_NAVIGATION } from "@/src/lib/navigation";
import React from "react";

export function SidebarContent({ session: propSession, onClose }: { session?: Session; onClose?: () => void }) {
    const pathname = usePathname();
    const { data: hookSession } = useSession();
    const session = propSession || hookSession;

    if (!session) return null;

    const sections = ["MAIN MENU"] as const;

    return (
        <div className="flex flex-col h-full bg-white border-r border-slate-200 lg:border-none">
            <div className="h-20 flex items-center px-6 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-3 font-semibold text-2xl text-slate-800 tracking-tight">
                    <div className="relative w-9 h-9 rounded-xl bg-linear-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center shadow-md shadow-indigo-100">
                        <div className="absolute inset-0.5 rounded-lg border border-white/20"></div>
                        <span className="text-white font-black text-base tracking-tighter">A</span>
                    </div>
                    <span className="bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent font-black tracking-tight text-xl">AdminCore</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-3 px-3 flex flex-col gap-1 custom-scrollbar">
                {sections.map(section => {
                    const sectionItems = ADMIN_NAVIGATION.filter(item => item.section === section);

                    const visibleItems = sectionItems.filter(item => {
                        if (!item.resource) return true;
                        return hasPermission(session, item.resource, "visualizar");
                    });

                    if (visibleItems.length === 0) return null;

                    return (
                        <React.Fragment key={section}>
                            <div className="text-[11px] font-semibold text-slate-400 mb-2 px-3 tracking-wider mt-4 uppercase">
                                {section}
                            </div>
                            {visibleItems.map(item => (
                                <div key={item.title} onClick={onClose}>
                                    <NavItem
                                        href={item.href}
                                        icon={<item.icon strokeWidth={2.5} size={18} />}
                                        active={pathname === item.href}
                                    >
                                        {item.title}
                                    </NavItem>
                                </div>
                            ))}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}
