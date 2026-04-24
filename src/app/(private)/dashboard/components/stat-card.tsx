import { Card, CardContent } from "@/components/ui/card";
import { MoveUp, MoveDown } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    icon: ReactNode;
    iconBgColor: string;
    value: string;
    title: string;
    percentage: string;
    isPositive: boolean;
}

export function StatCard({ icon, iconBgColor, value, title, percentage, isPositive }: StatCardProps) {
    return (
        <Card className="border-slate-100 shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-6", iconBgColor)}>
                    {icon}
                </div>
                <div className="flex items-end justify-between">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
                        <p className="text-sm text-slate-500 font-medium mt-1">{title}</p>
                    </div>
                    <div className={cn(
                        "flex items-center gap-1 text-sm font-semibold mb-1",
                        isPositive ? "text-emerald-500" : "text-rose-500"
                    )}>
                        {percentage}
                        {isPositive ? <MoveUp className="w-3.5 h-3.5" /> : <MoveDown className="w-3.5 h-3.5" />}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
