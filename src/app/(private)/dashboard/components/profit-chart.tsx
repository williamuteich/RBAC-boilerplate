"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

const data = [
    { name: "Sat", Sales: 40, Revenue: 20 },
    { name: "Sun", Sales: 50, Revenue: 25 },
    { name: "Mon", Sales: 45, Revenue: 20 },
    { name: "Tue", Sales: 65, Revenue: 15 },
    { name: "Wed", Sales: 25, Revenue: 15 },
    { name: "Thu", Sales: 42, Revenue: 30 },
    { name: "Fri", Sales: 60, Revenue: 20 }
];

export function ProfitChart() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <Card className="border-slate-100 shadow-sm rounded-xl overflow-hidden col-span-1 lg:col-span-4 flex flex-col hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-4 pt-6 px-6">
                <CardTitle className="text-xl font-bold text-slate-800">Profit this week</CardTitle>
                <select className="text-sm border border-slate-200 rounded-md px-2 py-1.5 focus:outline-none text-slate-600 bg-white shadow-sm font-medium">
                    <option>This Week</option>
                </select>
            </CardHeader>
            <CardContent className="px-2 sm:px-6 w-full flex-1 flex flex-col justify-end">
                <div className="flex gap-4 px-4 mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                        <span className="text-sm font-semibold text-slate-500">Sales</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-sky-400"></div>
                        <span className="text-sm font-semibold text-slate-500">Revenue</span>
                    </div>
                </div>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        {mounted ? (
                            <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={12}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="Sales" stackId="a" fill="#6366f1" radius={[0, 0, 4, 4]} />
                                <Bar dataKey="Revenue" stackId="a" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        ) : <div />}
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
