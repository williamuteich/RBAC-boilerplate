import { stripe } from '@/lib/stripe'
import { getServerSession } from "next-auth"
import { auth } from "@/src/lib/auth-config"
import { prisma } from "@/src/lib/prisma"
import { revalidateTag } from "next/cache"
import { NextResponse } from 'next/server'

const PLAN_TO_DB: Record<string, string> = {
  basic: '1_DAY',
  standard: '7_DAYS',
  pro: '30_DAYS',
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const session_id = searchParams.get('session_id')

    if (!session_id || !session_id.startsWith('cs_')) {
      return NextResponse.redirect(new URL('/painel/cupom', req.url))
    }

    const sessionUser = await getServerSession(auth)
    if (!sessionUser || sessionUser.user.tipo !== 'USER') {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    const clientId = Number(sessionUser.user.id)
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)

    const sessionOwnerId = checkoutSession.metadata?.userId
    if (!sessionOwnerId || Number(sessionOwnerId) !== clientId) {
      console.warn(`[SECURITY] User ${clientId} tried to fulfill session ${session_id} owned by ${sessionOwnerId}`)
      return NextResponse.redirect(new URL('/painel/cupom', req.url))
    }

    if (checkoutSession.status === 'complete') {
      const isFulfilled = checkoutSession.metadata?.fulfilled === 'true'

      if (!isFulfilled) {
        if (checkoutSession.payment_status !== 'paid') {
          return NextResponse.redirect(new URL('/painel/cupom', req.url))
        }

        const client = await prisma.saaSClient.findUnique({
          where: { id: clientId },
          include: { tribute: true }
        })

        if (!client) {
          return NextResponse.redirect(new URL('/login', req.url))
        }

        const daysToGrant = Number(checkoutSession.metadata?.daysToGrant ?? 7)
        const planKey = checkoutSession.metadata?.plan ?? 'standard'
        const dbPlan = PLAN_TO_DB[planKey] ?? '7_DAYS'

        const now = new Date()
        const baseDate = client.expirationDate && new Date(client.expirationDate) > now
          ? new Date(client.expirationDate)
          : now

        const newExpirationDate = new Date(baseDate.getTime() + daysToGrant * 24 * 60 * 60 * 1000)

        await stripe.checkout.sessions.update(session_id, {
          metadata: {
            ...checkoutSession.metadata,
            fulfilled: 'true'
          }
        })

        await prisma.saaSClient.update({
          where: { id: clientId },
          data: {
            status: 'ACTIVE',
            plan: dbPlan,
            expirationDate: newExpirationDate,
            lastPaymentValue: checkoutSession.amount_total ? checkoutSession.amount_total / 100 : null,
            lastPaymentDate: now,
          }
        })

        if (client.tribute) {
          revalidateTag(`tribute-${client.tribute.tributeId}`, 'max')
        }
      }
    } else {
      return NextResponse.redirect(new URL('/painel/cupom', req.url))
    }

    const plan = checkoutSession.metadata?.plan ?? 'standard'
    return NextResponse.redirect(new URL(`/painel/success?plan=${plan}`, req.url), 303)
  } catch (err: any) {
    console.error('[Checkout Success Error]', err)
    return NextResponse.redirect(new URL('/painel/cupom', req.url))
  }
}
