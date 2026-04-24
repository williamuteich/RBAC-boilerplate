"use client";

import { Bell, Moon, Search } from "lucide-react";
import { UserDropdown } from "./components/user-dropdown";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 w-full z-10 transition-all">
            <div className="flex items-center w-full max-w-lg">
                <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-full px-4 border border-transparent focus-within:bg-white focus-within:border-slate-300 focus-within:shadow-sm transition-all h-10 w-full max-w-sm">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400 text-slate-600"
                    />
                </div>
                <div className="md:hidden font-semibold text-lg text-slate-800">
                    Dashboard
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4 ml-auto shrink-0">
                <Button variant="ghost" size="icon" className="rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100 hidden sm:flex">
                    <Moon className="w-5 h-5" />
                </Button>
                <div className="relative">
                    <Button variant="ghost" size="icon" className="rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100">
                        <Bell className="w-5 h-5" />
                    </Button>
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </div>
                <div className="w-px h-8 bg-slate-200 mx-2 hidden sm:block"></div>
                <UserDropdown />
            </div>
        </header>
    );
}
