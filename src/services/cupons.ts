"use server";

import { CouponFilters, CuponsResponse } from "@/src/types/dashboard/cupons";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

export async function getCoupons(filters: CouponFilters = { page: 1, limit: 10 }): Promise<CuponsResponse | null> {
  const cookie = (await headers()).get("cookie") || "";
  const params = new URLSearchParams();
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));
  if (filters.search) params.set("search", filters.search);
  if (filters.status) params.set("status", filters.status);

  const res = await fetch(`${API_URL}/api/admin/cupons?${params.toString()}`, {
    headers: { Cookie: cookie },
    cache: "no-store"
  });

  if (res.status === 403 || res.status === 401) return null;
  if (!res.ok) throw new Error("Failed to fetch coupons");
  return await res.json();
}

export async function generateCoupons(data: {
  quantity: number;
  prefix?: string;
  expiresInDays?: number | null;
}): Promise<{ success: boolean; codes?: string[]; error?: string }> {
  const cookie = (await headers()).get("cookie") || "";
  const res = await fetch(`${API_URL}/api/admin/cupons`, {
    method: "POST",
    headers: {
      "Cookie": cookie,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (res.status === 403) return { success: false, error: "Sem permissão" };
  const result = await res.json();
  if (!res.ok) return { success: false, error: result.error || "Erro ao gerar cupons" };

  revalidatePath("/admin/cupons");
  return { success: true, codes: result.codes };
}

export async function deleteCoupon(id: number): Promise<{ success: boolean; error?: string }> {
  const cookie = (await headers()).get("cookie") || "";
  const res = await fetch(`${API_URL}/api/admin/cupons/${id}`, {
    method: "DELETE",
    headers: { Cookie: cookie }
  });

  if (res.status === 403) return { success: false, error: "Sem permissão" };
  const result = await res.json();
  if (!res.ok) return { success: false, error: result.error || "Erro ao excluir cupom" };

  revalidatePath("/admin/cupons");
  return { success: true };
}
