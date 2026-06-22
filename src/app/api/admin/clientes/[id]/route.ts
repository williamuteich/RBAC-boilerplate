import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { checkAdminApi, hasPermission } from "@/src/lib/auth-helpers/auth-helpers-server";
import { withAudit } from "@/src/lib/auditoria/audit";

async function _PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await checkAdminApi();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  if (!hasPermission(session, "clientes", "editar")) {
    return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
  }

  const { id } = await params;
  const clientId = parseInt(id);

  try {
    const body = await request.json();
    const { plan, status, expirationDate, lastPaymentValue } = body;

    const updated = await prisma.saaSClient.update({
      where: { id: clientId },
      data: {
        ...(plan && { plan }),
        ...(status && { status }),
        ...(lastPaymentValue !== undefined && { lastPaymentValue: parseFloat(lastPaymentValue) }),
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
