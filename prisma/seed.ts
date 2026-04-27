// prisma/seed.ts — só isso
import { PrismaClient } from '../generated/prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Cria o primeiro admin sem cargo (all:all automático)
  await prisma.administrator.upsert({
    where: { email: 'seu@email.com' },
    update: {},
    create: {
      email: 'seu@email.com',
      name: 'Super Admin',
      active: true,
    },
  })
  console.log('✅ Super Admin criado!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())