import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { UserLoginForm } from "../components/auth/UserLoginForm";

async function LoginContent() {
  const session = await getServerSession(auth);

  if (session) {
    if (session.user.tipo === "ADMINISTRATOR") {
      redirect("/admin");
    } else {
      redirect("/painel");
    }
  }

  return <UserLoginForm />;
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full flex items-center justify-center bg-[#FAF9FF]">
        <div className="w-8 h-8 rounded-full border-2 border-rose-500 border-t-transparent animate-spin"></div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
