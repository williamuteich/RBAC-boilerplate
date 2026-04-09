import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-[130px] pb-[120px] lg:pt-[180px] lg:pb-[180px] bg-white">
            <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-50 blur-[150px] pointer-events-none"></div>
            <div className="absolute top-[20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-100 blur-[120px] pointer-events-none"></div>

            <div className="container relative z-10 mx-auto px-4 max-w-[1200px]">
                <div className="text-center mx-auto max-w-[900px]">
                    <h1 className="mb-8 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:leading-[1.1] text-gray-900">
                        Gerencie campanhas do Google Ads com <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-blue-500 to-indigo-600">inteligência artificial</span> e mais controle
                    </h1>
                    <p className="mb-10 text-lg font-medium text-gray-600 sm:text-xl max-w-[700px] mx-auto">
                        Crie, analise e otimize campanhas com dados reais, sugestões inteligentes e foco total em conversão.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                        <Link href="/auth/signin" className="group rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-blue-700 w-full sm:w-auto text-center">
                            Começar agora
                        </Link>
                    </div>

                    <p className="mt-8 text-sm text-gray-500 font-medium">
                        Ideal para gestores de tráfego, clínicas, comércios locais e profissionais que querem resultados reais sem complicação.
                    </p>
                </div>
            </div>
        </section>
    );
}
