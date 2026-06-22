import { CreditCard, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditClientModalProps } from "@/src/types/dashboard/clientes";

export function EditClientModal({
  isOpen,
  onOpenChange,
  client,
  onSubmit,
  isPending
}: EditClientModalProps) {
  if (!client) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-slate-800">
              <CreditCard className="w-5 h-5 text-blue-600" />
              Ajustar Fatura &amp; Assinatura
            </DialogTitle>
            <DialogDescription>
              Ajuste o plano, status e data de vencimento de {client.name}.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="space-y-2">
              <Label>Plano</Label>
              <select
                name="plan"
                defaultValue={client.plan}
                className="w-full h-10 px-3 py-2 border rounded-md bg-background text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="7_DAYS">7 Dias</option>
                <option value="14_DAYS">14 Dias</option>
                <option value="30_DAYS">30 Dias</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <select
                name="status"
                defaultValue={client.status}
                className="w-full h-10 px-3 py-2 border rounded-md bg-background text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="ACTIVE">Ativo</option>
                <option value="PENDING">Pendente</option>
                <option value="EXPIRED">Expirado</option>
                <option value="CANCELLED">Cancelado</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Valor do Último Pagamento (R$)</Label>
              <Input
                name="lastPaymentValue"
                type="number"
                step="0.01"
                defaultValue={client.lastPaymentValue || 0}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Data de Vencimento</Label>
              <Input
                name="expirationDate"
                type="date"
                defaultValue={
                  client.expirationDate
                    ? new Date(client.expirationDate).toISOString().split("T")[0]
                    : ""
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 text-xs rounded-md cursor-pointer"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
