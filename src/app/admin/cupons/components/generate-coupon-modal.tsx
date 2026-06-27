import { Ticket, Loader2 } from "lucide-react";
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
import { FormEvent } from "react";

interface GenerateCouponModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
}

export function GenerateCouponModal({
  isOpen,
  onOpenChange,
  onSubmit,
  isPending
}: GenerateCouponModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-slate-800">
              <Ticket className="w-5 h-5 text-[#9A75F0]" />
              Gerar Novos Cupons
            </DialogTitle>
            <DialogDescription>
              Crie cupons de ativação exclusivos que os vendedores poderão fornecer aos compradores dos anéis.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="space-y-2">
              <Label>Quantidade a Gerar</Label>
              <Input
                name="quantity"
                type="number"
                min="1"
                max="50"
                defaultValue="1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Prefixo do Código (Opcional)</Label>
              <Input
                name="prefix"
                type="text"
                placeholder="Ex: LOVE, ANEL, PRESENTE"
                defaultValue="LOVE"
              />
            </div>

            <div className="space-y-2">
              <Label>Origem / Canal de Aquisição</Label>
              <select
                name="origem"
                defaultValue="google"
                className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-slate-900 cursor-pointer"
              >
                <option value="google">Google Ads</option>
                <option value="instagram">Instagram Ads</option>
                <option value="indicacao">Indicação</option>
                <option value="suporte">Suporte (Cliente Insatisfeito)</option>
                <option value="outros">Outros</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Valor da Conversão (Opcional)</Label>
              <Input
                name="value"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="Ex: 150.00"
              />
              <span className="text-[10px] text-[#696684] block leading-normal mt-1">
                Se deixado em branco, o sistema usará o valor real do plano assinado pelo cliente ou R$ 150,00 como padrão.
              </span>
            </div>

            <div className="space-y-2">
              <Label>Dias de Acesso Concedidos</Label>
              <Input
                name="expiresInDays"
                type="number"
                placeholder="Ex: 7"
                defaultValue="7"
                required
              />
              <span className="text-[10px] text-[#696684] block leading-normal mt-1">
                Atenção: Esta é a quantidade de dias que o cliente terá de acesso à homenagem após resgatar este cupom.
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#9A75F0] hover:bg-[#855fe6] text-white font-bold h-10 text-xs rounded-md cursor-pointer"
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Gerando...</span>
                </div>
              ) : (
                "Gerar Cupons"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
