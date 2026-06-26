import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b border-[#E8E6F5] bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-[#9A75F0] to-[#8B5CF6] flex items-center justify-center shadow-md shadow-[#9A75F0]/20 group-hover:scale-105 transition-transform">
            <Heart className="w-4 h-4 text-white fill-white animate-pulse" />
          </div>
          <span className="font-bold text-lg tracking-tight bg-linear-to-r from-[#9A75F0] to-[#8B5CF6] bg-clip-text text-transparent">
            Glamour Lindóia
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex items-center gap-5">
            <Link href="#como-funciona" className="text-xs font-semibold text-[#696684] hover:text-[#2D2A4A] transition-colors">
              Como Funciona
            </Link>
            <Link href="#precos" className="text-xs font-semibold text-[#696684] hover:text-[#2D2A4A] transition-colors">
              Preços
            </Link>
          </nav>
          <Link href="/login">
            <Button className="bg-linear-to-r from-[#9A75F0] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#7C3AED] text-white text-xs font-bold rounded-xl px-5 py-2 shadow-md shadow-[#9A75F0]/15 hover:shadow-lg hover:shadow-[#9A75F0]/25 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] border-0 cursor-pointer">
              Entrar
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
