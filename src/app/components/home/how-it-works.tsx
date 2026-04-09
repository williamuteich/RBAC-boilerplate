export default function HowItWorks() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-[1200px]">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-gray-900">Como Funciona</h2>
                    <p className="text-xl text-gray-600">4 passos simples para o sucesso</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24 relative">
                    <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-0.5 bg-gray-200 z-0"></div>

                    {[
                        { num: "01", title: "Crie a campanha", desc: "Com ajuda da IA" },
                        { num: "02", title: "Acompanhe", desc: "Métricas no painel" },
                        { num: "03", title: "Receba sugestões", desc: "De melhoria ativa" },
                        { num: "04", title: "Otimize", desc: "E aumente resultados" }
                    ].map((step, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-20 h-20 rounded-2xl bg-white border-2 border-blue-600 flex items-center justify-center text-2xl font-bold text-blue-600 mb-6 transition-transform group-hover:scale-110 shadow-lg shadow-blue-100">
                                {step.num}
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h3>
                            <p className="text-gray-600">{step.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-[3rem] p-12 lg:p-16 text-center max-w-[900px] mx-auto shadow-sm">
                    <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900">Feito para quem quer <span className="text-blue-600">resultado</span></h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            "Gestores de tráfego",
                            "Clínicas",
                            "Pequenos negócios",
                            "Profissionais autônomos"
                        ].map((aud, i) => (
                            <span key={i} className="px-6 py-3 rounded-full bg-white text-gray-800 font-bold text-lg border border-gray-200 shadow-sm">
                                {aud}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
