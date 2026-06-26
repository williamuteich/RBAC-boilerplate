"use client";

import { useState, useTransition, FormEvent } from "react";
import { useQueryState, parseAsBoolean } from "nuqs";
import { CuponsResponse } from "@/src/types/dashboard/cupons";
import { generateCoupons, deleteCoupon } from "@/src/services/cupons";
import { useRouter } from "next/navigation";
import { StatsCards } from "./stats-cards";
import { CuponsFiltersBar } from "./cupons-filters-bar";
import { CuponsTable } from "./cupons-table";
import { GenerateCouponModal } from "./generate-coupon-modal";
import { useToast } from "@/src/app/components/toast-provider";
import { Copy, Check, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function CuponsDashboard({
  initialData
}: {
  initialData: CuponsResponse;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { success, error } = useToast();

  const [search, setSearch] = useQueryState("search", { defaultValue: "", shallow: false });
  const [status, setStatus] = useQueryState("status", { defaultValue: "", shallow: false });
  const [page, setPage] = useQueryState("page", { defaultValue: "1", shallow: false });

  const [isGenerateOpen, setIsGenerateOpen] = useQueryState(
    "generate",
    parseAsBoolean.withDefault(false).withOptions({ shallow: true })
  );

  const [generatedCodes, setGeneratedCodes] = useState<string[] | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

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

      if (res.success && res.codes) {
        setIsGenerateOpen(false);
        setGeneratedCodes(res.codes);
        success(`${quantity} ${quantity === 1 ? "cupom gerado" : "cupons gerados"} com sucesso!`);
        router.refresh();
      } else {
        error(res.error || "Erro ao gerar cupons.");
      }
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      const res = await deleteCoupon(id);
      if (res.success) {
        success("Cupom excluído com sucesso!");
        router.refresh();
      } else {
        error(res.error || "Erro ao excluir cupom.");
      }
    });
  };

  const handleCopyAll = () => {
    if (!generatedCodes) return;
    navigator.clipboard.writeText(generatedCodes.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
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

      {/* Modal para exibir os cupons gerados */}
      <Dialog open={generatedCodes !== null} onOpenChange={(open) => !open && setGeneratedCodes(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-slate-800">
              <Ticket className="w-5 h-5 text-[#9A75F0]" />
              Cupons Gerados
            </DialogTitle>
            <DialogDescription>
              Copie os códigos gerados abaixo e envie para os compradores.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 max-h-48 overflow-y-auto font-mono text-xs text-slate-800 flex flex-col gap-1.5 select-all">
              {generatedCodes?.map((code) => (
                <div key={code} className="flex justify-between items-center py-1 border-b border-slate-100 last:border-0">
                  <span>{code}</span>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setGeneratedCodes(null)}
              className="flex-1 cursor-pointer"
            >
              Fechar
            </Button>
            <Button
              type="button"
              onClick={handleCopyAll}
              className="flex-1 bg-[#9A75F0] hover:bg-[#855fe6] text-white font-bold cursor-pointer flex items-center justify-center gap-2"
            >
              {copiedAll ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Todos</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
