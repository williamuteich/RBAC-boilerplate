"use client"

import { useState } from "react";
import { User, Store } from "lucide-react";
import LoginAdmin from "./formulario/LoginAdmin";
import LoginLojista from "./formulario/LoginLojista";

export function LoginForm() {
  const [tipoAcesso, setTipoAcesso] = useState<"admin" | "lojista">("lojista");

  const handleSetTipoAcesso = (tipo: "admin" | "lojista") => {
    setTipoAcesso(tipo);
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-zinc-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-zinc-900 mb-2">Acesse sua conta</h2>
          <p className="text-zinc-500 text-sm">
            Escolha o tipo de acesso e entre com suas credenciais.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            type="button"
            className={`flex cursor-pointer flex-col items-start p-4 border rounded-xl transition-all ${tipoAcesso === "admin" ? "border-orange-500 bg-orange-50/50" : "border-zinc-200 bg-white hover:border-zinc-300"}`}
            onClick={() => handleSetTipoAcesso("admin")}
          >
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-orange-500" />
              <span className="font-semibold text-orange-700">
                Administrador
              </span>
            </div>
            <p className="text-xs text-left text-zinc-500">Gerencia lojistas e visão geral da plataforma</p>
          </button>

          <button
            type="button"
            className={`flex cursor-pointer flex-col items-start p-4 border rounded-xl transition-all ${tipoAcesso === "lojista" ? "border-orange-500 bg-orange-50/50" : "border-zinc-200 bg-white hover:border-zinc-300"}`}
            onClick={() => handleSetTipoAcesso("lojista")}
          >
            <div className="flex items-center gap-2 mb-2">
              <Store className="w-5 h-5 text-zinc-500" />
              <span className="font-semibold text-zinc-700">
                Lojista
              </span>
            </div>
            <p className="text-xs text-left text-zinc-500">Opera equipamentos, locações e devoluções</p>
          </button>
        </div>
        {
          tipoAcesso === "admin" ? <LoginAdmin /> : <LoginLojista />
        }
      </div>
    </div>
  );
}
