"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
    const [sticky, setSticky] = useState(false);

    const handleStickyNavbar = () => {
        if (window.scrollY >= 80) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleStickyNavbar);
        return () => window.removeEventListener("scroll", handleStickyNavbar);
    }, []);

    return (
        <header
            className={`header fixed left-0 top-0 z-40 flex w-full items-center transition-all duration-300 ${sticky
                ? "z-9999 bg-white py-2 shadow-sm backdrop-blur-sm"
                : "bg-transparent py-4"
                }`}
        >
            <div className="container mx-auto max-w-[1400px] px-4">
                <div className="relative flex items-center justify-between">
                    <div className="w-auto max-w-full">
                        <Link href="/" className="block">
                            <div className="flex items-center gap-1 sm:gap-2">
                                <img
                                    src="/logo.png"
                                    alt="AdControl"
                                    className={`transition-all duration-300 ${sticky ? "h-6 sm:h-8" : "h-8 sm:h-10"}`}
                                />
                                <span className="text-lg sm:text-2xl font-bold text-black">AdControl</span>
                            </div>
                        </Link>
                    </div>

                    <div className="flex flex-1 items-center justify-between px-2 sm:px-4">
                        <div className="lg:pl-10">
                        </div>
                        <div className="flex items-center justify-end gap-1 sm:gap-3">
                            <Link href="/auth/signin" className={`px-2 sm:px-4 text-xs sm:text-base font-bold hover:text-primary text-black ${sticky ? "py-1.5 sm:py-2" : "py-2 sm:py-3"}`}>
                                Sign In
                            </Link>
                            <Link href="/auth/signin" className={`rounded-md bg-primary px-3 sm:px-6 text-xs sm:text-base font-bold text-white transition duration-300 hover:bg-opacity-90 ${sticky ? "py-1.5 sm:py-2" : "py-2 sm:py-3"}`}>
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
