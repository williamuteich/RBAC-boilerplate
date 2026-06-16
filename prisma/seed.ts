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

  console.log('✅ Setup "Admin" concluído!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())