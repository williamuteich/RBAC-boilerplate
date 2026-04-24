"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

const data = [
    { name: "Jan", Received: 15, Due: 10 },
    { name: "Feb", Received: 10, Due: 20 },
    { name: "Mar", Received: 20, Due: 35 },
    { name: "Apr", Received: 30, Due: 45 },
    { name: "May", Received: 25, Due: 35 },
    { name: "Jun", Received: 55, Due: 60 },
    { name: "Jul", Received: 65, Due: 50 },
    { name: "Aug", Received: 50, Due: 70 },
    { name: "Sep", Received: 65, Due: 85 },
    { name: "Oct", Received: 75, Due: 95 },
    { name: "Nov", Received: 60, Due: 75 },
    { name: "Dec", Received: 70, Due: 60 }
];

export function OverviewChart() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <Card className="border-slate-100 shadow-sm rounded-xl overflow-hidden col-span-1 lg:col-span-8 flex flex-col hover:shadow-md transition-shadow h-full pb-4">
            <CardHeader className="flex flex-row items-center justify-between pb-8 pt-6 px-6">
                <CardTitle className="text-xl font-bold text-slate-800">Payments Overview</CardTitle>
                <select className="text-sm border border-slate-200 rounded-md px-3 py-1.5 focus:outline-none text-slate-600 bg-white shadow-sm font-medium">
                    <option>Monthly</option>
                    <option>Yearly</option>
                </select>
            </CardHeader>
            <CardContent className="px-2 sm:px-6 w-full flex-1">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        {mounted ? (
                            <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorDue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
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
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="Due" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorDue)" />
                                <Area type="monotone" dataKey="Received" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorReceived)" />
                            </AreaChart>
                        ) : <div />}
                    </ResponsiveContainer>
                </div>

                <div className="flex justify-center mt-6 gap-12 sm:gap-24 border-t border-slate-100 pt-6">
                    <div className="text-center">
                        <p className="text-sm font-semibold text-slate-500 mb-1">Received Amount</p>
                        <p className="text-2xl font-bold text-slate-800">$580.00</p>
                    </div>
                    <div className="w-px h-12 bg-slate-200"></div>
                    <div className="text-center">
                        <p className="text-sm font-semibold text-slate-500 mb-1">Due Amount</p>
                        <p className="text-2xl font-bold text-slate-800">$628.00</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
