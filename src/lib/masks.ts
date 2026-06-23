export function maskDate(value: string): string {
  const clean = value.replace(/\D/g, "");
  if (clean.length <= 2) return clean;
  if (clean.length <= 4) return `${clean.slice(0, 2)}/${clean.slice(2)}`;
  if (clean.length <= 8) return `${clean.slice(0, 2)}/${clean.slice(2, 4)}/${clean.slice(4)}`;
  if (clean.length <= 10) return `${clean.slice(0, 2)}/${clean.slice(2, 4)}/${clean.slice(4, 8)} ${clean.slice(8)}`;
  return `${clean.slice(0, 2)}/${clean.slice(2, 4)}/${clean.slice(4, 8)} ${clean.slice(8, 10)}:${clean.slice(10, 12)}`;
}

export function maskCurrency(value: string | number): string {
  const cleanNum = typeof value === "number" ? value : parseFloat(String(value).replace(/\D/g, "")) / 100;
  if (isNaN(cleanNum)) return "R$ 0,00";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(cleanNum);
}

export function unmask(value: string): string {
  return value.replace(/\D/g, "");
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function slugifyCouple(partnerA: string, partnerB: string): string {
  const cleanA = slugify(partnerA || "parceiro-a");
  const cleanB = slugify(partnerB || "parceiro-b");
  return `${cleanA}-e-${cleanB}`;
}
