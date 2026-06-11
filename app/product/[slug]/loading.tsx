export default function Loading() {
  return (
    <main className="min-h-dvh bg-[#F7F3EC] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="h-4 w-48 animate-pulse rounded bg-[#E8DFD0]" />
        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <div className="aspect-[4/5] w-full animate-pulse rounded-2xl bg-[#E8DFD0]" />
          <div>
            <div className="h-6 w-24 animate-pulse rounded-full bg-[#E8DFD0]" />
            <div className="mt-4 h-9 w-3/4 animate-pulse rounded bg-[#E8DFD0]" />
            <div className="mt-4 h-8 w-28 animate-pulse rounded bg-[#E8DFD0]" />
            <div className="mt-6 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-[#E8DFD0]" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-[#E8DFD0]" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-[#E8DFD0]" />
            </div>
            <div className="mt-10 h-12 w-full animate-pulse rounded-lg bg-[#E8DFD0] sm:w-56" />
          </div>
        </div>
      </div>
    </main>
  );
}