"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { NavItem } from "./nav-item";
import { hasPermission } from "@/src/lib/auth-helpers";
import { ADMIN_NAVIGATION } from "@/src/lib/navigation";
import React from "react";

export function SidebarContent({ onClose }: { onClose?: () => void }) {
    const pathname = usePathname();
    const { data: session } = useSession();

    if (!session) return null;

    const sections = ["CLÍNICA", "ADMINISTRAÇÃO", "SISTEMA"] as const;

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
