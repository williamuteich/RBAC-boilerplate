import { Card } from "@/components/ui/card";

export function Faq() {
  return (
    <section className="py-16 max-w-3xl mx-auto px-4 border-t border-[#E8E6F5]">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold tracking-tight text-[#2D2A4A]">
          Perguntas Frequentes
        </h2>
        <p className="text-xs text-[#696684] mt-2">
          Tudo o que você precisa saber sobre o Eterno.love
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Card className="bg-white border-[#E8E6F5] p-5 flex flex-col gap-2 rounded-2xl shadow-[0_4px_20px_rgba(45,42,74,0.02)]">
          <h4 className="text-sm font-extrabold text-[#2D2A4A]">Como funciona a parceria Glamour Lindóia?</h4>
          <p className="text-xs text-[#696684] leading-relaxed">
            Ao adquirir suas alianças de prata na Glamour Lindóia, você ganha acesso exclusivo à nossa plataforma para criar sua página personalizada. O acesso é liberado diretamente após a compra e você pode criar a página imediatamente.
          </p>
        </Card>

        <Card className="bg-white border-[#E8E6F5] p-5 flex flex-col gap-2 rounded-2xl shadow-[0_4px_20px_rgba(45,42,74,0.02)]">
          <h4 className="text-sm font-extrabold text-[#2D2A4A]">O que acontece após o período incluso acabar?</h4>
          <p className="text-xs text-[#696684] leading-relaxed">
            Após o término do período incluso no seu pacote de alianças, a página ficará pausada para visitas. Você poderá reativá-la assinando um plano de manutenção acessível ou realizando um pagamento anual para manter no ar.
          </p>
        </Card>

        <Card className="bg-white border-[#E8E6F5] p-5 flex flex-col gap-2 rounded-2xl shadow-[0_4px_20px_rgba(45,42,74,0.02)]">
          <h4 className="text-sm font-extrabold text-[#2D2A4A]">Meu parceiro(a) precisa pagar para acessar o site?</h4>
          <p className="text-xs text-[#696684] leading-relaxed">
            Não! A visualização do site é totalmente gratuita para qualquer pessoa que receber o link. Apenas quem gerencia as fotos e mensagens pelo painel precisa ter a licença ativa.
          </p>
        </Card>

        <Card className="bg-white border-[#E8E6F5] p-5 flex flex-col gap-2 rounded-2xl shadow-[0_4px_20px_rgba(45,42,74,0.02)]">
          <h4 className="text-sm font-extrabold text-[#2D2A4A]">Posso alterar o conteúdo depois de publicado?</h4>
          <p className="text-xs text-[#696684] leading-relaxed">
            Sim! Pelo painel administrativo do Eterno.love, você pode alterar as fotos, o texto, os contadores e os temas visuais quantas vezes quiser. Todas as atualizações aparecem instantaneamente na página publicada.
          </p>
        </Card>
      </div>
    </section>
  );
}
