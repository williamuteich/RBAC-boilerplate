export default function Problem() {
    return (
        <section className="relative py-24 bg-gray-50 border-y border-gray-100">
            <div className="container mx-auto px-4 max-w-[1200px]">
                <div className="flex flex-wrap items-center -mx-4">
                    <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
                        <h2 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl leading-tight text-gray-900">
                            Você está gastando dinheiro sem saber <span className="text-red-500">o que funciona?</span>
                        </h2>
                        <p className="mb-8 text-lg text-gray-600">
                            Criar campanhas no Google Ads pode ser complicado. Muitos acabam investindo sem estratégia, sem análise e sem saber onde estão perdendo dinheiro.
                        </p>
                    </div>
                    <div className="w-full lg:w-1/2 px-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { title: "Palavras-chave erradas", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" },
                                { title: "CPC alto", icon: "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" },
                                { title: "Baixa conversão", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                                { title: "Falta de análise clara", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }
                            ].map((item, i) => (
                                <div key={i} className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <svg className="w-8 h-8 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
