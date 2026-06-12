export default function Loading() {
  return (
    <main className="min-h-dvh bg-[#F7F3EC] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="h-3 w-52 animate-pulse bg-[#E8DFD0]" />
        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <div className="aspect-[3/4] w-full animate-pulse bg-[#E8DFD0]" />
            <div className="mt-3 hidden gap-3 md:flex">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-20 w-16 animate-pulse bg-[#E8DFD0]" />
              ))}
            </div>
          </div>
          <div>
            <div className="h-6 w-24 animate-pulse bg-[#E8DFD0]" />
            <div className="mt-5 h-10 w-3/4 animate-pulse bg-[#E8DFD0]" />
            <div className="mt-4 h-8 w-28 animate-pulse bg-[#E8DFD0]" />
            <div className="mt-5 h-4 w-44 animate-pulse bg-[#E8DFD0]" />
            <div className="mt-8 space-y-2 border-t border-[#E8DFD0] pt-8">
              <div className="h-4 w-full animate-pulse bg-[#E8DFD0]" />
              <div className="h-4 w-5/6 animate-pulse bg-[#E8DFD0]" />
              <div className="h-4 w-2/3 animate-pulse bg-[#E8DFD0]" />
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <div className="h-12 w-full animate-pulse bg-[#E8DFD0] sm:w-56" />
              <div className="h-12 w-full animate-pulse bg-[#E8DFD0] sm:w-40" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}