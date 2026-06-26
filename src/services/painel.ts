"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

export async function getPainelData() {
  const cookie = (await headers()).get("cookie") || "";
  const res = await fetch(`${API_URL}/api/painel`, {
    headers: { Cookie: cookie },
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Falha ao carregar dados do painel");
  }

  return await res.json();
}

export async function updatePainelData(data: {
  partnerA: string;
  partnerB: string;
  anniversary: string;
  theme: string;
  songTitle: string;
  songArtist: string;
  songUrl: string;
  letterTitle: string;
  letterBody: string;
  photos: any[];
}): Promise<{ success: boolean; error?: string }> {
  const cookie = (await headers()).get("cookie") || "";
  const res = await fetch(`${API_URL}/api/painel`, {
    method: "PUT",
    headers: {
      "Cookie": cookie,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    return { success: false, error: errBody.error || "Falha ao salvar dados do painel" };
  }

  revalidatePath("/painel");
  return { success: true };
}
