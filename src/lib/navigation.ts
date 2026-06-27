import { ShieldCheck, Key, History, Users, Ticket, LayoutDashboard, Target } from "lucide-react";
import { NavConfig } from "@/src/types/dashboard/components";

export const ADMIN_NAVIGATION: NavConfig[] = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        section: "MAIN MENU"
    },
    {
        title: "Clientes",
        href: "/admin/clientes",
        icon: Users,
        resource: "clientes",
        section: "MAIN MENU"
    },
    {
        title: "Leads",
        href: "/admin/leads",
        icon: Target,
        resource: "clientes",
        section: "MAIN MENU"
    },
    {
        title: "Cupons",
        href: "/admin/cupons",
        icon: Ticket,
        resource: "cupons",
        section: "MAIN MENU"
    },
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
    clientes: ["visualizar", "criar", "editar", "deletar"],
    cupons: ["visualizar", "criar", "editar", "deletar"],
    usuarios: ["visualizar", "criar", "editar", "deletar"],
    cargos: ["visualizar", "criar", "editar", "deletar"],
    relatorios: ["visualizar", "criar", "editar", "deletar"],
    auditoria: ["visualizar"]
};

export const ALL_RESOURCES = Object.keys(RESOURCE_ACTIONS);

