export interface Role {
    id: number;
    name: string;
    description: string | null;
    permissions: {
        permission: {
            resource: string;
            action: string;
        }
    }[];
}

export interface Admin {
    id: number;
    email: string;
    name: string | null;
    active: boolean;
    createdAt: string;
    image: string | null;
    role: {
        id: number;
        name: string;
    } | null;
    lastLogin: string | null;
}