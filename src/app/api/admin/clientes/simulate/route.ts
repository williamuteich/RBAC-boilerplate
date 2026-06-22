import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const session = await getServerSession(auth);
  if (!session || session.user.tipo !== "ADMINISTRATOR") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "Email do cliente é obrigatório" }, { status: 400 });
  }

  const cookieStore = await cookies();
  cookieStore.set("impersonated_client_email", email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/"
  });

  return NextResponse.json({ success: true });
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
