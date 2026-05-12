import { LayoutDashboard, ShieldCheck, Key, Calendar, UserRound, History } from "lucide-react";

export interface NavConfig {
    title: string;
    href: string;
    icon: any;
    resource?: string;
    section: "MAIN MENU" | "SISTEMA";
}

export const ADMIN_NAVIGATION: NavConfig[] = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        section: "MAIN MENU"
    },
    {
        title: "Administradores",
        href: "/admin/usuarios",
        icon: ShieldCheck,
        resource: "usuarios",
        section: "MAIN MENU"
    },
    {
        title: "Visitantes",
        href: "/admin/visitantes",
        icon: UserRound,
        resource: "visitantes",
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
    },
    {
        title: "Calendário",
        href: "#",
        icon: Calendar,
        section: "SISTEMA"
    },
    {
        title: "Perfil",
        href: "#",
        icon: UserRound,
        section: "SISTEMA"
    }
];

export const PERMISSION_RESOURCES = ADMIN_NAVIGATION
    .filter(nav => nav.resource)
    .map(nav => nav.resource as string);
export const EXTRA_RESOURCES = ["configuracoes", "relatorios", "auditoria"];

export const ALL_RESOURCES = [...new Set([...PERMISSION_RESOURCES, ...EXTRA_RESOURCES])];
export const ALL_ACTIONS = ["visualizar", "criar", "editar", "deletar"];
