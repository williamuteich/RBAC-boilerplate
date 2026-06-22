import { Clock, Image as ImageIcon, Lock, MessageCircle, Smartphone, Palette } from "lucide-react";
import { Card } from "@/components/ui/card";

export function Features() {
  return (
    <section className="py-16 max-w-5xl mx-auto px-4">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-2xl font-bold tracking-tight text-[#2D2A4A] sm:text-3xl">
          Crie um presente memorável e único
        </h2>
        <p className="text-xs text-[#696684] mt-2">
          Nossa plataforma oferece tudo o que você precisa para emocionar quem você ama.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white border-[#E8E6F5] hover:border-[#D5D2F0] p-6 flex flex-col gap-3 rounded-3xl transition-all shadow-[0_4px_20px_rgba(45,42,74,0.03)] hover:shadow-[0_8px_30px_rgba(45,42,74,0.06)]">
          <div className="w-11 h-11 rounded-2xl bg-[#EFEAFA] flex items-center justify-center text-[#8B5CF6]">
            <Palette className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-[#2D2A4A]">Temas Exclusivos</h3>
          <p className="text-xs text-[#696684] leading-relaxed">
            Escolha as cores e estilos visuais que melhor combinam com o casal, personalizando cada detalhe do visual.
          </p>
        </Card>

        <Card className="bg-white border-[#E8E6F5] hover:border-[#D5D2F0] p-6 flex flex-col gap-3 rounded-3xl transition-all shadow-[0_4px_20px_rgba(45,42,74,0.03)] hover:shadow-[0_8px_30px_rgba(45,42,74,0.06)]">
          <div className="w-11 h-11 rounded-2xl bg-[#EFEAFA] flex items-center justify-center text-[#8B5CF6]">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-[#2D2A4A]">Contador de Tempo Real</h3>
          <p className="text-xs text-[#696684] leading-relaxed">
            Exiba anos, meses, dias, horas, minutos e segundos que vocês compartilham juntos. Um lembrete vivo de cada instante.
          </p>
        </Card>

        <Card className="bg-white border-[#E8E6F5] hover:border-[#D5D2F0] p-6 flex flex-col gap-3 rounded-3xl transition-all shadow-[0_4px_20px_rgba(45,42,74,0.03)] hover:shadow-[0_8px_30px_rgba(45,42,74,0.06)]">
          <div className="w-11 h-11 rounded-2xl bg-[#EFEAFA] flex items-center justify-center text-[#8B5CF6]">
            <ImageIcon className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-[#2D2A4A]">Galeria de Memórias</h3>
          <p className="text-xs text-[#696684] leading-relaxed">
            Faça o upload das fotos mais marcantes de viagens, encontros e momentos especiais do casal de forma organizada.
          </p>
        </Card>

        <Card className="bg-white border-[#E8E6F5] hover:border-[#D5D2F0] p-6 flex flex-col gap-3 rounded-3xl transition-all shadow-[0_4px_20px_rgba(45,42,74,0.03)] hover:shadow-[0_8px_30px_rgba(45,42,74,0.06)]">
          <div className="w-11 h-11 rounded-2xl bg-[#EFEAFA] flex items-center justify-center text-[#8B5CF6]">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-[#2D2A4A]">Cápsula do Tempo</h3>
          <p className="text-xs text-[#696684] leading-relaxed">
            Programe cartas e recados especiais para abrirem somente na data de aniversário do casal ou outra data marcante.
          </p>
        </Card>

        <Card className="bg-white border-[#E8E6F5] hover:border-[#D5D2F0] p-6 flex flex-col gap-3 rounded-3xl transition-all shadow-[0_4px_20px_rgba(45,42,74,0.03)] hover:shadow-[0_8px_30px_rgba(45,42,74,0.06)]">
          <div className="w-11 h-11 rounded-2xl bg-[#EFEAFA] flex items-center justify-center text-[#8B5CF6]">
            <MessageCircle className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-[#2D2A4A]">Mural de Mensagens</h3>
          <p className="text-xs text-[#696684] leading-relaxed">
            Espaço para o seu amor deixar recados ou depoimentos carinhosos sobre a trajetória e a união de vocês.
          </p>
        </Card>

        <Card className="bg-white border-[#E8E6F5] hover:border-[#D5D2F0] p-6 flex flex-col gap-3 rounded-3xl transition-all shadow-[0_4px_20px_rgba(45,42,74,0.03)] hover:shadow-[0_8px_30px_rgba(45,42,74,0.06)]">
          <div className="w-11 h-11 rounded-2xl bg-[#EFEAFA] flex items-center justify-center text-[#8B5CF6]">
            <Smartphone className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-[#2D2A4A]">Design Otimizado</h3>
          <p className="text-xs text-[#696684] leading-relaxed">
            Desenvolvido sob o conceito mobile-first para carregar perfeitamente em qualquer smartphone com extrema fluidez.
          </p>
        </Card>
      </div>
    </section>
  );
}
