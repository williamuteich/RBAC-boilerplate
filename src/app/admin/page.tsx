import { getDashboardData } from "@/src/services/dashboard";
import { DashboardContent } from "./components/dashboard-content";
import { requireAdminContext } from "@/src/lib/auth-helpers/auth-helpers-server";

export const metadata = {
  title: "Dashboard – AdminCore",
  description: "Visão geral e faturamento do painel administrativo.",
};

export default async function AdminDashboardPage() {
  await requireAdminContext();
  const data = await getDashboardData();

  if (!data) {
    return (
      <p className="flex h-screen w-full items-center justify-center text-white">Nenhum dado disponível</p>
    );
  }

  return (
    <DashboardContent
      stats={data.stats}
      recentLogs={data.recentLogs}
      chartData={data.chartData}
    />
  );
}
