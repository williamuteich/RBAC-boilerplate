export default function AIFeatures() {
    return (
        <section className="relative py-24 bg-linear-to-b from-white to-gray-50 border-t border-gray-100">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[600px] bg-blue-50 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="container relative z-10 mx-auto px-4 max-w-[1200px]">
                <div className="flex flex-wrap items-center -mx-4">
                    <div className="w-full lg:w-5/12 px-4 mb-16 lg:mb-0">
                        <span className="text-blue-600 font-bold uppercase text-sm mb-4 block">Inteligência Artificial</span>
                        <h2 className="mb-6 text-4xl font-bold sm:text-5xl leading-tight text-gray-900">
                            Inteligência que <br /> trabalha por <span className="text-blue-600">você</span>
                        </h2>
                        <p className="mb-8 text-xl text-gray-600">
                            Nossa IA analisa campanhas, identifica problemas invisíveis e sugere melhorias de forma clara e objetiva para maximizar seus lucros.
                        </p>
                    </div>
                    <div className="w-full lg:w-7/12 px-4">
                        <div className="flex flex-col gap-6">
                            {[
                                { text: "Seu CPC está alto — tente ajustar essas palavras-chave específicas", type: "warning" },
                                { text: "Seu anúncio pode melhorar o CTR com pequenas mudanças no título", type: "info" },
                                { text: "Essas palavras negativas sugeridas podem reduzir seus custos diários", type: "success" }
                            ].map((alert, i) => (
                                <div key={i} className="flex gap-4 items-start p-6 rounded-2xl bg-white border border-gray-100 shadow-lg transform transition-all duration-300 hover:translate-x-4">
                                    <div className={`p-3 rounded-xl ${alert.type === 'warning' ? 'bg-orange-100 text-orange-600' : alert.type === 'info' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="pt-1">
                                        <p className="text-lg font-medium text-gray-900">{alert.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
