import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcryptjs";

export const auth: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Senha", type: "password" },
                contexto: { label: "Contexto", type: "text" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password || !credentials?.contexto) {
                    throw new Error("Credenciais inválidas");
                }

                const { email, password, contexto } = credentials;

                if (contexto === "admin") {
                    throw new Error("Admin utiliza login com Google");
                }

                if (contexto === "loja") {
                    // 1. Tenta como Lojista
                    const lojista = await prisma.lojista.findUnique({
                        where: { email },
                    });

                    if (lojista) {
                        if (!lojista.active) {
                            throw new Error("Conta inativa");
                        }
                        if (!lojista.password) {
                            throw new Error("Esta conta usa login com Google");
                        }

                        const valid = await bcrypt.compare(password, lojista.password);
                        if (!valid) throw new Error("Senha incorreta");

                        await prisma.lojista.update({
                            where: { id: lojista.id },
                            data: { lastLogin: new Date() },
                        });

                        return {
                            id: String(lojista.id),
                            email: lojista.email,
                            name: lojista.name,
                            image: lojista.image,
                            tipo: "LOJISTA" as const,
                            permissions: [],
                            lojistaId: String(lojista.id),
                        };
                    }

                    // 2. Tenta como ShopMember
                    const member = await prisma.shopMember.findUnique({
                        where: { email },
                        include: {
                            shopRole: {
                                include: {
                                    permissions: {
                                        include: { shopPermission: true },
                                    },
                                },
                            },
                        },
                    });

                    if (member) {
                        if (!member.active) {
                            throw new Error("Conta inativa");
                        }
                        if (!member.password) {
                            throw new Error("Esta conta usa login com Google");
                        }

                        const valid = await bcrypt.compare(password, member.password);
                        if (!valid) throw new Error("Senha incorreta");

                        await prisma.shopMember.update({
                            where: { id: member.id },
                            data: { lastLogin: new Date() },
                        });

                        const permissions = member.shopRole.permissions.map(
                            (p) => `${p.shopPermission.resource}:${p.shopPermission.action}`
                        );

                        return {
                            id: String(member.id),
                            email: member.email,
                            name: member.name,
                            image: null,
                            tipo: "SHOP_MEMBER" as const,
                            permissions,
                            lojistaId: String(member.lojistaId),
                        };
                    }

                    throw new Error("Usuário não encontrado");
                }

                throw new Error("Contexto inválido");
            },
        }),
    ],

    pages: {
        signIn: "/admin/login",
    },

    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                if (!user.email) return false;

                // 1. Verifica se é Administrator
                const admin = await prisma.administrator.findUnique({
                    where: { email: user.email },
                });
                if (admin) {
                    if (!admin.active) return false;
                    await prisma.administrator.update({
                        where: { id: admin.id },
                        data: { lastLogin: new Date() },
                    });
                    return true;
                }

                // 2. Verifica se é Lojista
                const lojista = await prisma.lojista.findUnique({
                    where: { email: user.email },
                });
                if (lojista) {
                    if (!lojista.active) return false;
                    await prisma.lojista.update({
                        where: { id: lojista.id },
                        data: { lastLogin: new Date() },
                    });
                    return true;
                }

                // 3. Verifica se é ShopMember
                const member = await prisma.shopMember.findUnique({
                    where: { email: user.email },
                });
                if (member) {
                    if (!member.active) return false;
                    await prisma.shopMember.update({
                        where: { id: member.id },
                        data: { lastLogin: new Date() },
                    });
                    return true;
                }

                // Email não cadastrado em nenhuma tabela — bloqueia
                return false;
            }

            // Credentials já validado no authorize()
            return true;
        },

        async jwt({ token, user, account }) {
            // Login via Credentials — dados já vêm prontos do authorize()
            if (user && account?.provider === "credentials") {
                token.id = user.id;
                token.tipo = (user as any).tipo;
                token.permissions = (user as any).permissions;
                token.lojistaId = (user as any).lojistaId ?? null;
                return token;
            }

            // Login via Google — identifica quem é pelo email
            if (account?.provider === "google" && token.email) {
                // 1. Administrator?
                const admin = await prisma.administrator.findUnique({
                    where: { email: token.email },
                });
                if (admin) {
                    token.id = String(admin.id);
                    token.tipo = "ADMINISTRATOR";
                    token.permissions = [];
                    token.lojistaId = null;
                    return token;
                }

                // 2. Lojista?
                const lojista = await prisma.lojista.findUnique({
                    where: { email: token.email },
                });
                if (lojista) {
                    token.id = String(lojista.id);
                    token.tipo = "LOJISTA";
                    token.permissions = [];
                    token.lojistaId = String(lojista.id);
                    return token;
                }

                // 3. ShopMember?
                const member = await prisma.shopMember.findUnique({
                    where: { email: token.email },
                    include: {
                        shopRole: {
                            include: {
                                permissions: {
                                    include: { shopPermission: true },
                                },
                            },
                        },
                    },
                });
                if (member) {
                    token.id = String(member.id);
                    token.tipo = "SHOP_MEMBER";
                    token.permissions = member.shopRole.permissions.map(
                        (p) => `${p.shopPermission.resource}:${p.shopPermission.action}`
                    );
                    token.lojistaId = String(member.lojistaId);
                    return token;
                }
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.tipo = token.tipo as "ADMINISTRATOR" | "LOJISTA" | "SHOP_MEMBER";
                session.user.permissions = token.permissions as string[];
                session.user.lojistaId = token.lojistaId as string | null;
            }
            return session;
        },
    },

    session: {
        strategy: "jwt",
    },
};