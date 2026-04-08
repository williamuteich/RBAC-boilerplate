"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
    const [sticky, setSticky] = useState(false);
    const [navbarOpen, setNavbarOpen] = useState(false);

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

    const navbarToggleHandler = () => {
        setNavbarOpen(!navbarOpen);
    };

    return (
        <header
            className={`header fixed left-0 top-0 z-40 flex w-full items-center transition-all duration-300 ${sticky
                ? "z-9999 bg-white py-2 shadow-sm backdrop-blur-sm"
                : "bg-transparent py-4"
                }`}
        >
            <div className="container mx-auto max-w-[1400px] px-4">
                <div className="relative flex items-center justify-between">
                    <div className="w-60 max-w-full">
                        <Link href="/" className="block">
                            <div className="flex items-center gap-2">
                                <img
                                    src="/logo.png"
                                    alt="AdControl"
                                    className={`transition-all duration-300 ${sticky ? "h-8" : "h-10"}`}
                                />
                                <span className="text-2xl font-bold text-black">AdControl</span>
                            </div>
                        </Link>
                    </div>

                    <div className="flex flex-1 items-center justify-between px-4">
                        <div className="lg:pl-10">
                            <button
                                onClick={navbarToggleHandler}
                                id="navbarToggler"
                                aria-label="Mobile Menu"
                                className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                            >
                                <span className="relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300" />
                                <span className="relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300" />
                                <span className="relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300" />
                            </button>
                            <nav
                                id="navbarCollapse"
                                className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white py-4 px-6 duration-300 lg:visible lg:static lg:w-auto lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 ${navbarOpen ? "visibility top-full opacity-100" : "invisible top-[120%] opacity-0"
                                    }`}
                            >
                                <ul className="block lg:flex lg:space-x-12">
                                    <li className="group relative">
                                        <Link href="/" className={`flex text-base font-medium hover:text-primary lg:inline-flex lg:px-0 text-black ${sticky ? "py-1 lg:py-2" : "py-2 lg:py-4"}`}>Features</Link>
                                    </li>
                                    <li className="group relative">
                                        <Link href="/" className={`flex text-base font-medium hover:text-primary lg:inline-flex lg:px-0 text-black ${sticky ? "py-1 lg:py-2" : "py-2 lg:py-4"}`}>About</Link>
                                    </li>
                                    <li className="group relative">
                                        <Link href="/" className={`flex text-base font-medium hover:text-primary lg:inline-flex lg:px-0 text-black ${sticky ? "py-1 lg:py-2" : "py-2 lg:py-4"}`}>How It Works</Link>
                                    </li>
                                    <li className="group relative">
                                        <Link href="/" className={`flex text-base font-medium hover:text-primary lg:inline-flex lg:px-0 text-black ${sticky ? "py-1 lg:py-2" : "py-2 lg:py-4"}`}>Support</Link>
                                    </li>
                                    <li className="group relative">
                                        <Link href="/" className={`flex text-base font-medium items-center hover:text-primary lg:inline-flex lg:px-0 text-black ${sticky ? "py-1 lg:py-2" : "py-2 lg:py-4"}`}>
                                            Pages
                                            <span className="pl-2 text-black">
                                                <svg width="15" height="14" viewBox="0 0 15 14"><path d="M7.81602 9.97495C7.68477 9.97495 7.57539 9.9312 7.46602 9.8437L2.43477 4.89995C2.23789 4.70308 2.23789 4.39683 2.43477 4.19995C2.63164 4.00308 2.93789 4.00308 3.13477 4.19995L7.81602 8.7187L12.4973 4.17808C12.6941 3.9812 13.0004 3.9812 13.1973 4.17808C13.3941 4.37495 13.3941 4.6812 13.1973 4.87808L8.16602 9.82183C8.05664 9.90933 7.94727 9.97495 7.81602 9.97495Z" fill="currentColor" /></svg>
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="flex items-center justify-end">
                            <div className="hidden items-center gap-4 md:flex mr-6">
                                <button className="hover:text-primary text-black">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                                </button>
                            </div>
                            <Link href="/auth/signin" className={`hidden px-6 text-base font-bold hover:text-primary md:block text-black ${sticky ? "py-2" : "py-3"}`}>
                                Sign In
                            </Link>
                            <Link href="/auth/signin" className={`hidden rounded-md bg-primary px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 md:block ${sticky ? "py-2" : "py-3"}`}>
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
