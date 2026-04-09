import Link from "next/link";

export default function Cta() {
    return (
        <section className="py-32 relative overflow-hidden bg-white border-t border-gray-100">
            <div className="absolute inset-0 bg-blue-50/50"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-100 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-[800px] relative z-10 text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-gray-900">Comece a controlar suas campanhas hoje</h2>
                <p className="text-xl text-gray-600 mb-10 font-medium">Sem necessidade de experiência avançada. Simples, direto e focado em resultado.</p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/auth/signin" className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold text-lg hover:scale-105 transition-transform shadow-xl hover:shadow-blue-500/30">
                        Criar conta
                    </Link>
                </div>
            </div>
        </section>
    );
}
