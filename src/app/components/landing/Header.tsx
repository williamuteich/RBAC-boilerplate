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
            eterno.love
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-[#696684] hover:text-[#2D2A4A] hover:bg-[#EFEAFA]/50 text-xs font-semibold rounded-xl">
              Entrar
            </Button>
          </Link>
          <Link href="#simulador">
            <Button className="bg-linear-to-r from-[#9A75F0] to-[#8B5CF6] hover:from-[#855AE8] hover:to-[#7C3AED] text-white shadow-md shadow-[#9A75F0]/20 border-none font-bold text-xs px-5 py-2.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]">
              Criar Homenagem
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
