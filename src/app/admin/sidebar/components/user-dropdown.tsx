"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, ChevronDown } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export function UserDropdown() {
    const { data: session } = useSession();

    if (!session) return null;

    const user = session.user;
    const initials = user.name ? user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "AD";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 outline-none hover:bg-slate-50 p-1.5 rounded-lg transition-colors cursor-pointer">
                <Avatar className="w-9 h-9 border border-slate-200 pointer-events-none">
                    <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                    <AvatarFallback className="bg-indigo-100 text-indigo-700 font-medium">{initials}</AvatarFallback>
                </Avatar>
                <div className="hidden md:flex items-center gap-1.5 pointer-events-none">
                    <span className="text-sm font-medium text-slate-700">{user.name || "Administrador"}</span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64 p-2 shadow-lg rounded-xl border-slate-100">
                <div className="flex items-center gap-3 p-2 mb-2">
                    <Avatar className="w-10 h-10 border border-slate-200">
                        <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col flex-1 overflow-hidden">
                        <span className="text-sm font-semibold text-slate-800">{user.name || "Administrador"}</span>
                        <span className="text-xs text-slate-500 truncate">{user.email}</span>
                    </div>
                </div>
                <DropdownMenuSeparator className="bg-slate-100" />
                <div className="py-1">
                    <DropdownMenuItem
                        onClick={() => signOut({ callbackUrl: "/login-admin" })}
                        className="gap-3 py-2 cursor-pointer text-slate-600 focus:bg-red-50 focus:text-red-600 rounded-md"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Sair do sistema</span>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
