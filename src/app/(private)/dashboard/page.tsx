import { Eye, DollarSign, Package, Users } from "lucide-react";
import { StatCard } from "./components/stat-card";
import { OverviewChart } from "./components/overview-chart";
import { ProfitChart } from "./components/profit-chart";
import { TopChannels } from "./components/top-channels";
import { ChatList } from "./components/chat-list";

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-12 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                <StatCard
                    icon={<Eye className="w-6 h-6 text-emerald-500 absolute" />}
                    iconBgColor="bg-emerald-100"
                    value="3.5K"
                    title="Total Views"
                    percentage="0.43%"
                    isPositive={true}
                />
                <StatCard
                    icon={<DollarSign className="w-6 h-6 text-orange-500 absolute" />}
                    iconBgColor="bg-orange-100"
                    value="$4.2K"
                    title="Total Profit"
                    percentage="4.35%"
                    isPositive={true}
                />
                <StatCard
                    icon={<Package className="w-6 h-6 text-indigo-500 absolute" />}
                    iconBgColor="bg-indigo-100"
                    value="3.5K"
                    title="Total Products"
                    percentage="2.59%"
                    isPositive={true}
                />
                <StatCard
                    icon={<Users className="w-6 h-6 text-sky-500 absolute" />}
                    iconBgColor="bg-sky-100"
                    value="3.5K"
                    title="Total Users"
                    percentage="-0.95%"
                    isPositive={false}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full min-h-[420px]">
                <OverviewChart />
                <ProfitChart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
                <TopChannels />
                <ChatList />
            </div>
        </div>
    );
}
