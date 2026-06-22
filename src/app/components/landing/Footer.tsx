import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#E8E6F5] bg-white py-10 mt-12">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#9A75F0] flex items-center justify-center">
            <Heart className="w-3 h-3 text-white fill-white" />
          </div>
          <span className="font-bold text-sm tracking-tight text-[#2D2A4A]">
            Glamour Lindóia
          </span>
        </div>

        <p className="text-[#696684] text-xs text-center md:text-right">
          &copy; 2026 Glamour Lindóia. Feito para aproximar corações. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
