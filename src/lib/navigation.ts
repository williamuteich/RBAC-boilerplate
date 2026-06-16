import { LayoutDashboard, ShieldCheck, Key, History } from "lucide-react";
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

export const PERMISSION_RESOURCES = ADMIN_NAVIGATION
    .filter(nav => nav.resource)
    .map(nav => nav.resource as string);
export const EXTRA_RESOURCES = ["configuracoes", "relatorios", "auditoria"];

export const ALL_RESOURCES = [...new Set([...PERMISSION_RESOURCES, ...EXTRA_RESOURCES])];
export const ALL_ACTIONS = ["visualizar", "criar", "editar", "deletar"];
