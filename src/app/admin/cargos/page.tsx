import { RoleManagement } from "../components/role-management";
import { Key } from "lucide-react";
import { getRoles } from "@/src/services/roles";
import NotAuthorized from "@/src/app/components/notAuthorized";

export default async function AdminCargosPage() {
    const initialRoles = await getRoles();

    if (initialRoles === null) {
        return <NotAuthorized />;
    }

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

            <RoleManagement initialRoles={initialRoles} />
        </div>
    );
}
