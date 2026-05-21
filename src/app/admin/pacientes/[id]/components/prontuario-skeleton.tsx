export function ProntuarioSkeleton() {
    return (
        <div className="w-full flex flex-col gap-6 animate-pulse">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="w-20 h-20 rounded-2xl bg-slate-200" />

                        <div className="space-y-3">
                            <div className="h-8 w-64 rounded-xl bg-slate-200" />
                            <div className="h-4 w-40 rounded bg-slate-200" />
                            <div className="h-4 w-56 rounded bg-slate-200" />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <div className="h-11 w-32 rounded-xl bg-slate-200" />
                        <div className="h-11 w-40 rounded-xl bg-slate-200" />
                    </div>
                </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-11 min-w-[140px] rounded-xl bg-slate-200"
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="h-7 w-56 rounded-xl bg-slate-200" />
                        <div className="h-10 w-32 rounded-xl bg-slate-200" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className="aspect-square rounded-2xl bg-slate-100 border border-slate-200"
                            />
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className="h-5 w-48 rounded bg-slate-200" />

                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-20 rounded-2xl bg-slate-100 border border-slate-200"
                            />
                        ))}
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                    <div className="h-7 w-40 rounded-xl bg-slate-200" />

                    <div className="space-y-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="space-y-2"
                            >
                                <div className="h-4 w-28 rounded bg-slate-200" />
                                <div className="h-11 w-full rounded-xl bg-slate-100 border border-slate-200" />
                            </div>
                        ))}
                    </div>

                    <div className="h-12 w-full rounded-xl bg-slate-200" />
                </div>
            </div>
        </div>
    );
}