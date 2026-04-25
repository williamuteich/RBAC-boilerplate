import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Link from "next/link";
import { PackageSearch, RotateCcw, TrendingUp, ShieldCheck, Box, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 text-neutral-900 selection:bg-orange-500 selection:text-white">
      <Header />

      <section className="relative w-full pt-[120px] pb-[80px] lg:pt-[160px] lg:pb-[140px] bg-linear-to-br from-[#1c120c] via-[#4a2610] to-[#b34914] overflow-hidden">
        <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>

        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-orange-400/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container relative z-10 mx-auto px-4 max-w-[1200px]">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
                <ShieldCheck className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-semibold text-orange-100 uppercase tracking-wide">Plataforma Exclusiva para Lojistas</span>
              </div>
              <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:leading-[1.1] text-white">
                Gestão completa para sua <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-yellow-300">locadora de equipamentos</span>
              </h1>
              <p className="mb-10 text-lg sm:text-xl font-medium text-orange-100/80 max-w-[600px] mx-auto lg:mx-0">
                Controle seu estoque, locações, clientes e relatórios em uma única plataforma. Detecção automática de atrasos, cálculo de multas e visão financeira em tempo real do seu negócio.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link href="/auth/signin" className="group rounded-2xl bg-orange-500 px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] w-full sm:w-auto text-center flex items-center justify-center gap-2">
                  Acessar Sistema
                  <TrendingUp className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="#features" className="group rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:bg-white/20 w-full sm:w-auto text-center">
                  Ver funcionalidades
                </Link>
              </div>
            </div>

            <div className="lg:w-[55%] w-full max-w-2xl mx-auto z-20">
              <div className="relative rounded-2xl overflow-hidden bg-[#f9fafb] shadow-2xl border border-white/20 transform transition-transform duration-700 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col h-[380px] lg:h-[420px] w-full lg:scale-110 lg:origin-left">

                <div className="flex h-full w-full">
                  <div className="w-12 sm:w-32 bg-dark shrink-0 flex flex-col xs:flex">
                    <div className="h-14 flex items-center px-4 border-b border-white/10">
                      <div className="w-6 h-6 rounded bg-orange-500"></div>
                      <div className="hidden sm:block h-3 w-20 bg-white/20 rounded ml-2"></div>
                    </div>
                    <div className="p-3 sm:p-4 space-y-3">
                      <div className="h-8 w-full bg-orange-500/20 rounded-md border border-orange-500/30"></div>
                      <div className="h-8 w-full bg-white/5 rounded-md"></div>
                      <div className="h-8 w-full bg-white/5 rounded-md"></div>
                      <div className="h-8 w-full bg-white/5 rounded-md"></div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    <div className="h-14 bg-white border-b border-neutral-200 flex items-center justify-between px-4 sm:px-6 shrink-0">
                      <div className="h-4 w-32 bg-neutral-200 rounded-sm hidden sm:block"></div>
                      <div className="flex gap-2 w-full justify-end sm:w-auto">
                        <div className="h-8 w-20 sm:w-28 bg-neutral-100 border border-neutral-200 rounded-md hidden xs:block"></div>
                        <div className="h-8 w-24 sm:w-32 bg-orange-500 rounded-md"></div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6 flex-1 overflow-hidden flex flex-col gap-4 bg-[#f9fafb]">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 shrink-0">
                        <div className="bg-white p-2 sm:p-3 rounded-xl border border-neutral-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-orange-50 flex items-center justify-center mb-2">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-400 rounded-sm"></div>
                          </div>
                          <div className="text-lg sm:text-xl font-bold text-neutral-800 leading-none mb-1">124</div>
                          <div className="text-[9px] sm:text-[10px] text-neutral-500 truncate">Equipamentos</div>
                        </div>
                        <div className="bg-white p-2 sm:p-3 rounded-xl border border-neutral-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-blue-50 flex items-center justify-center mb-2">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-400 rounded-sm"></div>
                          </div>
                          <div className="text-lg sm:text-xl font-bold text-neutral-800 leading-none mb-1">45</div>
                          <div className="text-[9px] sm:text-[10px] text-neutral-500 truncate">Locações Ativas</div>
                        </div>
                        <div className="bg-white p-2 sm:p-3 rounded-xl border border-red-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-red-50 flex items-center justify-center mb-2">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-400 rounded-full"></div>
                          </div>
                          <div className="text-lg sm:text-xl font-bold text-red-600 leading-none mb-1">3</div>
                          <div className="text-[9px] sm:text-[10px] text-red-500 truncate">Em Atraso</div>
                        </div>
                        <div className="bg-white p-2 sm:p-3 rounded-xl border border-neutral-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hidden sm:block">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-green-50 flex items-center justify-center mb-2">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full"></div>
                          </div>
                          <div className="text-lg sm:text-xl font-bold text-neutral-800 leading-none mb-1">R$ 4.2k</div>
                          <div className="text-[9px] sm:text-[10px] text-neutral-500 truncate">Receita Mês</div>
                        </div>
                      </div>

                      <div className="flex gap-4 flex-1 min-h-0">
                        <div className="flex-2 bg-white rounded-xl border border-neutral-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-4 sm:p-5 flex flex-col overflow-hidden">
                          <div className="text-[11px] sm:text-xs font-bold text-neutral-800 mb-4 uppercase tracking-wider">Próximas Devoluções</div>
                          <div className="flex-1 space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="h-3.5 w-24 sm:w-32 bg-neutral-800 rounded mb-1.5"></div>
                                <div className="h-2 w-20 sm:w-28 bg-neutral-400 rounded"></div>
                              </div>
                              <div className="h-6 w-16 sm:w-20 bg-red-50 border border-red-100 text-red-600 rounded-md text-[9px] sm:text-[10px] font-bold flex items-center justify-center">ATRASADA</div>
                            </div>
                            <div className="h-px w-full bg-neutral-100"></div>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="h-3.5 w-32 sm:w-40 bg-neutral-800 rounded mb-1.5"></div>
                                <div className="h-2 w-24 sm:w-32 bg-neutral-400 rounded"></div>
                              </div>
                              <div className="h-6 w-16 sm:w-20 bg-neutral-50 border border-neutral-200 text-neutral-600 rounded-md text-[9px] sm:text-[10px] font-bold flex items-center justify-center">HOJE</div>
                            </div>
                            <div className="h-px w-full bg-neutral-100"></div>
                            <div className="flex items-center justify-between xs:flex">
                              <div>
                                <div className="h-3.5 w-20 sm:w-28 bg-neutral-800 rounded mb-1.5"></div>
                                <div className="h-2 w-24 sm:w-32 bg-neutral-400 rounded"></div>
                              </div>
                              <div className="h-6 w-16 sm:w-20 bg-green-50 border border-green-100 text-green-700 rounded-md text-[9px] sm:text-[10px] font-bold flex items-center justify-center">AMANHÃ</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 bg-white rounded-xl border border-neutral-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-4 sm:p-5 hidden lg:flex flex-col">
                          <div className="text-xs font-bold text-neutral-800 mb-5 uppercase tracking-wider">Estoque</div>
                          <div className="space-y-5">
                            <div>
                              <div className="flex justify-between text-[11px] font-medium text-neutral-600 mb-1.5"><span>Disponíveis</span><span className="text-neutral-900 font-bold">67%</span></div>
                              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden"><div className="w-[67%] h-full bg-green-500 rounded-full"></div></div>
                            </div>
                            <div>
                              <div className="flex justify-between text-[11px] font-medium text-neutral-600 mb-1.5"><span>Alugados</span><span className="text-neutral-900 font-bold">25%</span></div>
                              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden"><div className="w-[25%] h-full bg-orange-400 rounded-full"></div></div>
                            </div>
                            <div>
                              <div className="flex justify-between text-[11px] font-medium text-neutral-600 mb-1.5"><span>Em Atraso</span><span className="text-red-600 font-bold">8%</span></div>
                              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden"><div className="w-[8%] h-full bg-red-500 rounded-full"></div></div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-white relative">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">Controle total da sua locadora</h2>
            <p className="text-lg text-neutral-600">O RentalPro centraliza toda a operação da sua loja. Controle de ponta a ponta: do cadastro do equipamento até a devolução do cliente.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <PackageSearch className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Estoque e Equipamentos</h3>
              <p className="text-neutral-600 leading-relaxed">Cadastre seus equipamentos com detalhes completos: nome, descrição, valor da diária padrão e valor de multa pré-definido por atrasos.</p>
            </div>

            <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <RotateCcw className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Gestão de Locações</h3>
              <p className="text-neutral-600 leading-relaxed">Registro ágil de saídas e entradas. O sistema verifica automaticamente se a devolução está no prazo, calculando multas e diárias extras sem erro humano.</p>
            </div>

            <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Relatórios Financeiros</h3>
              <p className="text-neutral-600 leading-relaxed">Acompanhe seu fluxo de entradas e saídas por dia ou mês. Tenha total clareza dos valores faturados por período para facilitar sua contabilidade.</p>
            </div>

            <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Box className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Dashboard Inteligente</h3>
              <p className="text-neutral-600 leading-relaxed">Acesse rapidamente o cenário da sua loja: equipamentos livres para locação, itens alugados no momento e um alerta visual de equipamentos em atraso.</p>
            </div>

            <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group lg:col-span-2">
              <div className="flex flex-col md:flex-row gap-8 items-center h-full">
                <div className="flex-1">
                  <div className="w-14 h-14 bg-neutral-900 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Users className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">Equipe e Clientes</h3>
                  <p className="text-neutral-600 leading-relaxed">Mantenha o cadastro atualizado de todos os seus clientes com histórico de locações. Além disso, crie acessos para seus funcionários operarem a plataforma com segurança no dia a dia da loja.</p>
                </div>
                <div className="w-full md:w-[250px] aspect-video md:aspect-square lg:aspect-video bg-neutral-200 rounded-xl overflow-hidden shadow-inner flex items-center justify-center shrink-0 relative">
                  <div className="absolute inset-0 bg-neutral-100 flex flex-col items-center justify-center p-4">
                    <div className="flex -space-x-4 mb-4">
                      <div className="w-12 h-12 rounded-full border-4 border-white bg-orange-200 z-30"></div>
                      <div className="w-12 h-12 rounded-full border-4 border-white bg-orange-300 z-20"></div>
                      <div className="w-12 h-12 rounded-full border-4 border-white bg-orange-400 z-10"></div>
                    </div>
                    <div className="w-32 h-2 bg-neutral-300 rounded-full mb-2"></div>
                    <div className="w-24 h-2 bg-neutral-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-[1200px] relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Pronto para acelerar sua locadora?</h2>
          <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">Pare de perder dinheiro com atrasos e planilhas desorganizadas. Comece a gerenciar seu estoque e clientes de forma profissional.</p>
          <Link href="/auth/signin" className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-10 py-5 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]">
            Acessar Minha Locadora
            <TrendingUp className="w-6 h-6" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}