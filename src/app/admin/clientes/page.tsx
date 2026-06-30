import { ClientesDashboard } from "./components/clientes-dashboard";
import { Users } from "lucide-react";
import { getClientes } from "@/src/services/clientes";
import NotAuthorized from "@/src/app/components/notAuthorized";
import { Suspense } from "react";
import { requirePermission } from "@/src/lib/auth-helpers/auth-helpers-server";

async function ClientesContent({
  searchParamsPromise
}: {
  searchParamsPromise: Promise<{ [key: string]: string | undefined }>;
}) {
  await requirePermission("clientes", "visualizar");

  const searchParams = await searchParamsPromise;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = searchParams.search || undefined;
  const status = searchParams.status || undefined;
  const plan = searchParams.plan || undefined;

  const data = await getClientes({ page, limit, search, status, plan });

  if (data === null) {
    return <NotAuthorized />;
  }

  return <ClientesDashboard initialData={data} />;
}

export default async function ClientesAdminPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3 text-[#2D2A4A]">
          <Users className="h-8 w-8 text-[#9A75F0]" />
          Gestão de Clientes SaaS
        </h1>
        <p className="text-xs text-[#696684] mt-2">
          Visualize faturamento, assinantes ativos, vencimentos e simule acessos dos usuários do sistema.
        </p>
      </div>

      <Suspense fallback={
        <div className="w-full h-48 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#9A75F0] border-t-transparent animate-spin"></div>
        </div>
      }>
        <ClientesContent searchParamsPromise={searchParams} />
      </Suspense>
    </div >
  );
}
