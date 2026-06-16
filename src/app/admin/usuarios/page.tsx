import { AdminManagement } from "./components/admin-management";
import { ShieldCheck } from "lucide-react";
import { getAdmins, getRoles } from "@/src/services/administrator";
import NotAuthorized from "@/src/app/components/notAuthorized";
import { Suspense } from "react";

async function UsersContent({
    searchParamsPromise
}: {
    searchParamsPromise: Promise<{ [key: string]: string | undefined }>;
}) {
    const searchParams = await searchParamsPromise;
    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 20;
    const name = searchParams.name || undefined;

    const initialAdmins = await getAdmins({ page, limit, name });
    const initialRoles = await getRoles();

    if (initialAdmins === null || initialRoles === null) {
        return <NotAuthorized />;
    }

    return (
        <AdminManagement
            initialData={initialAdmins}
            initialRoles={initialRoles}
        />
    );
}

export default async function UsuariosAdminPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    return (
        <div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <ShieldCheck className="h-8 w-8 text-blue-600" />
                    Gestão de Administradores
                </h1>
                <p className="text-muted-foreground mt-2">
                    Gerencie os usuários que possuem acesso administrativo ao sistema.
                </p>
            </div>

            <Suspense fallback={<div className="flex items-center justify-center p-8 text-slate-500">Carregando administradores...</div>}>
                <UsersContent searchParamsPromise={searchParams} />
            </Suspense>
        </div>
    );
}
