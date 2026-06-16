"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarContent } from "../sidebar";

export function MobileNav() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
                render={
                    <Button variant="ghost" size="icon" className="lg:hidden mr-2">
                        <Menu className="w-6 h-6" />
                    </Button>
                }
            />
            <SheetContent side="left" className="p-0 w-72 border-none">
                <SidebarContent onClose={() => setOpen(false)} />
            </SheetContent>
        </Sheet>
    );
}
