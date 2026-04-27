"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";

export function UserDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 outline-none hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
                <Avatar className="w-9 h-9 border border-slate-200">
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="John Smith" />
                    <AvatarFallback className="bg-indigo-100 text-indigo-700 font-medium">JS</AvatarFallback>
                </Avatar>
                <div className="hidden md:flex items-center gap-1.5">
                    <span className="text-sm font-medium text-slate-700">John Smith</span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64 p-2 shadow-lg rounded-xl border-slate-100">
                <div className="flex items-center gap-3 p-2 mb-2">
                    <Avatar className="w-10 h-10 border border-slate-200">
                        <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="John Smith" />
                        <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col flex-1 overflow-hidden">
                        <span className="text-sm font-semibold text-slate-800">John Smith</span>
                        <span className="text-xs text-slate-500 truncate">johnson@nextadmin.com</span>
                    </div>
                </div>
                <DropdownMenuSeparator className="bg-slate-100" />

                <div className="py-1">
                    <DropdownMenuItem className="gap-3 py-2 cursor-pointer focus:bg-slate-50 focus:text-indigo-600 rounded-md">
                        <User className="w-4 h-4 text-slate-500" />
                        <span className="text-sm font-medium">Ver perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-3 py-2 cursor-pointer focus:bg-slate-50 focus:text-indigo-600 rounded-md">
                        <Settings className="w-4 h-4 text-slate-500" />
                        <span className="text-sm font-medium">Configurações da conta</span>
                    </DropdownMenuItem>
                </div>

                <DropdownMenuSeparator className="bg-slate-100" />
                <div className="py-1">
                    <DropdownMenuItem className="gap-3 py-2 cursor-pointer text-slate-600 focus:bg-red-50 focus:text-red-600 rounded-md">
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Log out</span>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
