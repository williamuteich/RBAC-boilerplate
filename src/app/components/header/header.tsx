import Link from "next/link";
import ButtonLogin from "./components/button-login";

export default function Header() {
    return (
        <header className="header fixed left-0 top-0 z-40 flex w-full items-center bg-white py-4 shadow-sm backdrop-blur-md">
            <div className="container mx-auto max-w-[1400px] px-4">
                <div className="relative flex items-center justify-between">
                    <div className="w-auto max-w-full">
                        <Link href="/" className="block">
                            <div className="flex items-center gap-1 sm:gap-2">
                                <img
                                    src="/logo.png"
                                    alt="AdControl"
                                    className="transition-all duration-300 h-8 sm:h-10"
                                />
                                <span className="text-lg sm:text-2xl font-bold text-black">AdControl</span>
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
