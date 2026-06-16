import { ShieldCheck, Key, History } from "lucide-react";
import { NavConfig } from "@/src/types/dashboard/components";

export const ADMIN_NAVIGATION: NavConfig[] = [
    {
        title: "Usuários",
        href: "/admin/usuarios",
        icon: ShieldCheck,
        resource: "usuarios",
        section: "MAIN MENU"
    },
    {
        title: "Cargos e Permissões",
        href: "/admin/cargos",
        icon: Key,
        resource: "cargos",
        section: "MAIN MENU"
    },
    {
        title: "Auditoria",
        href: "/admin/auditoria",
        icon: History,
        resource: "auditoria",
        section: "MAIN MENU"
    }
];

export const RESOURCE_ACTIONS: Record<string, string[]> = {
    usuarios: ["visualizar", "criar", "editar", "deletar"],
    cargos: ["visualizar", "criar", "editar", "deletar"],
    relatorios: ["visualizar", "criar", "editar", "deletar"],
    auditoria: ["visualizar"]
};

export const ALL_RESOURCES = Object.keys(RESOURCE_ACTIONS);
