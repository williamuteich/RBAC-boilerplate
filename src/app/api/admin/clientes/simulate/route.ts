import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { cookies } from "next/headers";
import { simulateClientSchema } from "@/src/schemas/clientes";

export async function POST(req: Request) {
  const session = await getServerSession(auth);
  if (!session || session.user.tipo !== "ADMINISTRATOR") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validated = simulateClientSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error.issues[0].message }, { status: 400 });
    }

    const { email } = validated.data;

    const cookieStore = await cookies();
    cookieStore.set("impersonated_client_email", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/"
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Erro ao processar requisição" }, { status: 400 });
  }
}

export async function DELETE() {
  const session = await getServerSession(auth);
  if (!session || session.user.tipo !== "ADMINISTRATOR") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.delete("impersonated_client_email");

  return NextResponse.json({ success: true });
}
