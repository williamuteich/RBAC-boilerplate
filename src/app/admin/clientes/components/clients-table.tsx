import {
  Eye, Heart, ExternalLink, Edit2, Play
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
import { ClientsTableProps } from "@/src/types/dashboard/clientes";
import { Pagination } from "@/src/app/admin/components/pagination";

export function ClientsTable({
  clients,
  page,
  totalPages,
  total,
  limit,
  setPage,
  onEdit,
  onSimulate,
  formatCurrency,
  formatDate
}: ClientsTableProps) {
  const getStatusBadge = (s: string) => {
    switch (s) {
      case "ACTIVE":
        return <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-200/50">Ativo</Badge>;
      case "PENDING":
        return <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-200/50">Pendente</Badge>;
      case "EXPIRED":
        return <Badge className="bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 border-rose-200/50">Expirado</Badge>;
      case "CANCELLED":
        return <Badge variant="secondary">Cancelado</Badge>;
      default:
        return <Badge variant="secondary">{s}</Badge>;
    }
  };

  const getPlanLabel = (p: string) => {
    switch (p) {
      case "7_DAYS":
        return "7 Dias";
      case "14_DAYS":
        return "14 Dias";
      case "30_DAYS":
        return "30 Dias";
      default:
        return p;
    }
  };

  const getPageUrl = (pageNumber: number) => {
    return `#`;
  };

  return (
    <div className="rounded-xl border bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Homenagem</TableHead>
            <TableHead>Plano</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Último Pagamento</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Métricas</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
                Nenhum cliente encontrado.
              </TableCell>
            </TableRow>
          ) : (
            clients.map((client) => (
              <TableRow key={client.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium text-slate-800">
                  <div className="flex flex-col">
                    <span>{client.name}</span>
                    <span className="text-[11px] text-muted-foreground font-normal">{client.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <a
                    href={`/p/${client.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                  >
                    eterno.love/{client.slug}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </TableCell>
                <TableCell>
                  <span className="text-xs font-medium">{getPlanLabel(client.plan)}</span>
                </TableCell>
                <TableCell>{getStatusBadge(client.status)}</TableCell>
                <TableCell>
                  <div className="flex flex-col text-xs">
                    <span className="font-semibold text-slate-700">{formatCurrency(client.lastPaymentValue)}</span>
                    <span className="text-[10px] text-muted-foreground">{formatDate(client.lastPaymentDate)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs">
                  <span className={
                    client.expirationDate && new Date(client.expirationDate) < new Date() && client.status !== "CANCELLED"
                      ? "text-rose-600 font-medium"
                      : "text-slate-600"
                  }>
                    {formatDate(client.expirationDate)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2.5 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1" title="Visualizações">
                      <Eye className="w-3.5 h-3.5" /> {client.pageViews}
                    </span>
                    <span className="flex items-center gap-1" title="Fotos">
                      <Heart className="w-3.5 h-3.5" /> {client.photosCount}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onEdit(client)}
                      className="cursor-pointer"
                    >
                      <Edit2 className="h-4 w-4 text-slate-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSimulate(client.name)}
                      className="text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded px-2 cursor-pointer"
                    >
                      Simular
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
    </div>
  );
}
