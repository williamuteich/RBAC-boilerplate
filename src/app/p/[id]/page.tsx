import { Suspense } from "react";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import { PublicTributeRenderer } from "./PublicTributeRenderer";
import { SpotifySkeleton, StorySkeleton } from "./components/TributeSkeleton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  try {
    const client = await prisma.saaSClient.findUnique({
      where: { tributeId: id },
    });

    if (!client || client.status !== "ACTIVE") {
      return { title: "Surpresa de Amor - Homenagem Especial" };
    }

    return {
      title: `Uma Surpresa Especial para ${client.partnerB} ❤️`,
      description: `Homenagem de amor especial criada por ${client.partnerA} com fotos e música.`,
    };
  } catch {
    return { title: "Surpresa de Amor - Homenagem Especial" };
  }
}

export default async function PublicTributePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-[#FAF9FF] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-rose-500 border-t-transparent animate-spin"></div>
        </div>
      }
    >
      <TributeContent params={params} />
    </Suspense>
  );
}

async function TributeContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const client = await prisma.saaSClient.findUnique({
    where: { tributeId: id },
  });

  if (!client || client.status !== "ACTIVE") {
    notFound();
  }

  const rawPhotos = client.photos as any;
  const photos =
    Array.isArray(rawPhotos) && rawPhotos.length > 0
      ? rawPhotos
      : [
        { id: "default-1", url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop", label: "Nosso Começo" },
        { id: "default-2", url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop", label: "Minha Vida" },
        { id: "default-3", url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop", label: "Te Amo" },
      ];

  const letterLines = client.letterBody
    ? client.letterBody.split("\n").map((l) => l.trim()).filter(Boolean)
    : [client.letterTitle || "Para Meu Amor,", "Te amo hoje, amanhã e para todo o sempre."];

  const tributeData = {
    partnerA: client.partnerA,
    partnerB: client.partnerB,
    anniversary: client.anniversary,
    theme: client.theme as "spotify" | "story",
    songTitle: client.songTitle,
    songArtist: client.songArtist,
    songUrl: client.songUrl,
    letterTitle: client.letterTitle,
    letterLines,
    photos,
  };

  return <PublicTributeRenderer data={tributeData} />;
}
