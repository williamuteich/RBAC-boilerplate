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

export interface SimulationOverlayProps {
  clientName: string | null;
}

export interface StatsCardsProps {
  stats: ClientesStats;
  formatCurrency: (val: number | null) => string;
}

export interface FiltersBarProps {
  status: string;
  setStatus: (val: string) => void;
  plan: string;
  setPlan: (val: string) => void;
  search: string;
  setSearch: (val: string) => void;
  setPage: (val: string) => void;
  isPending: boolean;
}

export interface ClientsTableProps {
  clients: SaaSClient[];
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  setPage: (val: string) => void;
  onEdit: (client: SaaSClient) => void;
  onSimulate: (name: string) => void;
  formatCurrency: (val: number | null) => string;
  formatDate: (date: Date | string | null) => string;
}

export interface EditClientModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  client: SaaSClient | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
}
