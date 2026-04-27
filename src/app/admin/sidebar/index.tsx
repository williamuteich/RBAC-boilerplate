"use client";

import { SidebarContent } from "../components/sidebar-content";

export function Sidebar() {
    return (
        <aside className="w-64 bg-white hidden lg:flex flex-col h-full shrink-0 relative transition-transform">
            <SidebarContent />
        </aside>
    );
}
