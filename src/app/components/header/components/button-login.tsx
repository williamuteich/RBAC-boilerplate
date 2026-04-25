"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function ButtonLogin() {
    const { data: session } = useSession();

    const buttonBase = `flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-300 active:scale-95 whitespace-nowrap shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5`;
    const padding = "py-2 px-4 sm:px-7";

    if (session) {
        return (
            <div className="flex items-center justify-end gap-3 sm:gap-6">
                <div className="hidden md:flex flex-col items-end">
                    <span className="text-sm font-bold text-black leading-none">
                        {session.user.name?.split(' ')[0] || "Usuário"}
                    </span>
                    <span className="text-[9px] text-gray-500 font-medium">Logado</span>
                </div>
                <button
                    onClick={() => signOut()}
                    className={`${buttonBase} ${padding} cursor-pointer bg-neutral-900 text-white text-xs sm:text-sm hover:bg-neutral-800`}
                >
                    Sair
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-end gap-1.5 sm:gap-3">
            <button
                onClick={() => signIn("google")}
                className={`${buttonBase} ${padding} cursor-pointer bg-white border border-gray-100 text-gray-700 text-[10px] sm:text-sm group`}
            >
                <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 transition-transform group-hover:scale-110">
                    <svg viewBox="0 0 24 24" className="w-full h-full">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                    </svg>
                </div>
                <span className="hidden xs:inline">Entrar com Google</span>
                <span className="xs:hidden">Google</span>
            </button>
            <button
                onClick={() => signIn()}
                className={`${buttonBase} ${padding} cursor-pointer bg-orange-600 text-white text-[12px] sm:text-sm hover:bg-orange-700 hover:shadow-orange-600/30`}
            >
                Entrar
            </button>
        </div>
    );
}