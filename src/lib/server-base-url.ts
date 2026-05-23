import { headers } from "next/headers";

function normalizeOrigin(value: string) {
    try {
        return new URL(value).origin;
    } catch {
        return value.replace(/\/$/, "");
    }
}

export async function getServerBaseUrl() {
    const requestHeaders = await headers();
    const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host");
    if (host) {
        const proto = requestHeaders.get("x-forwarded-proto") || (host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https");
        return `${proto}://${host}`;
    }

    const envUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXTAUTH_URL;
    if (envUrl) {
        return normalizeOrigin(envUrl);
    }

    throw new Error("Unable to determine application origin");
}