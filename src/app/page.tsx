import { Suspense } from "react";
import { Header } from "./components/landing/Header";
import { Hero } from "./components/landing/Hero";
import { HowItWorks } from "./components/landing/HowItWorks";
import { LoveSim } from "./components/LoveSim";
import { Features } from "./components/landing/Features";
import { Pricing } from "./components/landing/Pricing";
import { Faq } from "./components/landing/Faq";
import { Footer } from "./components/landing/Footer";

const SITE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Glamour Lindóia – Crie uma homenagem de amor digital",
  description:
    "Surpreenda quem você ama com uma homenagem digital personalizada: fotos, música do casal, carta e link compartilhável. Perfeito para aniversários, Dia dos Namorados e momentos especiais.",
  keywords: ["homenagem digital", "surpresa romântica", "declaração de amor", "página de casal", "glamour lindoia"],
  authors: [{ name: "Glamour Lindóia" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Glamour Lindóia",
    title: "Glamour Lindóia – Homenageie quem você ama 💜",
    description:
      "Crie uma homenagem digital com fotos, música e carta para a pessoa que você ama. Compartilhe o link especial e surpreenda!",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Glamour Lindóia – Homenagem Digital de Amor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glamour Lindóia – Homenageie quem você ama 💜",
    description: "Crie uma homenagem digital com fotos, música e carta.",
    images: ["/og-home.jpg"],
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAF9FF] text-[#2D2A4A] flex flex-col font-sans selection:bg-[#9A75F0] selection:text-white overflow-x-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#9A75F0]/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#9D62F2]/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[10%] w-[45%] h-[45%] rounded-full bg-pink-500/3 blur-[120px] pointer-events-none"></div>

      <Header />

      <main className="flex-1">
        <Hero />

        <HowItWorks />

        <section id="simulador" className="py-12 bg-white/50 border-y border-[#E8E6F5] scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-2xl font-bold tracking-tight text-[#2D2A4A]">
                Monte sua página agora
              </h2>
              <p className="text-xs text-[#696684] mt-2">
                Experimente alterar os nomes e veja o visual do celular atualizar na hora!
              </p>
            </div>

            <Suspense fallback={
              <div className="w-full h-[500px] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-[#9A75F0] border-t-transparent animate-spin"></div>
              </div>
            }>
              <LoveSim />
            </Suspense>
          </div>
        </section>

        <Features />

        <Pricing />

        <Faq />
      </main>

      <Footer />
    </div>
  );
}