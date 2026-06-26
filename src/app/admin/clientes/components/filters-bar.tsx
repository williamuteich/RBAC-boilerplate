import { Button } from "@/components/ui/button";
import { SearchInput } from "@/src/app/admin/components/search-input";
import { FiltersBarProps } from "@/src/types/dashboard/clientes";

export function FiltersBar({
  status,
  setStatus,
  plan,
  setPlan,
  search,
  setSearch,
  setPage,
  isPending
}: FiltersBarProps) {
  const handleClearFilters = () => {
    setSearch("");
    setStatus("");
    setPlan("");
    setPage("1");
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex-1 max-w-md w-full flex items-center gap-2">
        <SearchInput
          placeholder="Buscar cliente..."
          searchParamKey="search"
          disabled={isPending}
        />
        {(search || status || plan) && (
          <Button
            variant="ghost"
            onClick={handleClearFilters}
            className="h-10 text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-md cursor-pointer shrink-0 animate-in fade-in"
          >
            Limpar filtros
          </Button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={status}
          onChange={(e) => { setPage("1"); setStatus(e.target.value || ""); }}
          className="h-10 px-3 py-2 border rounded-md bg-background text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
        >
          <option value="">Todos os Status</option>
          <option value="ACTIVE">Ativo</option>
          <option value="PENDING">Pendente</option>
          <option value="EXPIRED">Expirado</option>
          <option value="CANCELLED">Cancelado</option>
        </select>

        <select
          value={plan}
          onChange={(e) => { setPage("1"); setPlan(e.target.value || ""); }}
          className="h-10 px-3 py-2 border rounded-md bg-background text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
        >
          <option value="">Todos os Planos</option>
          <option value="1_DAY">1 Dia</option>
          <option value="7_DAYS">7 Dias</option>
          <option value="30_DAYS">30 Dias</option>
        </select>
      </div>
    </div>
  );
}
