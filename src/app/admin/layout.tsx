import { ReactNode, Suspense } from "react";
import { Header } from "./header";
import { Sidebar, SkeletonSidebar } from "./sidebar/components/skeletonSIdebar";
import { requireAdminContext } from "@/src/lib/auth-helpers/auth-helpers-server";

async function AdminAuthGuard() {
    await requireAdminContext();
    return null;
}

export default function PrivateLayout({ children }: { children: ReactNode }) {
    return (
        <Suspense fallback={
            <div className="flex h-screen w-screen bg-slate-50 items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-slate-300 border-t-slate-800 animate-spin"></div>
            </div>
        }>
            <AdminAuthGuard />
            <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900 font-sans">
                <Suspense fallback={
                    <aside className="w-64 bg-white hidden lg:flex flex-col h-full shrink-0 relative transition-transform border-r border-slate-200/80">
                        <SkeletonSidebar />
                    </aside>
                }>
                    <Sidebar />
                </Suspense>
                <div className="flex flex-col flex-1 overflow-hidden w-full max-w-full">
                    <Header />
                    <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                        <div className="mx-auto w-full">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </Suspense>
    );
}
