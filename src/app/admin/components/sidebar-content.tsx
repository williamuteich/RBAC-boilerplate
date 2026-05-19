"use client";

import { usePathname } from "next/navigation";
import { NavItem } from "./nav-item";
import { Session } from "next-auth";
import { hasPermission } from "@/src/lib/auth-helpers";
import { ADMIN_NAVIGATION } from "@/src/lib/navigation";

export function SidebarContent({
    session,
    onClose,
}: {
    session: Session;
    onClose?: () => void;
}) {
    const pathname = usePathname();

    const sections = [
        "CLÍNICA",
        "ADMINISTRAÇÃO",
        "SISTEMA",
    ] as const;

    return (
        <div className="flex h-full flex-col border-r border-slate-200/80 bg-white">
            <div className="flex h-20 items-center px-6 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-600 to-violet-600 shadow-sm">
                        <div className="h-3 w-3 rounded-full bg-white" />
                    </div>

                    <div className="flex flex-col leading-tight">
                        <span className="text-[15px] font-semibold tracking-tight text-slate-800">
                            NextAdmin
                        </span>

                        <span className="text-xs text-slate-400">
                            Painel administrativo
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar">
                <div className="space-y-6">
                    {sections.map(section => {
                        const sectionItems = ADMIN_NAVIGATION.filter(
                            item => item.section === section
                        );

                        const visibleItems = sectionItems.filter(item => {
                            if (!item.resource) return true;

                            return hasPermission(
                                session,
                                item.resource,
                                "visualizar"
                            );
                        });

                        if (visibleItems.length === 0) {
                            return null;
                        }

                        return (
                            <section key={section} className="space-y-2">
                                <div className="px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                                    {section}
                                </div>

                                <div className="space-y-1">
                                    {visibleItems.map(item => {
                                        const isActive =
                                            item.href === "/admin"
                                                ? pathname === "/admin"
                                                : pathname === item.href ||
                                                  pathname?.startsWith(
                                                      `${item.href}/`
                                                  );

                                        return (
                                            <div
                                                key={item.title}
                                                onClick={onClose}
                                            >
                                                <NavItem
                                                    href={item.href}
                                                    icon={
                                                        <item.icon
                                                            size={18}
                                                            strokeWidth={2.2}
                                                        />
                                                    }
                                                    active={isActive}
                                                >
                                                    {item.title}
                                                </NavItem>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}