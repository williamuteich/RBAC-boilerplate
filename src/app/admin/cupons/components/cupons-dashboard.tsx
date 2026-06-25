"use client";

import { useState, useTransition, FormEvent } from "react";
import { useQueryState } from "nuqs";
import { CuponsResponse } from "@/src/types/dashboard/cupons";
import { generateCoupons, deleteCoupon } from "@/src/services/cupons";
import { useRouter } from "next/navigation";
import { StatsCards } from "./stats-cards";
import { CuponsFiltersBar } from "./cupons-filters-bar";
import { CuponsTable } from "./cupons-table";
import { GenerateCouponModal } from "./generate-coupon-modal";

export function CuponsDashboard({
  initialData
}: {
  initialData: CuponsResponse;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useQueryState("search", { defaultValue: "", shallow: false });
  const [status, setStatus] = useQueryState("status", { defaultValue: "", shallow: false });
  const [page, setPage] = useQueryState("page", { defaultValue: "1", shallow: false });

  const [isGenerateOpen, setIsGenerateOpen] = useState(false);

  const handleGenerate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const quantity = parseInt(formData.get("quantity") as string || "1");
    const prefix = formData.get("prefix") as string || "LOVE";
    const expiresInDaysStr = formData.get("expiresInDays") as string;
    const expiresInDays = expiresInDaysStr ? parseInt(expiresInDaysStr) : null;

    startTransition(async () => {
      const res = await generateCoupons({
        quantity,
        prefix,
        expiresInDays
      });

      if (res.success) {
        setIsGenerateOpen(false);
        router.refresh();
      }
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      const res = await deleteCoupon(id);
      if (res.success) {
        router.refresh();
      }
    });
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <StatsCards stats={initialData.stats} />

      <CuponsFiltersBar
        status={status}
        setStatus={setStatus}
        search={search}
        setSearch={setSearch}
        setPage={setPage}
        isPending={isPending}
        onGenerateClick={() => setIsGenerateOpen(true)}
      />

      <CuponsTable
        coupons={initialData.coupons}
        page={initialData.page}
        totalPages={initialData.totalPages}
        total={initialData.total}
        limit={initialData.limit}
        setPage={setPage}
        onDelete={handleDelete}
        formatDate={formatDate}
      />

      <GenerateCouponModal
        isOpen={isGenerateOpen}
        onOpenChange={setIsGenerateOpen}
        onSubmit={handleGenerate}
        isPending={isPending}
      />
    </div>
  );
}
