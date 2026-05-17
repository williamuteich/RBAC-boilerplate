import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const redirectUrl = request.nextUrl.clone();

    if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
        const token = request.cookies.get("next-auth.session-token") || request.cookies.get("__Secure-next-auth.session-token");
        console.log("está acessando a rota", pathname);
        console.log("o token é", token);
        if (!token) {
            redirectUrl.pathname = "/";
            if (pathname.startsWith("/api/")) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
            return NextResponse.redirect(redirectUrl);
        }
    }
    console.log("liberando a rota", pathname);
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes, EXCEPT for /api/admin)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api(?!/admin)|_next/static|_next/image|favicon.ico).*)",
    ],
};
