import Link from "next/link";

export default function Header() {
    return (
        <header className="header fixed left-0 top-0 z-40 flex w-full items-center bg-white py-4 shadow-sm backdrop-blur-md">
            <div className="container mx-auto max-w-[1400px] px-4">
                <div className="relative flex items-center justify-between">
                    <div className="w-auto max-w-full">
                        <Link href="/" className="block">
                            <div className="flex items-center gap-1 sm:gap-2 text-[#EA580C]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-key">
                                    <circle cx="7.5" cy="15.5" r="5.5" />
                                    <path d="m21 2-9.6 9.6" />
                                    <path d="m15.5 7.5 3 3L22 7l-3-3" />
                                </svg>
                                <span className="text-xl sm:text-2xl font-black tracking-tighter text-neutral-900">
                                    Rental<span className="text-orange-600">Pro</span>
                                </span>
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="#" className="text-zinc-500 hover:text-orange-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                        </Link>
                        <Link href="#" className="text-zinc-500 hover:text-orange-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                        </Link>
                        <Link href="#" className="text-zinc-500 hover:text-orange-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
