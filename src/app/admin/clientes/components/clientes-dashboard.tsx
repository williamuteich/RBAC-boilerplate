"use client";

import { useState, useTransition, FormEvent } from "react";
import { useQueryState } from "nuqs";
import { ClientesResponse, SaaSClient } from "@/src/types/dashboard/clientes";
import { updateCliente } from "@/src/services/clientes";
import { useRouter } from "next/navigation";
import { StatsCards } from "./stats-cards";
import { FiltersBar } from "./filters-bar";
import { ClientsTable } from "./clients-table";
import { EditClientModal } from "./edit-client-modal";

export function ClientesDashboard({
  initialData
}: {
  initialData: ClientesResponse;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useQueryState("search", { defaultValue: "", shallow: false });
  const [status, setStatus] = useQueryState("status", { defaultValue: "", shallow: false });
  const [plan, setPlan] = useQueryState("plan", { defaultValue: "", shallow: false });
  const [page, setPage] = useQueryState("page", { defaultValue: "1", shallow: false });

  const [editingClient, setEditingClient] = useState<SaaSClient | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const handleSaveEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingClient) return;

    const formData = new FormData(e.currentTarget);
    const updatedPlan = formData.get("plan") as string;
    const updatedStatus = formData.get("status") as string;
    const updatedValue = parseFloat(formData.get("lastPaymentValue") as string || "0");
    const updatedExp = formData.get("expirationDate") as string;

    startTransition(async () => {
      const res = await updateCliente(editingClient.id, {
        plan: updatedPlan,
        status: updatedStatus,
        lastPaymentValue: updatedValue,
        expirationDate: updatedExp ? new Date(updatedExp).toISOString() : null
      });

      if (res.success) {
        setEditOpen(false);
        setEditingClient(null);
        router.refresh();
      }
    });
  };

  const formatCurrency = (val: number | null) => {
    if (val === null) return "R$ 0,00";
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  const handleOpenEdit = (client: SaaSClient) => {
    setEditingClient(client);
    setEditOpen(true);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <StatsCards 
        stats={initialData.stats} 
        formatCurrency={formatCurrency} 
      />

      <FiltersBar
        status={status}
        setStatus={setStatus}
        plan={plan}
        setPlan={setPlan}
        search={search}
        setSearch={setSearch}
        setPage={setPage}
        isPending={isPending}
      />

      <ClientsTable
        clients={initialData.clients}
        page={initialData.page}
        totalPages={initialData.totalPages}
        total={initialData.total}
        limit={initialData.limit}
        setPage={setPage}
        onEdit={handleOpenEdit}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
      />

      <EditClientModal
        isOpen={editOpen}
        onOpenChange={setEditOpen}
        client={editingClient}
        onSubmit={handleSaveEdit}
        isPending={isPending}
      />
    </div>
  );
}
