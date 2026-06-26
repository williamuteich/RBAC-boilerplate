import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth"
import { auth } from "@/src/lib/auth-config"
import { CheckCircle2, ArrowRight } from "lucide-react"

interface PageProps {
  searchParams: Promise<{ plan?: string }>
}

const PLAN_LABELS: Record<string, string> = {
  basic: '1 Dia',
  standard: '7 Dias',
  pro: '30 Dias',
}

export default async function Success({ searchParams }: PageProps) {
  const { plan } = await searchParams
  const planKey = plan ?? 'standard'
  const planLabel = PLAN_LABELS[planKey] ?? '30 Dias'

  const sessionUser = await getServerSession(auth)
  if (!sessionUser || sessionUser.user.tipo !== 'USER') {
    return redirect('/login')
  }

  const customerEmail = sessionUser.user.email

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center border-4 border-emerald-100 shadow-lg shadow-emerald-100">
        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
      </div>
      <div className="text-center max-w-sm">
        <h2 className="text-2xl font-black text-[#2D2A4A] tracking-tight">Pagamento Confirmado!</h2>
        <p className="text-sm text-[#696684] mt-2 leading-relaxed">
          Agradecemos a sua preferência! Um e-mail de confirmação foi enviado para{' '}
          <span className="font-semibold text-slate-800">{customerEmail}</span>.
        </p>
        <p className="text-xs text-[#696684] mt-2">
          Seu acesso foi liberado por{' '}
          <span className="font-bold text-[#9A75F0]">{planLabel}</span>.
          Qualquer dúvida, entre em contato via{' '}
          <a href="/painel/suporte" className="text-[#9A75F0] hover:underline font-semibold">
            Suporte
          </a>.
        </p>
      </div>
      <a
        href="/painel"
        className="inline-flex items-center gap-2 bg-[#9A75F0] hover:bg-[#855fe6] text-white font-bold py-3 px-6 rounded-xl transition-all text-sm shadow-md shadow-[#9A75F0]/30 hover:scale-[1.02] active:scale-[0.98]"
      >
        Ir para meu painel
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  )
}
