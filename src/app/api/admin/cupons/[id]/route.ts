import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { checkAdminApi, hasPermission } from "@/src/lib/auth-helpers/auth-helpers-server";
import { idParamSchema } from "@/src/schemas/cupons";
import { withAudit } from "@/src/lib/auditoria/audit";

async function _DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await checkAdminApi();
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  if (!hasPermission(session, "cupons", "deletar")) {
    return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
  }

  const validatedParams = idParamSchema.safeParse(await params);
  if (!validatedParams.success) {
    return NextResponse.json({ error: validatedParams.error.issues[0].message }, { status: 400 });
  }
  const { id } = validatedParams.data;

  try {
    const coupon = await prisma.coupon.findUnique({
      where: { id }
    });

    if (!coupon) {
      return NextResponse.json({ error: "Cupom não encontrado" }, { status: 404 });
    }

    await prisma.coupon.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar cupom:", error);
    return NextResponse.json({ error: "Erro ao deletar" }, { status: 500 });
  }
}

const getIdFromCtx = async (ctx: { params?: Promise<{ id: string }> }) =>
  (await ctx.params!).id;

export const DELETE = withAudit(_DELETE, { resource: "cupons", getResourceId: getIdFromCtx });
