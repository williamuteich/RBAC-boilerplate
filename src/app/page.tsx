import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { redirect } from "next/navigation";
import { LoginSidebar } from "./components/auth/LoginSidebar";
import { LoginForm } from "./components/auth/LoginForm";

export default async function LoginPage() {
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