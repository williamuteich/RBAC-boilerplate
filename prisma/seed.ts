import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from '../generated/prisma/client'

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const RESOURCE_ACTIONS: Record<string, string[]> = {
    usuarios: ["visualizar", "criar", "editar", "deletar"],
    cargos: ["visualizar", "criar", "editar", "deletar"],
    relatorios: ["visualizar", "criar", "editar", "deletar"],
    auditoria: ["visualizar"]
  };

  console.log('👑 Criando cargo Admin...');
  const permissionsList: { resource: string; action: string }[] = [];
  for (const [resource, actions] of Object.entries(RESOURCE_ACTIONS)) {
    for (const action of actions) {
      permissionsList.push({ resource, action });
    }
  }

  const adminRole = await prisma.adminRole.upsert({
    where: { name: 'Admin' },
    update: { 
      description: 'Cargo mestre do sistema. Único e protegido.',
      permissions: permissionsList
    },
    create: {
      name: 'Admin',
      description: 'Cargo mestre do sistema. Único e protegido.',
      permissions: permissionsList
    }
  });

  console.log('👤 Configurando usuário mestre...');
  await prisma.administrator.upsert({
    where: { email: 'williamuteich14@gmail.com' },
    update: {
      roleId: adminRole.id,
      active: true
    },
    create: {
      email: 'williamuteich14@gmail.com',
      name: 'William Master',
      active: true,
      roleId: adminRole.id
    },
  })

  console.log('👤 Configurando clientes SaaS...');
  
  const now = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(now.getMonth() + 1);

  const nextYear = new Date();
  nextYear.setFullYear(now.getFullYear() + 1);

  const pastDate = new Date();
  pastDate.setDate(now.getDate() - 5);

  const clientsData = [
    {
      email: "mateus.leticia@example.com",
      name: "Mateus & Leticia",
      slug: "mateus-e-leticia",
      status: "ACTIVE",
      plan: "7_DAYS",
      lastPaymentValue: 12.00,
      lastPaymentDate: now,
      expirationDate: nextMonth,
      pageViews: 125,
      photosCount: 4,
    },
    {
      email: "gabriel.amanda@example.com",
      name: "Gabriel & Amanda",
      slug: "gabriel-e-amanda",
      status: "ACTIVE",
      plan: "14_DAYS",
      lastPaymentValue: 24.00,
      lastPaymentDate: now,
      expirationDate: nextYear,
      pageViews: 1540,
      photosCount: 8,
    },
    {
      email: "felipe.juliana@example.com",
      name: "Felipe & Juliana",
      slug: "felipe-e-juliana",
      status: "PENDING",
      plan: "7_DAYS",
      lastPaymentValue: 12.00,
      lastPaymentDate: pastDate,
      expirationDate: pastDate,
      pageViews: 80,
      photosCount: 3,
    },
    {
      email: "lucas.gabriela@example.com",
      name: "Lucas & Gabriela",
      slug: "lucas-e-gabriela",
      status: "ACTIVE",
      plan: "30_DAYS",
      lastPaymentValue: 32.00,
      lastPaymentDate: now,
      expirationDate: null,
      pageViews: 3200,
      photosCount: 10,
    }
  ];

  for (const client of clientsData) {
    await prisma.saaSClient.upsert({
      where: { email: client.email },
      update: {
        status: client.status,
        plan: client.plan,
        lastPaymentValue: client.lastPaymentValue,
        lastPaymentDate: client.lastPaymentDate,
        expirationDate: client.expirationDate,
        pageViews: client.pageViews,
        photosCount: client.photosCount,
      },
      create: client
    });
  }

  console.log('✅ Setup "Admin" concluído!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())