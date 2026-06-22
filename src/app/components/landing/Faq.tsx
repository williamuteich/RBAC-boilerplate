import { Card } from "@/components/ui/card";

export function Faq() {
  return (
    <section className="py-16 max-w-3xl mx-auto px-4 border-t border-[#E8E6F5]">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold tracking-tight text-[#2D2A4A]">
          Perguntas Frequentes
        </h2>
        <p className="text-xs text-[#696684] mt-2">
          Tudo o que você precisa saber sobre o Glamour Lindóia
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Card className="bg-white border-[#E8E6F5] p-5 flex flex-col gap-2 rounded-2xl shadow-[0_4px_20px_rgba(45,42,74,0.02)]">
          <h4 className="text-sm font-extrabold text-[#2D2A4A]">Como funciona o Glamour Lindóia?</h4>
          <p className="text-xs text-[#696684] leading-relaxed">
            Você preenche os dados do casal, adiciona suas fotos mais marcantes, escolhe a música tema e escreve uma carta de amor. Geramos uma página premium personalizada com um link exclusivo para você presentear seu parceiro(a).
          </p>
        </Card>

        <Card className="bg-white border-[#E8E6F5] p-5 flex flex-col gap-2 rounded-2xl shadow-[0_4px_20px_rgba(45,42,74,0.02)]">
          <h4 className="text-sm font-extrabold text-[#2D2A4A]">Por quanto tempo a página fica ativa?</h4>
          <p className="text-xs text-[#696684] leading-relaxed">
            A página fica ativa pelo período do plano escolhido (7, 30 ou 60 dias). Após esse período, você pode renovar para continuar mantendo seu link de amor ativo e acessível.
          </p>
        </Card>

        <Card className="bg-white border-[#E8E6F5] p-5 flex flex-col gap-2 rounded-2xl shadow-[0_4px_20px_rgba(45,42,74,0.02)]">
          <h4 className="text-sm font-extrabold text-[#2D2A4A]">Meu parceiro(a) precisa pagar para acessar o site?</h4>
          <p className="text-xs text-[#696684] leading-relaxed">
            Não! A visualização do site é totalmente gratuita para qualquer pessoa que receber o link. Apenas quem gerencia as fotos e mensagens pelo painel precisa ter o plano ativo.
          </p>
        </Card>

        <Card className="bg-white border-[#E8E6F5] p-5 flex flex-col gap-2 rounded-2xl shadow-[0_4px_20px_rgba(45,42,74,0.02)]">
          <h4 className="text-sm font-extrabold text-[#2D2A4A]">Posso alterar o conteúdo depois de publicado?</h4>
          <p className="text-xs text-[#696684] leading-relaxed">
            Sim! Pelo painel administrativo do Glamour Lindóia, você pode alterar as fotos, o texto, a música e a data especial quantas vezes quiser. Todas as atualizações aparecem instantaneamente na página publicada.
          </p>
        </Card>
      </div>
    </section>
  );
}
