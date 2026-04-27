import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        tipo: "ADMINISTRATOR" | "LOJISTA" | "SHOP_MEMBER";
        permissions: string[];
        lojistaId: string | null;
    }

    interface Session {
        user: {
            id: string;
            tipo: "ADMINISTRATOR" | "LOJISTA" | "SHOP_MEMBER";
            permissions: string[];
            lojistaId: string | null;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        tipo: "ADMINISTRATOR" | "LOJISTA" | "SHOP_MEMBER";
        permissions: string[];
        lojistaId: string | null;
    }
}