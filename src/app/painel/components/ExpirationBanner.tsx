import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { prisma } from "@/src/lib/prisma";
import { Clock } from "lucide-react";

function formatExpiration(date: Date): { label: string; isUrgent: boolean } {
  const now = new Date();
  const diff = date.getTime() - now.getTime();

  if (diff <= 0) return { label: "expirado", isUrgent: true };

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  if (days === 0 && hours < 24) {
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (hours === 0) return { label: `${mins} min`, isUrgent: true };
    return { label: `${hours}h ${mins}min`, isUrgent: true };
  }

  return {
    label: `${days}d ${remainingHours}h`,
    isUrgent: days < 2,
  };
}

export async function ExpirationBanner() {
  const session = await getServerSession(auth);
  if (!session || session.user.tipo !== "USER") return null;

  const client = await prisma.saaSClient.findUnique({
    where: { id: Number(session.user.id) },
    select: { expirationDate: true, status: true, plan: true },
  });

  if (!client || client.status !== "ACTIVE" || !client.expirationDate) return null;

  const expirationDate = new Date(client.expirationDate);
  const { label, isUrgent } = formatExpiration(expirationDate);

  const formattedDate = expirationDate.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`w-full px-4 py-2 flex items-center justify-center gap-2 text-xs font-medium ${isUrgent
        ? "bg-amber-50 border-b border-amber-200 text-amber-700"
        : "bg-[#F5F3FF] border-b border-[#E8E6F5] text-[#696684]"
        }`}
    >
      <Clock className={`w-3.5 h-3.5 shrink-0 ${isUrgent ? "text-amber-500" : "text-[#9A75F0]"}`} />
      <span>
        {isUrgent ? "⚠️ " : ""}Seu acesso expira em{" "}
        <span className="font-bold">
          {label}
        </span>{" "}
        <span className="opacity-70">({formattedDate})</span>
        {isUrgent && (
          <>
            {" — "}
            <a href="/painel/cupom" className="underline font-bold hover:opacity-80">
              Renovar agora
            </a>
          </>
        )}
      </span>
    </div>
  );
}
