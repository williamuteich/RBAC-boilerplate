"use server";

import { headers } from "next/headers";
import { DashboardResponse } from "@/src/types/dashboard/dashboard";

const API_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

export async function getDashboardData(): Promise<DashboardResponse | null> {
  const cookie = (await headers()).get("cookie") || "";
  const res = await fetch(`${API_URL}/api/admin/dashboard`, {
    headers: { Cookie: cookie },
    cache: "no-store"
  });

  if (res.status === 403 || res.status === 401) return null;
  if (!res.ok) throw new Error("Failed to fetch dashboard data");
  return await res.json();
}
