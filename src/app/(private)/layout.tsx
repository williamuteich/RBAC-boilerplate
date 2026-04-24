import { ReactNode } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export default function PrivateLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900 font-sans">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden w-full max-w-full">
                <Header />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <div className="mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
