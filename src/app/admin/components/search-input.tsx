"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";

import { useDebounce } from "use-debounce";

interface SearchInputProps {
    placeholder?: string;
    initialValue?: string;
    onSearchChange?: (value: string) => void;
    searchParamKey?: string;
    disabled?: boolean;
}

export function SearchInput({
    placeholder = "Pesquisar...",
    initialValue = "",
    onSearchChange,
    searchParamKey,
    disabled = false,
}: SearchInputProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const queryValue = searchParamKey ? (searchParams.get(searchParamKey) || "") : initialValue;
    const [value, setValue] = useState(queryValue);
    const [debouncedValue] = useDebounce(value, 750);

    useEffect(() => {
        setValue(queryValue);
    }, [queryValue]);

    useEffect(() => {
        if (debouncedValue === queryValue) return;

        if (onSearchChange) {
            onSearchChange(debouncedValue);
        } else if (searchParamKey) {
            startTransition(() => {
                const params = new URLSearchParams(searchParams.toString());
                if (debouncedValue) {
                    params.set(searchParamKey, debouncedValue);
                } else {
                    params.delete(searchParamKey);
                }
                params.set("page", "1");
                router.push(`?${params.toString()}`);
            });
        }
    }, [debouncedValue, queryValue, onSearchChange, searchParamKey, searchParams, router]);

    return (
        <div className="relative flex items-center w-full max-w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={disabled || isPending}
                className="pl-9 pr-9 h-10 bg-white shadow-xs focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
            />
            {isPending && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
                </div>
            )}
        </div>
    );
}
