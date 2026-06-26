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
        signIn: "/",
    },

    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                if (!user.email) return false;

                const admin = await prisma.administrator.findUnique({
                    where: { email: user.email },
                });

                if (!admin || !admin.active) return false;

                await prisma.administrator.update({
                    where: { id: admin.id },
                    data: { lastLogin: new Date() },
                });

                return true;
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
                }
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user && token.id) {
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