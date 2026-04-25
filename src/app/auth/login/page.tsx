import { LoginSidebar } from "./components/LoginSidebar";
import { LoginForm } from "./components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full">
      <LoginSidebar />
      <LoginForm />
    </main>
  );
}