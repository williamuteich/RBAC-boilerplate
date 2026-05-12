"use server";
import { headers } from "next/headers";
import { VisitorsResponse, VisitorFilters } from "@/src/types/dashboard/visitor";

const API_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

export async function getVisitors(filters: VisitorFilters = {}): Promise<VisitorsResponse | null> {
    const cookie = (await headers()).get("cookie") || "";

    const params = new URLSearchParams();
    if (filters.page) params.set("page", String(filters.page));
    if (filters.limit) params.set("limit", String(filters.limit));
    if (filters.visitorId) params.set("visitorId", filters.visitorId);
    if (filters.gclid) params.set("gclid", filters.gclid);
    if (typeof filters.converted !== "undefined") params.set("converted", String(filters.converted));

    const query = params.toString();
    const res = await fetch(`${API_URL}/api/admin/visitantes${query ? `?${query}` : ""}`, {
        headers: { Cookie: cookie }
    });

    if (res.status === 403 || res.status === 401) return null;
    if (!res.ok) throw new Error("Erro ao buscar visitantes");

    return res.json();
}
