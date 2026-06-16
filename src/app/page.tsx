import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoginSidebar } from "./components/auth/LoginSidebar";
import { LoginForm } from "./components/auth/LoginForm";
import { LoginSkeleton } from "./components/auth/LoginSkeleton";


async function LoginContent() {
  const session = await getServerSession(auth);

  if (session) {
    redirect("/admin");
  }
  return (
    <main className="flex min-h-screen w-full">
      <LoginSidebar />
      <LoginForm />
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginContent />
    </Suspense>
  );
}