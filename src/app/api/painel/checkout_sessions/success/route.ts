import { stripe } from '@/lib/stripe'
import { getServerSession } from "next-auth"
import { auth } from "@/src/lib/auth-config"
import { prisma } from "@/src/lib/prisma"
import { revalidateTag } from "next/cache"
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const session_id = searchParams.get('session_id')

    if (!session_id) {
      return NextResponse.json({ error: 'Session ID ausente' }, { status: 400 })
    }

    const sessionUser = await getServerSession(auth)
    if (!sessionUser || sessionUser.user.tipo !== 'USER') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const clientId = Number(sessionUser.user.id)
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
    
    if (checkoutSession.status === 'complete') {
      const isFulfilled = checkoutSession.metadata?.fulfilled === 'true'

      if (!isFulfilled) {
        const client = await prisma.saaSClient.findUnique({
          where: { id: clientId }
        })

        if (!client) {
          return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 })
        }

        const daysToGrant = Number(checkoutSession.metadata?.daysToGrant ?? 30)
        const planKey = checkoutSession.metadata?.plan ?? 'standard'

        const now = new Date()
        const baseDate = client.expirationDate && new Date(client.expirationDate) > now
          ? new Date(client.expirationDate)
          : now

        const newExpirationDate = new Date(baseDate.getTime() + daysToGrant * 24 * 60 * 60 * 1000)

        await prisma.saaSClient.update({
          where: { id: clientId },
          data: {
            status: 'ACTIVE',
            plan: planKey.toUpperCase(),
            expirationDate: newExpirationDate,
            lastPaymentValue: checkoutSession.amount_total ? checkoutSession.amount_total / 100 : null,
            lastPaymentDate: now,
          }
        })

        await stripe.checkout.sessions.update(session_id, {
          metadata: {
            ...checkoutSession.metadata,
            fulfilled: 'true'
          }
        })

        revalidateTag(`tribute-${client.tributeId}`, 'max' as any)
      }
    }

    const plan = checkoutSession.metadata?.plan ?? 'standard'
    const headersList = req.headers
    const host = headersList.get('host')
    const protocol = req.url.startsWith('https') ? 'https' : 'http'
    const origin = `${protocol}://${host}`
    
    return NextResponse.redirect(`${origin}/painel/success?plan=${plan}`, 303)
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro interno no checkout success' }, { status: 500 })
  }
}
