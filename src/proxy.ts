import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const redirectUrl = request.nextUrl.clone();

    if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if (!token || (token as any).tipo !== "ADMINISTRATOR") {
            if (pathname.startsWith("/api/")) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
            redirectUrl.pathname = "/";
            return NextResponse.redirect(redirectUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api(?!/admin)|_next/static|_next/image|favicon.ico).*)",
    ],
};