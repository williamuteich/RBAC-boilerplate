"use client";

import { signIn } from "next-auth/react";
import { Heart, Music, Calendar, Mail, QrCode } from "lucide-react";

export function UserLoginForm() {
  return (
    <div className="w-full min-h-screen flex bg-[#FAF9FF] font-sans selection:bg-[#9A75F0] selection:text-white">

      <div className="relative hidden lg:flex lg:w-1/2 bg-slate-950 flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15 bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.15),transparent_50%)]" />
        <div className="absolute inset-0 z-0 bg-linear-to-br from-slate-950 via-slate-900/95 to-rose-950/40" />
        <div className="absolute bottom-0 right-0 w-96 h-96 z-0 rounded-full bg-rose-500/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-[#9A75F0] to-[#8B5CF6] flex items-center justify-center shadow-md shadow-[#9A75F0]/20">
            <Heart className="w-4 h-4 text-white fill-white animate-pulse" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Glamour Lindóia</span>
        </div>

        <div className="relative z-10 max-w-lg mt-12 mb-auto pt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold tracking-wider uppercase mb-6">
            Homenagem de Amor Eterna
          </div>

          <h1 className="text-4xl font-extrabold text-white leading-tight mb-5">
            A forma mais linda de dizer{" "}
            <span className="bg-linear-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
              "eu te amo"
            </span>{" "}
            para sempre.
          </h1>

          <p className="text-slate-400 text-sm leading-relaxed mb-10">
            Crie um espaço online premium com fotos, música tema, calendário marcante e sua carta de amor. O presente digital perfeito para emocionar quem você ama.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4 items-center">
              <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 text-rose-400">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Player do Casal</h3>
                <p className="text-slate-500 text-xs mt-0.5">Sua trilha sonora tocando em tempo real na página</p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 text-rose-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Calendário Especial</h3>
                <p className="text-slate-500 text-xs mt-0.5">Um marcador animado no dia exato em que tudo começou</p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 text-rose-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Carta de Amor</h3>
                <p className="text-slate-500 text-xs mt-0.5">Suas palavras eternizadas em uma carta digital refinada</p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 text-rose-400">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Link &amp; QR Code</h3>
                <p className="text-slate-500 text-xs mt-0.5">Pronto para imprimir, enviar pelo WhatsApp ou presentear</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Glamour Lindóia — Feito com amor para casais apaixonados
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-zinc-50 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#9A75F0]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md z-10">
          <div className="text-center mb-8 flex flex-col items-center">

            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mb-4 shadow-xs relative">
              <div className="absolute -inset-1 rounded-full bg-rose-100/50 animate-ping opacity-75"></div>
              <Heart className="w-6 h-6 fill-rose-500 text-rose-500 shrink-0 relative z-10" />
            </div>

            <h2 className="text-3xl font-black text-[#2D2A4A] tracking-tight mb-2">Glamour Lindóia</h2>
            <p className="text-[#696684] text-sm max-w-xs mt-1.5">
              Entre para criar sua página personalizada ou editar seu presente digital.
            </p>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-[0_15px_40px_rgba(45,42,74,0.03)] border border-[#E8E6F5]">
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/painel" })}
              className="cursor-pointer w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 px-6 rounded-2xl transition-all hover:shadow-md active:scale-[0.98] focus:outline-none text-xs"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Entrar ou Criar com o Google
            </button>

            <div className="mt-6 flex flex-col gap-1.5 items-center text-[10px] text-slate-400 text-center leading-relaxed">
              <span className="font-medium text-indigo-500">Ao clicar, sua conta e homenagem serão criadas na hora.</span>
              <span>Não é necessária senha para acessar.</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
