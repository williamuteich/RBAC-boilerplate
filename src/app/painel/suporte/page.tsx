import { MessageSquare, Mail, PhoneCall } from "lucide-react";

export default function SuportePage() {
  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white border border-[#E8E6F5] rounded-[32px] p-8 md:p-10 shadow-[0_10px_40px_rgba(45,42,74,0.01)] flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF9FF] border border-[#E8E6F5] flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-[#9A75F0]" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-[#2D2A4A]">Suporte Eterno.love</h1>
            <p className="text-xs text-[#696684]">Estamos aqui para ajudar você no que for preciso.</p>
          </div>
        </div>

        <div className="h-px bg-[#E8E6F5] w-full" />

        <div className="flex flex-col gap-4 text-xs text-[#696684] leading-relaxed">
          <p>
            Caso tenha qualquer dúvida, sugestão ou dificuldade para editar a sua página de homenagem, entre em contato diretamente conosco através de um dos nossos canais de atendimento oficial:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <a 
              href="mailto:contato@eterno.love"
              className="p-4 rounded-2xl border border-[#E8E6F5] bg-[#FAF9FF] flex flex-col gap-2 hover:border-[#9A75F0] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <Mail className="w-4 h-4 text-[#9A75F0]" />
                <span>E-mail</span>
              </div>
              <span className="font-semibold text-[#9A75F0] group-hover:underline">contato@eterno.love</span>
            </a>

            <a 
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl border border-[#E8E6F5] bg-[#FAF9FF] flex flex-col gap-2 hover:border-[#9A75F0] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <PhoneCall className="w-4 h-4 text-[#9A75F0]" />
                <span>WhatsApp</span>
              </div>
              <span className="font-semibold text-[#9A75F0] group-hover:underline">(11) 99999-9999</span>
            </a>
          </div>

          <p className="mt-2">
            Nosso horário de atendimento é de segunda a sexta-feira, das 9h às 18h. Respondemos a maioria das solicitações em menos de 24 horas úteis.
          </p>
        </div>
      </div>
    </div>
  );
}
