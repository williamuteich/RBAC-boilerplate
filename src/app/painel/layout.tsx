import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Header } from "./components/header/Header";

async function AuthGuard() {
  const session = await getServerSession(auth);
  if (!session) {
    redirect("/login");
  }
  return null;
}

export default function PainelLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <AuthGuard />
      </Suspense>

      <div className="flex h-screen bg-[#FAF9FF] overflow-hidden text-slate-900 font-sans">
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
    </>
  );
}
