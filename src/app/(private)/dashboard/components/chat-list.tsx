import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const chats = [
    { id: 1, name: "Jacob Jones", text: "See you tomorrow...", date: "Dec 19, 2024", badge: 3, active: true },
    { id: 2, name: "Wilium Smith", text: "Thanks for the up...", date: "Dec 19, 2024", badge: 0, active: true },
    { id: 3, name: "Johurul Haque", text: "What's up?", date: "Dec 19, 2024", badge: 0, active: false, status: "away" },
    { id: 4, name: "M. Chowdhury", text: "Where are you no...", date: "Dec 19, 2024", badge: 2, active: false, status: "offline" },
    { id: 5, name: "Akagami", text: "Hey, how are you?", date: "Dec 19, 2024", badge: 0, active: false, status: "away" },
];

export function ChatList() {
    return (
        <Card className="border-slate-100 shadow-sm rounded-xl overflow-hidden col-span-1 lg:col-span-4 flex flex-col hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-4 pt-6 px-6">
                <CardTitle className="text-xl font-bold text-slate-800">Chats</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0">
                <div className="flex flex-col gap-6">
                    {chats.map((chat) => (
                        <div key={chat.id} className="flex items-center justify-between cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Avatar className="w-12 h-12 border border-slate-200 group-hover:border-indigo-100 transition-colors">
                                        <AvatarImage src={`https://i.pravatar.cc/150?u=${chat.id * 123}`} alt={chat.name} />
                                        <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${chat.active ? 'bg-emerald-500' :
                                            chat.status === 'away' ? 'bg-amber-400' : 'bg-slate-300'
                                        }`}></span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">{chat.name}</h4>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-sm border-slate-200 text-slate-500 truncate max-w-[120px] sm:max-w-[160px]">{chat.text}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <span className="text-[11px] text-slate-400">{chat.date}</span>
                                    </div>
                                </div>
                            </div>
                            {chat.badge > 0 && (
                                <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shadow-sm shadow-indigo-200">
                                    {chat.badge}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
