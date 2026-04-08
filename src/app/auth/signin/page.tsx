import Link from "next/link";

export default function SignIn() {
    return (
        <section className="relative z-10 flex min-h-[90vh] items-center justify-center overflow-hidden bg-gray-50 pt-[120px] pb-20">
            <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap justify-center">
                    <div className="w-full px-4 lg:w-5/12">
                        <div className="relative mx-auto max-w-[500px] rounded-2xl bg-white py-14 px-8 shadow-xl sm:p-[60px] border border-stroke">
                            <div className="mb-10 text-center">
                                <Link href="/" className="mb-10 inline-flex items-center gap-2">
                                    <img src="/logo.png" alt="AdControl" className="h-10" />
                                    <span className="text-2xl font-bold text-black">AdControl</span>
                                </Link>
                                <h3 className="mb-3 text-3xl font-bold text-black">
                                    Bem-vindo de volta!
                                </h3>
                                <p className="text-base font-medium text-body-color">
                                    Acesse sua conta com o Google para continuar.
                                </p>
                            </div>

                            <div className="mb-8">
                                <button className="flex w-full items-center justify-center gap-4 rounded-xl border border-stroke bg-white py-4 px-6 text-base font-semibold text-black shadow-sm duration-300 hover:border-primary hover:bg-gray-50 hover:shadow-md">
                                    <svg width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                                    </svg>
                                    Entrar com Google
                                </button>
                            </div>

                            <div className="relative mb-10 text-center">
                                <span className="absolute left-0 top-1/2 h-px w-full bg-stroke"></span>
                                <span className="relative z-10 inline-block bg-white px-4 text-sm font-medium text-body-color uppercase tracking-wider">
                                    ou
                                </span>
                            </div>

                            <p className="text-center text-base font-medium text-body-color">
                                Novo por aqui?{" "}
                                <Link href="/" className="font-bold text-primary hover:underline">
                                    Contate-nos
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
