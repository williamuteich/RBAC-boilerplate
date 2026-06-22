"use client";

import { Menu, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

export function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  if (!session) return null;

  const user = session.user;
  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "US";

  return (
    <header className="h-20 bg-white border-b border-[#E8E6F5] px-4 md:px-6 flex items-center justify-between shrink-0">
      
      <div className="flex items-center gap-3">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="cursor-pointer lg:hidden p-2 hover:bg-slate-50 rounded-lg text-slate-500 hover:text-slate-800 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 border-r-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Menu de Navegação</SheetTitle>
            </SheetHeader>
            <Sidebar onClose={() => setOpen(false)} />
          </SheetContent>
        </Sheet>

        <h1 className="text-base font-bold text-slate-800 tracking-tight hidden sm:block">
          Editar Presente Digital
        </h1>
        
        <div className="flex items-center gap-1.5 sm:hidden font-bold text-base text-slate-800">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span>eterno.love</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex flex-col text-right">
          <span className="text-xs font-bold text-slate-800">{user.name || "Usuário"}</span>
          <span className="text-[10px] text-slate-400 mt-0.5">{user.email}</span>
        </div>
        
        <Avatar className="w-9 h-9 border border-[#E8E6F5]">
          <AvatarImage src={user.image || ""} alt={user.name || "User"} />
          <AvatarFallback className="bg-rose-50 text-rose-600 font-bold">{initials}</AvatarFallback>
        </Avatar>
      </div>

    </header>
  );
}
