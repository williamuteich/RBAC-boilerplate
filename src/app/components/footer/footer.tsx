import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative z-10 bg-white pt-20 lg:pt-24 dark:bg-gray-dark">
            <div className="container mx-auto max-w-[1400px] px-4">
                <div className="-mx-4 flex flex-wrap justify-center">
                    <div className="w-full px-4 flex justify-center">
                        <div className="mb-12 max-w-[360px] flex flex-col items-center text-center lg:mb-16">
                            <Link href="/" className="mb-8 flex items-center gap-2">
                                <img src="/logo.png" alt="AdControl" className="h-10" />
                                <span className="text-2xl font-bold text-black">AdControl</span>
                            </Link>
                            <p className="mb-9 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
                                Potencializando o seu negócio com controle inteligente e gestão simplificada.
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <a href="/" aria-label="social-link" className="text-body-color dark:text-body-color-dark hover:text-primary">
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM15.4 11H12.1V17.6H9.9V11H8.8V8.8H9.9V7.7C9.9 5.83 11 4.4 13.2 4.4H15.4V6.6H14.1C13.2 6.6 12.1 7.15 12.1 8.25V8.8H15.4V11Z" fill="currentColor" />
                                    </svg>
                                </a>
                                <a href="/" aria-label="social-link" className="text-body-color dark:text-body-color-dark hover:text-primary">
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM15.4 11H12.1V17.6H9.9V11H8.8V8.8H9.9V7.7C9.9 5.83 11 4.4 13.2 4.4H15.4V6.6H14.1C13.2 6.6 12.1 7.15 12.1 8.25V8.8H15.4V11Z" fill="currentColor" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-px w-full bg-linear-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>
                <div className="py-8">
                    <p className="text-center text-base font-medium text-body-color dark:text-body-color-dark">
                        &copy; {new Date().getFullYear()} AdControl. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
