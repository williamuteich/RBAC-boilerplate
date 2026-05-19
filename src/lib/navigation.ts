import { LayoutDashboard, ShieldCheck, Key, CalendarDays, UserRound, History, LucideIcon, Users } from "lucide-react";

export type NavSection = "CLÍNICA" | "ADMINISTRAÇÃO" | "SISTEMA";

export interface NavConfig {
    title: string;
    href: string;
    icon: LucideIcon;
    resource?: string;
    section: NavSection;
}

export const ADMIN_NAVIGATION: NavConfig[] = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        section: "CLÍNICA"
    },
    {
        title: "Agenda",
        href: "/admin/agenda",
        icon: CalendarDays,
        resource: "agenda",
        section: "CLÍNICA"
    },
    {
        title: "Pacientes",
        href: "/admin/pacientes",
        icon: Users,
        resource: "pacientes",
        section: "CLÍNICA"
    },

    {
        title: "Administradores",
        href: "/admin/usuarios",
        icon: ShieldCheck,
        resource: "usuarios",
        section: "ADMINISTRAÇÃO"
    },
    {
        title: "Cargos e Permissões",
        href: "/admin/cargos",
        icon: Key,
        resource: "cargos",
        section: "ADMINISTRAÇÃO"
    },

    {
        title: "Auditoria",
        href: "/admin/auditoria",
        icon: History,
        resource: "auditoria",
        section: "SISTEMA"
    },
    {
        title: "Meu Perfil",
        href: "#",
        icon: UserRound,
        section: "SISTEMA"
    }
];

export const PERMISSION_RESOURCES = ADMIN_NAVIGATION
    .filter(nav => nav.resource)
    .map(nav => nav.resource as string);
export const EXTRA_RESOURCES = ["configuracoes", "relatorios"];

export const ALL_RESOURCES = [...new Set([...PERMISSION_RESOURCES, ...EXTRA_RESOURCES])];
export const ALL_ACTIONS = ["visualizar", "criar", "editar", "deletar"];
