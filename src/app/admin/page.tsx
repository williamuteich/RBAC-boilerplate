import { redirect } from "next/navigation";
import { getDashboardData } from "@/src/services/dashboard";
import { DashboardContent } from "./components/dashboard-content";

export const metadata = {
  title: "Dashboard – AdminCore",
  description: "Visão geral e faturamento do painel administrativo.",
};

export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  if (!data) {
    redirect("/");
  }

  return (
    <DashboardContent
      stats={data.stats}
      recentLogs={data.recentLogs}
      chartData={data.chartData}
    />
  );
}
