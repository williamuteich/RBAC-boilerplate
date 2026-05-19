import { getHistoricoPaciente } from "@/src/services/pacientes";
import EvolucaoList from "./evolucao-list";

export default async function EvolucaoTab({ patientId }: { patientId: string }) {
    const historicoPaciente = await getHistoricoPaciente(patientId);

    return (
        <div className="w-full animate-in fade-in duration-500">
            <EvolucaoList initialItems={historicoPaciente || []} patientId={patientId} />
        </div>
    );
}
