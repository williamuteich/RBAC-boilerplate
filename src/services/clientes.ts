"use server";

import { ClienteFilters, ClientesResponse } from "@/src/types/dashboard/clientes";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

export async function getClientes(filters: ClienteFilters = { page: 1, limit: 10 }): Promise<ClientesResponse | null> {
  const cookie = (await headers()).get("cookie") || "";
  const params = new URLSearchParams();
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));
  if (filters.search) params.set("search", filters.search);
  if (filters.status) params.set("status", filters.status);
  if (filters.plan) params.set("plan", filters.plan);

  const res = await fetch(`${API_URL}/api/admin/clientes?${params.toString()}`, {
    headers: { Cookie: cookie },
    cache: "no-store"
  });
  if (res.status === 403 || res.status === 401) return null;
  if (!res.ok) throw new Error("Failed to fetch clients");
  return await res.json();
}

export async function updateCliente(
  id: number,
  data: { plan?: string; status?: string; expirationDate?: string | null; lastPaymentValue?: number }
): Promise<{ success: boolean; error?: string }> {
  const cookie = (await headers()).get("cookie") || "";
  const res = await fetch(`${API_URL}/api/admin/clientes/${id}`, {
    method: "PUT",
    headers: {
      "Cookie": cookie,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (res.status === 403) return { success: false, error: "Sem permissão" };
  const result = await res.json();
  if (!res.ok) return { success: false, error: result.error || "Erro ao atualizar cliente" };

  revalidatePath("/admin/clientes");
  return { success: true };
}
