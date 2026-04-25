import Link from "next/link";
import ButtonLogin from "./components/button-login";

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

                    <div className="flex flex-1 items-center justify-between px-2 sm:px-4">
                        <div className="lg:pl-10">
                        </div>
                        <ButtonLogin />
                    </div>
                </div>
            </div>
        </header>
    );
}
