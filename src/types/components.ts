import { ReactNode } from "react";
import { Role } from "./dashboard/admins";
import { LucideIcon } from "lucide-react";

export interface NavItemProps {
    href: string;
    icon: ReactNode;
    children: ReactNode;
    active?: boolean;
}

export interface ViewPermissionsProps {
    roleName: string;
    permissions: Role["permissions"];
}

export interface NavConfig {
    title: string;
    href: string;
    icon: LucideIcon;
    resource?: string;
    section: "MAIN MENU" | "SISTEMA";
}

export interface Stats {
    admins: number;
}
