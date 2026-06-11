export default function Loading() {
  return (
    <main className="min-h-dvh bg-[#F7F3EC] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="h-9 w-32 animate-pulse rounded bg-[#E8DFD0]" />
        <div className="mt-6 h-11 w-full animate-pulse rounded-lg bg-[#E8DFD0]" />
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg bg-white p-4 shadow-sm">
              <div className="aspect-[4/5] w-full animate-pulse rounded bg-[#E8DFD0]" />
              <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-[#E8DFD0]" />
              <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-[#E8DFD0]" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}