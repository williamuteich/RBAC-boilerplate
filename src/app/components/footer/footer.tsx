import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative z-10 bg-white pt-20 lg:pt-24 dark:bg-gray-dark">
            <div className="container mx-auto max-w-[1400px] px-4">
                <div className="-mx-4 flex flex-wrap justify-center">
                    <div className="w-full px-4 flex justify-center">
                        <div className="mb-12 max-w-[360px] flex flex-col items-center text-center lg:mb-16">
                            <Link href="/" className="mb-8 flex items-center gap-2 text-[#EA580C]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-key">
                                  <circle cx="7.5" cy="15.5" r="5.5" />
                                  <path d="m21 2-9.6 9.6" />
                                  <path d="m15.5 7.5 3 3L22 7l-3-3" />
                                </svg>
                                <span className="text-2xl font-black tracking-tighter text-neutral-900">
                                    Rental<span className="text-orange-600">Pro</span>
                                </span>
                            </Link>
                            <p className="mb-9 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
                                Gestão completa para sua locadora de equipamentos. Controle lojistas, devoluções e relatórios.
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
                        &copy; {new Date().getFullYear()} RentalPro. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
