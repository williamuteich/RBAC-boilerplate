import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface NavItemProps {
    href: string;
    icon: ReactNode;
    children: ReactNode;
    active?: boolean;
}

export function NavItem({ href, icon, children, active }: NavItemProps) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group",
                active
                    ? "bg-indigo-50/70 text-indigo-600 shadow-sm shadow-indigo-100/50"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            )}
        >
            <div className="flex items-center gap-3">
                <div className={cn(
                    "flex items-center stroke-current",
                    active ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-500"
                )}>
                    {icon}
                </div>
                <span className="font-medium text-[15px]">{children}</span>
            </div>

            {active && (
                <ChevronRight className="w-4 h-4 text-indigo-400" />
            )}
        </Link>
    );
}
