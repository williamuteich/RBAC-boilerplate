import { LoginSidebar } from "./components/auth/LoginSidebar";
import { LoginForm } from "./components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full">
      <LoginSidebar />
      <LoginForm />
    </main>
  );
}