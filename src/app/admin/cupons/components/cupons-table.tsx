import { useState } from "react";
import { 
  Trash2, Copy, Check
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coupon, CuponsTableProps } from "@/src/types/dashboard/cupons";
import { Pagination } from "@/src/app/admin/components/pagination";
import { useToast } from "@/src/app/components/toast-provider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function CuponsTable({
  coupons,
  page,
  totalPages,
  total,
  limit,
  setPage,
  onDelete,
  formatDate
}: CuponsTableProps) {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const { success } = useToast();

  const handleCopyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    success(`Código ${code} copiado com sucesso!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (coupon: Coupon) => {
    if (coupon.used) {
      return <Badge className="bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 border-rose-200/50">Resgatado</Badge>;
    }
    if (coupon.expiresAt && new Date(coupon.expiresAt) <= new Date()) {
      return <Badge className="bg-slate-500/10 text-slate-600 hover:bg-slate-500/20 border-slate-200/50">Expirado</Badge>;
    }
    return <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-200/50">Disponível</Badge>;
  };

  return (
    <div className="rounded-xl border bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Código do Cupom</TableHead>
            <TableHead>Origem</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Resgatado Por</TableHead>
            <TableHead>Data do Resgate</TableHead>
            <TableHead>Expiração do Cupom</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupons.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                Nenhum cupom encontrado.
              </TableCell>
            </TableRow>
          ) : (
            coupons.map((coupon) => (
              <TableRow key={coupon.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium text-slate-800">
                  <div className="flex items-center gap-2">
                    <code className="px-2 py-1 bg-slate-100/80 text-slate-800 font-mono text-xs rounded border border-slate-200">
                      {coupon.code}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleCopyCode(coupon.id, coupon.code)}
                      className="cursor-pointer text-slate-400 hover:text-slate-600"
                      title="Copiar Código"
                    >
                      {copiedId === coupon.id ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600 animate-in zoom-in" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="capitalize text-xs font-semibold">
                  {coupon.origem === "google" && <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">Google Ads</span>}
                  {coupon.origem === "instagram" && <span className="text-pink-600 bg-pink-50 px-2 py-0.5 rounded border border-pink-100">Instagram Ads</span>}
                  {coupon.origem === "indicacao" && <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">Indicação</span>}
                  {coupon.origem === "suporte" && <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">Suporte</span>}
                  {coupon.origem !== "google" && coupon.origem !== "instagram" && coupon.origem !== "indicacao" && coupon.origem !== "suporte" && (
                    <span className="text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{coupon.origem}</span>
                  )}
                </TableCell>
                <TableCell>{getStatusBadge(coupon)}</TableCell>
                <TableCell className="text-xs">
                  {coupon.usedBy ? (
                    <span className="font-medium text-slate-700">{coupon.usedBy}</span>
                  ) : (
                    <span className="text-slate-400 font-normal">-</span>
                  )}
                </TableCell>
                <TableCell className="text-xs text-slate-600">
                  {formatDate(coupon.usedAt)}
                </TableCell>
                <TableCell className="text-xs">
                  {coupon.expiresAt ? (
                    <span className={new Date(coupon.expiresAt) <= new Date() ? "text-rose-600 font-medium" : "text-slate-600"}>
                      {formatDate(coupon.expiresAt)}
                    </span>
                  ) : (
                    <span className="text-slate-400">Nunca expira</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setDeleteConfirmId(coupon.id)}
                      className="cursor-pointer hover:bg-rose-50 group"
                      title="Excluir Cupom"
                    >
                      <Trash2 className="h-4 w-4 text-slate-500 group-hover:text-rose-600 transition-colors" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Pagination
        page={page}
        totalPages={totalPages}
        total={total}
        limit={limit}
        getPageUrl={(p) => {
          setPage(String(p));
          return "";
        }}
      />

      <AlertDialog open={deleteConfirmId !== null} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-800 font-bold">Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este cupom? Esta ação não pode ser desfeita e invalidará o código correspondente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteConfirmId !== null) {
                  onDelete(deleteConfirmId);
                  setDeleteConfirmId(null);
                }
              }}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold cursor-pointer border-0"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
