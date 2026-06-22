export interface SaaSClient {
  id: number;
  email: string;
  name: string;
  image: string | null;
  slug: string;
  status: string;
  plan: string;
  lastPaymentValue: number | null;
  lastPaymentDate: Date | string | null;
  expirationDate: Date | string | null;
  pageViews: number;
  photosCount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ClientesStats {
  totalClientes: number;
  mrr: number;
  activePercentage: number;
  totalPageViews: number;
}

export interface ClientesResponse {
  clients: SaaSClient[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  stats: ClientesStats;
}

export interface ClienteFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  plan?: string;
}
