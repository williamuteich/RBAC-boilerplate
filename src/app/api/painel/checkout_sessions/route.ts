import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getServerSession } from 'next-auth'
import { auth } from '@/src/lib/auth-config'
import { stripe } from '@/lib/stripe'

const PLANS: Record<string, { priceEnvKey: string; days: number; label: string }> = {
    basic: { priceEnvKey: 'STRIPE_PRICE_BASIC', days: 1, label: '1 Dia' },
    standard: { priceEnvKey: 'STRIPE_PRICE_STANDARD', days: 7, label: '7 Dias' },
    pro: { priceEnvKey: 'STRIPE_PRICE_PRO', days: 30, label: '30 Dias' },
}

export async function POST(req: Request) {
    try {
        const sessionUser = await getServerSession(auth)
        if (!sessionUser || sessionUser.user.tipo !== 'USER') {
            return NextResponse.json(
                { error: 'Não autorizado. Por favor, faça login.' },
                { status: 401 }
            )
        }

        const headersList = await headers()
        const origin = headersList.get('origin')

        const formData = await req.formData()
        const planKey = (formData.get('plan') as string | null) || 'standard'
        const plan = PLANS[planKey] ?? PLANS.standard

        const priceId = process.env[plan.priceEnvKey]
        if (!priceId) {
            return NextResponse.json(
                { error: `Variável de ambiente ${plan.priceEnvKey} não está configurada.` },
                { status: 500 }
            )
        }

        const session = await stripe.checkout.sessions.create({
            client_reference_id: String(sessionUser.user.id),
            customer_email: sessionUser.user.email ?? undefined,
            metadata: {
                userId: String(sessionUser.user.id),
                email: sessionUser.user.email ?? '',
                plan: planKey,
                daysToGrant: String(plan.days),
            },
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/api/painel/checkout_sessions/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/painel/cupom`,
        });

        return NextResponse.redirect(session.url!, 303)
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Erro ao criar sessão de checkout';
        const status = (err as { statusCode?: number }).statusCode ?? 500;
        return NextResponse.json({ error: message }, { status })
    }
}