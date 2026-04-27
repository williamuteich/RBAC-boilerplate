import { AdminManagement } from "../components/admin-management";
import { ShieldCheck } from "lucide-react";

export default function UsuariosAdminPage() {
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

            <AdminManagement />
        </div>
    );
}
