"use client";

function Pulse({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-xl bg-current ${className}`} />;
}

export function SpotifySkeleton() {
  return (
    <div className="w-full min-h-screen bg-[#FAF9FF] flex flex-col px-4 pt-4 pb-12 gap-5">
      <div className="flex items-center justify-between mt-1">
        <Pulse className="w-6 h-6 text-slate-200 rounded-lg" />
        <Pulse className="w-32 h-3 text-slate-200" />
        <Pulse className="w-6 h-6 text-slate-200 rounded-lg" />
      </div>

      <div className="w-full aspect-square max-h-[360px] relative px-4 pt-2 pb-8">
        <Pulse className="w-full h-full text-slate-200 rounded-2xl" />
      </div>

      <div className="flex items-center justify-between px-0.5">
        <div className="flex flex-col gap-2 flex-1 pr-4">
          <Pulse className="w-40 h-4 text-slate-200" />
          <Pulse className="w-28 h-3 text-rose-100" />
        </div>
        <Pulse className="w-11 h-11 text-slate-200 rounded-full" />
      </div>

      <div className="flex flex-col gap-1">
        <Pulse className="w-full h-1 text-slate-200 rounded-full" />
        <div className="flex justify-between">
          <Pulse className="w-6 h-2 text-slate-200" />
          <Pulse className="w-6 h-2 text-slate-200" />
        </div>
      </div>

      <div className="flex items-center justify-between px-6">
        <Pulse className="w-4 h-4 text-slate-200 rounded" />
        <Pulse className="w-5 h-5 text-slate-200 rounded" />
        <Pulse className="w-10 h-10 text-rose-200 rounded-full" />
        <Pulse className="w-5 h-5 text-slate-200 rounded" />
        <Pulse className="w-4 h-4 text-slate-200 rounded" />
      </div>

      <div className="flex flex-col gap-4">
        <Pulse className="w-full h-24 text-slate-100 rounded-2xl" />
        <Pulse className="w-full h-20 text-slate-100 rounded-2xl" />
      </div>
    </div>
  );
}

export function StorySkeleton() {
  return (
    <div className="w-full min-h-screen bg-[#121212] flex flex-col px-4 pt-4 pb-12 gap-4">
      <div className="flex gap-1 px-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex-1 h-[2px] bg-white/10 rounded-full animate-pulse" />
        ))}
      </div>

      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse" />
          <div className="flex flex-col gap-1.5">
            <div className="w-28 h-3 bg-white/10 rounded-xl animate-pulse" />
            <div className="w-20 h-2 bg-rose-500/20 rounded-xl animate-pulse" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-7 h-7 rounded-full bg-white/10 animate-pulse" />
          <div className="w-7 h-7 rounded-full bg-white/10 animate-pulse" />
        </div>
      </div>

      <div className="w-full aspect-4/5 max-h-[400px] relative px-4 my-1">
        <div className="w-full h-full rounded-2xl bg-white/10 animate-pulse" />
      </div>
      <div className="flex gap-2.5">
        <div className="flex-1 h-12 rounded-2xl bg-white/10 animate-pulse" />
        <div className="w-12 h-12 rounded-2xl bg-rose-500/30 animate-pulse" />
      </div>

      <div className="flex flex-col gap-3">
        <div className="w-full h-24 rounded-2xl bg-white/10 animate-pulse" />
        <div className="w-full h-20 rounded-2xl bg-white/10 animate-pulse" />
      </div>
    </div>
  );
}
