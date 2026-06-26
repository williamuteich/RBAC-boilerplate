export interface DashboardStats {
  clientsCount: number;
  activeClientsCount: number;
  adminsCount: number;
  couponsCount: number;
  usedCouponsCount: number;
  totalRevenue: number;
}

export interface DashboardLog {
  id: number;
  action: "CREATE" | "UPDATE" | "DELETE";
  resource: string | null;
  resourceName: string | null;
  createdAt: Date;
  administrator: {
    name: string | null;
    email: string;
  };
}

export interface ChartDataItem {
  name: string;
  clientes: number;
}

export interface DashboardResponse {
  success: boolean;
  stats: DashboardStats;
  recentLogs: DashboardLog[];
  chartData: ChartDataItem[];
}
