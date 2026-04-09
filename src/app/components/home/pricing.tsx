export default function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-4 max-w-[1000px]">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium text-sm mb-4 border border-yellow-200">
                        Em breve: Resultados reais de nossos clientes
                    </div>
                    <h2 className="text-4xl font-bold mb-6 text-gray-900">Planos simples e acessíveis</h2>
                    <p className="text-xl text-gray-600">Escolha um plano que faça sentido para o seu negócio. Sem complicação, sem surpresas.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px] mx-auto">
                    <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm">
                        <h3 className="text-2xl font-bold mb-2 text-gray-900">Iniciante</h3>
                        <p className="text-gray-500 mb-6 font-medium">Para quem está começando</p>
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-gray-900">R$ 97</span>
                            <span className="text-gray-500">/mês</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex gap-2 text-gray-800 font-medium"><span className="text-blue-600 font-bold">✓</span> Até 3 campanhas</li>
                            <li className="flex gap-2 text-gray-800 font-medium"><span className="text-blue-600 font-bold">✓</span> IA Básica</li>
                            <li className="flex gap-2 text-gray-400 font-medium"><span className="text-gray-300 font-bold">X</span> Suporte Prioritário</li>
                        </ul>
                        <button className="w-full py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors font-bold text-gray-800">Selecionar</button>
                    </div>

                    <div className="p-8 rounded-3xl bg-linear-to-b from-blue-50 to-white border border-blue-500 relative transform md:-translate-y-4 shadow-xl">
                        <div className="absolute top-0 right-8 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            Mais Popular
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-900">Profissional</h3>
                        <p className="text-blue-700 mb-6 font-medium">Controle total da operação</p>
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-gray-900">R$ 197</span>
                            <span className="text-gray-600">/mês</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex gap-2 text-gray-900 font-medium"><span className="text-blue-600 font-bold">✓</span> Campanhas Ilimitadas</li>
                            <li className="flex gap-2 text-gray-900 font-medium"><span className="text-blue-600 font-bold">✓</span> IA Avançada e Sugestões</li>
                            <li className="flex gap-2 text-gray-900 font-medium"><span className="text-blue-600 font-bold">✓</span> Suporte Prioritário VIP</li>
                        </ul>
                        <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors font-bold text-white shadow-lg">Selecionar</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
