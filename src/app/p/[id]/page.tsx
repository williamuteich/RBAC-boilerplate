import { Suspense } from "react";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import { cacheTag, cacheLife } from "next/cache";
import { PublicTributeRenderer } from "./PublicTributeRenderer";

async function getTributeData(id: string) {
  "use cache";
  cacheTag(`tribute-${id}`);
  cacheLife("days");

  return prisma.saaSClient.findUnique({
    where: { tributeId: id },
    select: {
      id: true,
      tributeId: true,
      partnerA: true,
      partnerB: true,
      anniversary: true,
      theme: true,
      songTitle: true,
      songArtist: true,
      songUrl: true,
      letterTitle: true,
      letterBody: true,
      photos: true,
      status: true,
      expirationDate: true,
    },
  });
}

const SITE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  try {
    const client = await getTributeData(id);

    if (
      !client ||
      client.status !== "ACTIVE" ||
      (client.expirationDate && new Date(client.expirationDate) < new Date())
    ) {
      return {
        title: "Surpresa de Amor – Homenagem Especial 💜",
        description: "Uma homenagem digital especial criada com amor.",
      };
    }

    const rawPhotos = client.photos as any;
    const firstPhoto =
      Array.isArray(rawPhotos) && rawPhotos.length > 0
        ? (rawPhotos[0] as { url?: string }).url
        : null;

    const title = `Uma Surpresa Especial para ${client.partnerB} 💜`;
    const description = `${client.partnerA} preparou uma homenagem digital cheia de fotos, música e amor para ${client.partnerB}. Abra e se surpreenda! ❤️`;
    const ogImage = firstPhoto ?? `${SITE_URL}/og-home.jpg`;

    return {
      metadataBase: new URL(SITE_URL),
      title,
      description,
      openGraph: {
        type: "website",
        locale: "pt_BR",
        url: `${SITE_URL}/p/${id}`,
        siteName: "Glamour Lindóia",
        title,
        description,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: `Homenagem de ${client.partnerA} para ${client.partnerB}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
    };
  } catch {
    return { title: "Surpresa de Amor – Homenagem Especial 💜" };
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

  const client = await getTributeData(id);

  if (
    !client ||
    client.status !== "ACTIVE" ||
    (client.expirationDate && new Date(client.expirationDate) < new Date())
  ) {
    notFound();
  }

  const rawPhotos = client.photos as any;
  const photos =
    Array.isArray(rawPhotos) && rawPhotos.length > 0
      ? rawPhotos
      : [
        {
          id: "default-1",
          url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop",
          label: "Nosso Começo",
        },
        {
          id: "default-2",
          url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop",
          label: "Minha Vida",
        },
        {
          id: "default-3",
          url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop",
          label: "Te Amo",
        },
      ];

  const letterLines = client.letterBody
    ? client.letterBody
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
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
