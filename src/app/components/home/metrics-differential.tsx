export default function MetricsDifferential() {
    return (
        <section className="py-24 border-y border-gray-100 bg-white">
            <div className="container mx-auto px-4 max-w-[1200px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    <div className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-200">
                        <span className="text-2xl mb-4 block">📊</span>
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">Dados que realmente importam</h2>
                        <p className="text-gray-600 mb-8 text-lg">Tenha uma visão completa das suas campanhas com métricas simples e diretas.</p>

                        <ul className="space-y-4">
                            {["Cliques", "Impressões", "CPC", "Conversões", "Custo total"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-lg font-medium text-gray-800">
                                    <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-linear-to-br from-blue-50 to-white rounded-[2.5rem] p-10 border border-blue-100 shadow-sm">
                        <span className="text-2xl mb-4 block">🎯</span>
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">Mais controle, menos achismo</h2>
                        <p className="text-gray-600 mb-8 text-lg">Ao invés de depender apenas da plataforma de anúncios, você terá um painel próprio com insights claros e organizados.</p>

                        <ul className="space-y-4">
                            {[
                                "Entenda o que está funcionando",
                                "Saiba onde ajustar",
                                "Tome decisões com confiança"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-lg font-medium text-gray-800">
                                    <div className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
