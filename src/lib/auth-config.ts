import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/src/lib/prisma";

export const auth: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],

    pages: {
        signIn: "/login",
    },

    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                if (!user.email) return false;

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

                const client = await prisma.saaSClient.findUnique({
                    where: { email: user.email },
                });

                if (client) {
                    if (client.status === "CANCELLED") return false;
                    return true;
                }

                return false;
            }
            return true;
        },

        async jwt({ token, account }) {
            if (account?.provider === "google" && token.email) {
                const admin = await prisma.administrator.findUnique({
                    where: { email: token.email },
                    include: {
                        role: true,
                    },
                });

                if (admin) {
                    token.id = String(admin.id);
                    token.tipo = "ADMINISTRATOR";
                } else {
                    const client = await prisma.saaSClient.findUnique({
                        where: { email: token.email },
                    });
                    if (client) {
                        token.id = String(client.id);
                        token.tipo = "USER";
                    }
                }
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user && token.id) {
                if (token.tipo === "ADMINISTRATOR") {
                    const admin = await prisma.administrator.findUnique({
                        where: { id: Number(token.id) },
                        include: {
                            role: true,
                        },
                    });

                    if (!admin || !admin.active) {
                        return {} as any;
                    }

                    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
                    if (!admin.lastLogin || admin.lastLogin < oneHourAgo) {
                        await prisma.administrator.update({
                            where: { id: admin.id },
                            data: { lastLogin: new Date() },
                        });
                    }

                    session.user.id = String(admin.id);
                    session.user.tipo = "ADMINISTRATOR";

                    if (admin.role?.name === "Admin") {
                        session.user.permissions = ["all:all"];
                    } else {
                        const rawPermissions = admin.role?.permissions as Array<{ resource: string; action: string }> || [];
                        session.user.permissions = rawPermissions.map(
                            (p) => `${p.resource}:${p.action}`
                        );
                    }
                } else if (token.tipo === "USER") {
                    const client = await prisma.saaSClient.findUnique({
                        where: { id: Number(token.id) },
                    });

                    if (!client || client.status === "CANCELLED") {
                        return {} as any;
                    }

                    session.user.id = String(client.id);
                    session.user.tipo = "USER";
                }
            }
            return session;
        },
    },

    session: {
        strategy: "jwt",
        maxAge: 35 * 60,
        updateAge: 30 * 60,
    },
};