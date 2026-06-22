import { Suspense } from "react";
import { DashboardEditor } from "./components/DashboardEditor";

export default function PainelPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-black text-[#2D2A4A] tracking-tight">
          Personalizar Minha Homenagem
        </h2>
        <p className="text-xs text-[#696684] mt-1">
          Gerencie os textos, músicas e fotos da sua página de amor. Suas alterações são aplicadas e salvas em tempo real.
        </p>
      </div>

      <Suspense fallback={
        <div className="w-full h-[500px] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#9A75F0] border-t-transparent animate-spin"></div>
        </div>
      }>
        <DashboardEditor />
      </Suspense>
    </div>
  );
}
