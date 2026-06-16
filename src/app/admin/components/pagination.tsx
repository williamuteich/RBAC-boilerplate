import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    page: number;
    totalPages: number;
    total: number;
    limit?: number;
    getPageUrl?: (pageNumber: number) => string;
    onPageChange?: (pageNumber: number) => void;
    disabled?: boolean;
}

export function Pagination({
    page,
    totalPages,
    total,
    limit = 20,
    getPageUrl,
    onPageChange,
    disabled = false,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const startItem = (page - 1) * limit + 1;
    const endItem = Math.min(page * limit, total);

    const renderButton = (
        direction: "prev" | "next",
        targetPage: number,
        isDisabled: boolean,
        label: string
    ) => {
        const icon = direction === "prev" ? (
            <ChevronLeft className="h-4 w-4" />
        ) : (
            <ChevronRight className="h-4 w-4" />
        );

        const className = `inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground h-9 px-3 gap-1 ${
            isDisabled || disabled ? "pointer-events-none opacity-50" : "cursor-pointer"
        }`;

        if (onPageChange) {
            return (
                <button
                    type="button"
                    onClick={() => !isDisabled && !disabled && onPageChange(targetPage)}
                    disabled={isDisabled || disabled}
                    className={className}
                >
                    {direction === "prev" && icon}
                    {label}
                    {direction === "next" && icon}
                </button>
            );
        }

        const href = getPageUrl ? getPageUrl(targetPage) : "#";
        return (
            <Link
                href={isDisabled || disabled ? "#" : href}
                className={className}
            >
                {direction === "prev" && icon}
                {label}
                {direction === "next" && icon}
            </Link>
        );
    };

    return (
        <div className="p-4 border-t bg-muted/20 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
                Mostrando <span className="font-medium">{startItem}</span>-
                <span className="font-medium">{endItem}</span> de
                <span className="font-medium"> {total}</span> registros
            </div>
            <div className="flex items-center gap-2">
                {renderButton("prev", page - 1, page === 1, "Anterior")}
                <div className="flex items-center gap-1 px-2">
                    <span className="text-sm font-medium">{page}</span>
                    <span className="text-sm text-muted-foreground">/</span>
                    <span className="text-sm text-muted-foreground">{totalPages}</span>
                </div>
                {renderButton("next", page + 1, page === totalPages, "Próximo")}
            </div>
        </div>
    );
}
