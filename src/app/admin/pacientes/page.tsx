import { PacientesManagement } from "./components/pacientes-management";
import { Users } from "lucide-react";
import { getPacientes } from "@/src/services/pacientes";
import NotAuthorized from "@/src/app/components/notAuthorized";

export const metadata = {
    title: "Pacientes | Uteich Odontologia",
    description: "Gerencie os pacientes da clínica.",
};

export default async function PacientesAdminPage() {
    const initialData = await getPacientes();

    if (initialData === null) {
        return <NotAuthorized />;
    }

    return (
        <div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <Users className="h-8 w-8 text-blue-600" />
                    Pacientes
                </h1>
                <p className="text-muted-foreground mt-2">
                    Gerencie os dados e prontuários dos pacientes da clínica.
                </p>
            </div>

            <PacientesManagement initialData={initialData} />
        </div>
    );
}
