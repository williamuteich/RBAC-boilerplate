export default function Solution() {
    return (
        <section className="py-32 bg-white">
            <div className="container mx-auto px-4 max-w-[1000px] text-center">
                <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-4 block">A Solução</span>
                <h2 className="mb-8 text-4xl font-bold sm:text-5xl leading-tight text-gray-900">
                    Uma plataforma simples <br />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500">com inteligência por trás</span>
                </h2>
                <p className="mb-16 text-xl text-gray-600 max-w-[800px] mx-auto">
                    O AdControl AI foi criado para simplificar o gerenciamento de campanhas e ajudar você a tomar decisões melhores com base em dados transparentes.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { title: "Criação de campanhas com IA", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
                        { title: "Sugestões de melhoria", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                        { title: "Visualização métricas", icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" },
                        { title: "Foco em ROI", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center p-8 rounded-3xl bg-white border border-gray-100 shadow-xl hover:border-blue-500/30 transition-colors">
                            <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
