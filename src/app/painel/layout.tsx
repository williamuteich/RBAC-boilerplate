import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Header } from "./components/header/Header";
import { cookies } from "next/headers";
import { ImpersonationBanner } from "./components/ImpersonationBanner";

async function ImpersonationBannerContainer() {
  const session = await getServerSession(auth);
  if (session?.user.tipo === "ADMINISTRATOR") {
    const cookieStore = await cookies();
    const email = cookieStore.get("impersonated_client_email")?.value;
    if (email) {
      return <ImpersonationBanner email={email} />;
    }
  }
  return null;
}

export default async function PainelLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(auth);
  if (!session) {
    redirect("/login");
  }

  if (session.user.tipo === "ADMINISTRATOR") {
    const cookieStore = await cookies();
    const impersonated = cookieStore.get("impersonated_client_email")?.value;
    if (!impersonated) {
      redirect("/admin");
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#FAF9FF] overflow-hidden text-slate-900 font-sans">
      <Suspense fallback={null}>
        <ImpersonationBannerContainer />
      </Suspense>
      <div className="flex flex-1 overflow-hidden w-full max-w-full">
        <aside className="w-64 bg-white hidden lg:flex flex-col h-full shrink-0 relative">
          <Sidebar />
        </aside>
        <div className="flex flex-col flex-1 overflow-hidden w-full max-w-full">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
