import { Ticket } from "lucide-react";
import { getCoupons } from "@/src/services/cupons";
import NotAuthorized from "@/src/app/components/notAuthorized";
import { Suspense } from "react";
import { CuponsDashboard } from "./components/cupons-dashboard";
import { requirePermission } from "@/src/lib/auth-helpers/auth-helpers-server";

async function CuponsContent({
    searchParamsPromise
}: {
    searchParamsPromise: Promise<{ [key: string]: string | undefined }>;
}) {
    await requirePermission("cupons", "visualizar");

    const searchParams = await searchParamsPromise;
    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 10;
    const search = searchParams.search || undefined;
    const status = searchParams.status || undefined;

    const data = await getCoupons({ page, limit, search, status });

    if (data === null) {
        return <NotAuthorized />;
    }

    return <CuponsDashboard initialData={data} />;
}

export default async function CuponsAdminPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    return (
        <div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3 text-[#2D2A4A]">
                    <Ticket className="h-8 w-8 text-[#9A75F0]" />
                    Gestão de Cupons
                </h1>
                <p className="text-xs text-[#696684] mt-2">
                    Gere novos cupons de ativação, gerencie códigos gerados e monitore o uso pelos clientes.
                </p>
            </div>

            <Suspense fallback={
                <div className="w-full h-48 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-[#9A75F0] border-t-transparent animate-spin"></div>
                </div>
            }>
                <CuponsContent searchParamsPromise={searchParams} />
            </Suspense>
        </div>
    );
}
