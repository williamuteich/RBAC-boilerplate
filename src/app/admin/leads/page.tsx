import { Suspense } from "react";
import { Target } from "lucide-react";
import { requirePermission } from "@/src/lib/auth-helpers/auth-helpers-server";
import { getLeads } from "@/src/services/leads";
import { LeadsDashboard } from "./components/leads-dashboard";
import NotAuthorized from "@/src/app/components/notAuthorized";

export const metadata = {
  title: "Leads – AdminCore",
  description: "Gerenciamento e exportação de leads convertidos.",
};

async function LeadsContent() {
  await requirePermission("clientes", "visualizar");

  const data = await getLeads();

  if (data === null) {
    return <NotAuthorized />;
  }

  return <LeadsDashboard initialLeads={data.leads} />;
}

export default async function LeadsPage() {
  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3 text-[#2D2A4A]">
          <Target className="h-8 w-8 text-[#9A75F0]" />
          Leads Convertidos
        </h1>
        <p className="text-xs text-[#696684] mt-2">
          Acompanhe e exporte os clientes que resgataram cupons de campanhas para otimizar os algoritmos de anúncios.
        </p>
      </div>

      <Suspense fallback={
        <div className="w-full h-48 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#9A75F0] border-t-transparent animate-spin"></div>
        </div>
      }>
        <LeadsContent />
      </Suspense>
    </div>
  );
}
