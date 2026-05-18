import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { redirect } from "next/navigation";
import { HeaderHome } from "./components/home/HeaderHome";
import BannerHome from "./components/home/BannerHome";
import { FooterHome } from "./components/home/FooterHome";
import BannerCarousel from "./components/home/BannerCarousel";
import { ServicesHome } from "./components/home/Services";
import { AboutHome } from "./components/home/About";
import DepoimentsHome from "./components/home/Depoiments";

export default async function LoginPage() {
  const session = await getServerSession(auth);

  if (session) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen w-full flex-col">
      <HeaderHome />
      <BannerHome />
      <BannerCarousel />
      <ServicesHome />
      <AboutHome />
      <DepoimentsHome />
      <FooterHome />
    </main>
  );
}