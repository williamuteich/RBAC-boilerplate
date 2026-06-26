import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getServerSession } from 'next-auth'
import { auth } from '@/src/lib/auth-config'
import { stripe } from '@/lib/stripe'

const PLANS: Record<string, { priceEnvKey: string; days: number; label: string }> = {
  basic: { priceEnvKey: 'STRIPE_PRICE_BASIC', days: 1, label: '1 Dia' },
  standard: { priceEnvKey: 'STRIPE_PRICE_STANDARD', days: 7, label: '7 Dias' },
  pro: { priceEnvKey: 'STRIPE_PRICE_PRO', days: 30, label: '30 Dias' },
}

const ALLOWED_ORIGINS = [
  process.env.NEXTAUTH_URL || 'http://localhost:3000',
  'https://glamourlindoia.com.br',
]

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const planKey = searchParams.get('plan') ?? 'standard'

  if (!PLANS[planKey]) {
    return NextResponse.redirect(new URL('/painel/cupom', req.url))
  }

  const sessionUser = await getServerSession(auth)


  if (!sessionUser || sessionUser.user.tipo !== 'USER') {
    const cookieStore = await cookies()
    cookieStore.set('checkout_plan', planKey, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 10,
      path: '/',
    })
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', `/api/painel/checkout_sessions/quick?plan=${planKey}`)
    return NextResponse.redirect(loginUrl)
  }

  const plan = PLANS[planKey]
  const priceId = process.env[plan.priceEnvKey]

  if (!priceId) {
    return NextResponse.json({ error: `Plano ${planKey} não configurado.` }, { status: 500 })
  }

  const origin = ALLOWED_ORIGINS[0]

  try {
    const session = await stripe.checkout.sessions.create({
      client_reference_id: String(sessionUser.user.id),
      customer_email: sessionUser.user.email ?? undefined,
      metadata: {
        userId: String(sessionUser.user.id),
        email: sessionUser.user.email ?? '',
        plan: planKey,
        daysToGrant: String(plan.days),
      },
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${origin}/api/painel/checkout_sessions/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/painel/cupom`,
    })

    const cookieStore = await cookies()
    cookieStore.delete('checkout_plan')

    return NextResponse.redirect(session.url!, 303)
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Erro ao criar sessão de checkout' },
      { status: 500 }
    )
  }
}
