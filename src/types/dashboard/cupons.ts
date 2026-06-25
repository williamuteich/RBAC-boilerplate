import { FormEvent } from "react";

export interface Coupon {
  id: number;
  code: string;
  used: boolean;
  usedBy: string | null;
  usedAt: Date | string | null;
  expiresAt: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CuponsStats {
  totalCupons: number;
  usedCupons: number;
  activeCupons: number;
}

export interface CuponsResponse {
  coupons: Coupon[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  stats: CuponsStats;
}

export interface CouponFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string; // "all" | "active" | "used" | "expired"
}

export interface StatsCardsProps {
  stats: CuponsStats;
}

export interface CuponsFiltersBarProps {
  status: string;
  setStatus: (val: string) => void;
  search: string;
  setSearch: (val: string) => void;
  setPage: (val: string) => void;
  isPending: boolean;
  onGenerateClick: () => void;
}

export interface CuponsTableProps {
  coupons: Coupon[];
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  setPage: (val: string) => void;
  onDelete: (id: number) => void;
  formatDate: (date: Date | string | null) => string;
}

export interface GenerateCouponModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
}
