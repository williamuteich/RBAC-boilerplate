import { Button } from "@/components/ui/button";
import { SearchInput } from "@/src/app/admin/components/search-input";
import { Plus } from "lucide-react";

import { CuponsFiltersBarProps } from "@/src/types/dashboard/cupons";

export function CuponsFiltersBar({
  status,
  setStatus,
  search,
  setSearch,
  setPage,
  isPending,
  onGenerateClick
}: CuponsFiltersBarProps) {
  const handleClearFilters = () => {
    setSearch("");
    setStatus("");
    setPage("1");
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex-1 max-w-md w-full flex items-center gap-2">
        <SearchInput
          placeholder="Buscar código ou e-mail..."
          searchParamKey="search"
          disabled={isPending}
        />
        {(search || status) && (
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
          className="h-10 px-3 py-2 border rounded-md bg-background text-sm outline-none focus:ring-2 focus:ring-[#9A75F0]/20 focus:border-[#9A75F0] cursor-pointer"
        >
          <option value="">Todos os Status</option>
          <option value="active">Disponível</option>
          <option value="used">Resgatado</option>
          <option value="expired">Expirado</option>
        </select>

        <Button
          onClick={onGenerateClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm h-10 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Gerar Cupons
        </Button>
      </div>
    </div>
  );
}
