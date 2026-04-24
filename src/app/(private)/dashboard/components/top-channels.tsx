import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const channels = [
    { id: 1, source: "Google", icon: "G", color: "bg-white text-slate-800 border-slate-200", visitors: "3.5K", revenues: "$4,220.00", sales: 3456, conversion: "2.59%" },
    { id: 2, source: "X.com", icon: "X", color: "bg-black text-white", visitors: "3.5K", revenues: "$4,220.00", sales: 3456, conversion: "2.59%" },
    { id: 3, source: "Github", icon: "G", color: "bg-slate-900 text-white", visitors: "3.5K", revenues: "$4,220.00", sales: 3456, conversion: "2.59%" },
    { id: 4, source: "Vimeo", icon: "V", color: "bg-sky-400 text-white", visitors: "3.5K", revenues: "$4,220.00", sales: 3456, conversion: "2.59%" },
    { id: 5, source: "Facebook", icon: "f", color: "bg-blue-600 text-white", visitors: "3.5K", revenues: "$4,220.00", sales: 3456, conversion: "2.59%" },
];

export function TopChannels() {
    return (
        <Card className="border-slate-100 shadow-sm rounded-xl overflow-hidden col-span-1 lg:col-span-8 flex flex-col hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
                <CardTitle className="text-xl font-bold text-slate-800">Top Channels</CardTitle>
                <Button variant="ghost" size="icon" className="text-slate-400">
                    <MoreHorizontal className="w-5 h-5" />
                </Button>
            </CardHeader>
            <CardContent className="px-6 pb-6">
                <Table>
                    <TableHeader>
                        <TableRow className="border-none hover:bg-transparent">
                            <TableHead className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-0">Source</TableHead>
                            <TableHead className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Visitors</TableHead>
                            <TableHead className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Revenues</TableHead>
                            <TableHead className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Sales</TableHead>
                            <TableHead className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-right pr-0">Conversion</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {channels.map((channel) => (
                            <TableRow key={channel.id} className="border-b border-slate-100/60 hover:bg-slate-50/50">
                                <TableCell className="pl-0 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${channel.color} ${channel.id === 1 ? 'border' : ''}`}>
                                            {channel.icon}
                                        </div>
                                        <span className="font-medium text-slate-700">{channel.source}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center py-4 text-slate-600">{channel.visitors}</TableCell>
                                <TableCell className="text-center py-4 font-medium text-emerald-500">{channel.revenues}</TableCell>
                                <TableCell className="text-center py-4 text-slate-600">{channel.sales}</TableCell>
                                <TableCell className="text-right py-4 font-medium text-slate-700 pr-0">{channel.conversion}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
