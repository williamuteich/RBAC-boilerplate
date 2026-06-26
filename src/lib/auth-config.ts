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
        async signIn({ user }) {
            if (!user.email) return false;
            return true;
        },

        async jwt({ token, account, user }) {
            if (account?.provider === "google" && token.email) {
                let client = await prisma.saaSClient.findUnique({
                    where: { email: token.email },
                });

                if (!client) {
                    client = await prisma.saaSClient.create({
                        data: {
                            email: token.email,
                            name: user.name ?? token.email,
                            image: user.image ?? null,
                            status: "PENDING",
                        },
                    });
                }

                token.id = String(client.id);
                token.tipo = "USER";
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user && token.id) {
                const client = await prisma.saaSClient.findUnique({
                    where: { id: Number(token.id) },
                });

                if (!client) {
                    return {} as any;
                }

                session.user.id = String(client.id);
                session.user.tipo = "USER";
            }
            return session;
        },
    },

    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
        updateAge: 60 * 60,
    },
};