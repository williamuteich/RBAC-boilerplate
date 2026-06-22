import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { checkAdminApi, hasPermission } from "@/src/lib/auth-helpers/auth-helpers-server";
import { withAudit } from "@/src/lib/auditoria/audit";
import { idParamSchema } from "@/src/schemas/admin";
import { updateClienteSchema } from "@/src/schemas/clientes";

async function _PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await checkAdminApi();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  if (!hasPermission(session, "clientes", "editar")) {
    return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
  }

  const { id } = await params;
  const paramVal = idParamSchema.safeParse({ id });
  if (!paramVal.success) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }
  const clientId = paramVal.data.id;

  try {
    const body = await request.json();
    const validated = updateClienteSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error.issues[0].message }, { status: 400 });
    }

    const { plan, status, expirationDate, lastPaymentValue } = validated.data;

    const updated = await prisma.saaSClient.update({
      where: { id: clientId },
      data: {
        ...(plan && { plan }),
        ...(status && { status }),
        ...(lastPaymentValue !== undefined && { lastPaymentValue }),
        ...(expirationDate !== undefined && { 
          expirationDate: expirationDate ? new Date(expirationDate) : null 
        }),
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    return NextResponse.json({ error: "Erro ao atualizar cliente" }, { status: 500 });
  }
}

export const PUT = withAudit(_PUT, { resource: "clientes" });
