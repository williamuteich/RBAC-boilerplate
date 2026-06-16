import { RoleManagement } from "./components/modal-role-management";
import { Key } from "lucide-react";
import { getRoles } from "@/src/services/roles";
import NotAuthorized from "@/src/app/components/notAuthorized";
import { Suspense } from "react";

async function RolesContent() {
    const initialRoles = await getRoles();

    if (initialRoles === null) {
        return <NotAuthorized />;
    }

    return <RoleManagement initialRoles={initialRoles} />;
}

export default function AdminCargosPage() {
    return (
        <div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3 text-slate-900">
                    <Key className="h-8 w-8 text-indigo-600" />
                    Cargos e Permissões
                </h1>
                <p className="text-muted-foreground mt-2">
                    Gerencie os níveis de acesso dos administradores do sistema.
                </p>
            </div>

            <Suspense fallback={<div className="flex items-center justify-center p-8 text-slate-500">Carregando cargos e permissões...</div>}>
                <RolesContent />
            </Suspense>
        </div>
    );
}
