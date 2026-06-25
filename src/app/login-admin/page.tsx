import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoginSidebar } from "../components/auth/LoginSidebar";
import { LoginForm } from "../components/auth/LoginForm";
import { LoginSkeleton } from "../components/auth/LoginSkeleton";

async function LoginContent() {
  const session = await getServerSession(auth);

  if (session) {
    if (session.user.tipo === "ADMINISTRATOR") {
      redirect("/admin");
    } else {
      redirect("/painel");
    }
  }
  return (
    <main className="flex min-h-screen w-full">
      <LoginSidebar />
      <LoginForm />
    </main>
  );
}

export default function LoginAdminPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginContent />
    </Suspense>
  );
}
