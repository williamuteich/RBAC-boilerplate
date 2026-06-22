"use client";

import { usePathname } from "next/navigation";
import { Heart, Edit3, ExternalLink, LogOut, MessageSquare } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (!session) return null;

  const user = session.user;
  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "US";

  const navigation = [
    {
      title: "Editar Homenagem",
      href: "/painel",
      icon: Edit3,
    },
    {
      title: "Ver Página",
      href: "/",
      icon: ExternalLink,
      external: true,
    },
    {
      title: "Suporte",
      href: "/painel/suporte",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r border-[#E8E6F5] font-sans">
      <div className="h-20 flex items-center px-6 border-b border-[#E8E6F5] shrink-0">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-[#9A75F0] to-[#8B5CF6] flex items-center justify-center shadow-md shadow-[#9A75F0]/20 group-hover:scale-105 transition-transform">
            <Heart className="w-4 h-4 text-white fill-white animate-pulse" />
          </div>
          <span className="font-bold text-lg tracking-tight bg-linear-to-r from-[#9A75F0] to-[#8B5CF6] bg-clip-text text-transparent">
            eterno.love
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1.5">
        <div className="text-[10px] font-bold text-slate-400 mb-2 px-3 tracking-widest uppercase">
          Meu Painel
        </div>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <div key={item.title} onClick={onClose}>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-[#EFEAFA]/40 transition-all cursor-pointer"
                >
                  <Icon className="w-4.5 h-4.5 shrink-0 text-slate-400" />
                  <span className="flex-1">{item.title}</span>
                </a>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-linear-to-r from-[#9A75F0]/10 to-[#8B5CF6]/10 text-[#8B5CF6]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-[#EFEAFA]/40"
                  }`}
                >
                  <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? "text-[#8B5CF6]" : "text-slate-400"}`} />
                  <span className="flex-1">{item.title}</span>
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-[#E8E6F5] p-4 shrink-0 bg-slate-50/50">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-9 h-9 border border-[#E8E6F5]">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback className="bg-rose-50 text-rose-600 font-bold">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-slate-800 truncate leading-none">{user.name || "Usuário"}</span>
            <span className="text-[10px] text-slate-400 truncate mt-1">{user.email}</span>
          </div>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="cursor-pointer w-full flex items-center justify-center gap-2 bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 font-bold py-2 px-4 rounded-xl border border-slate-200 hover:border-red-100 transition-all text-xs"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          <span>Sair do sistema</span>
        </button>
      </div>
    </div>
  );
}
