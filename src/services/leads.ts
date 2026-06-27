"use server";

import { headers } from "next/headers";
import { LeadsResponse } from "@/src/types/dashboard/leads";

const API_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

export async function getLeads(): Promise<LeadsResponse | null> {
  const cookie = (await headers()).get("cookie") || "";
  const res = await fetch(`${API_URL}/api/admin/leads`, {
    headers: { Cookie: cookie },
    cache: "no-store"
  });

  if (res.status === 403 || res.status === 401) return null;
  if (!res.ok) throw new Error("Failed to fetch leads");
  return await res.json();
}
