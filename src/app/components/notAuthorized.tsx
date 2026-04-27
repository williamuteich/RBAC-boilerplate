import { Shield } from "lucide-react";

export default function NotAuthorized() {
    return (
        <div className="flex flex-col items-center justify-center mt-40">
            <Shield className="h-12 w-12 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Não autorizado</h1>
            <p className="text-gray-600">Você não tem permissão para acessar esta página.</p>
        </div>
    );
}