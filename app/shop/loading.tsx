export default function Loading() {
  return (
    <main className="min-h-dvh bg-[#F7F3EC] px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="h-3 w-28 animate-pulse bg-[#E8DFD0]" />
        <div className="mt-3 h-9 w-36 animate-pulse bg-[#E8DFD0]" />
        <div className="mt-6 flex flex-col gap-3 lg:flex-row">
          <div className="h-11 flex-1 animate-pulse bg-[#E8DFD0]" />
          <div className="hidden h-11 w-72 animate-pulse bg-[#E8DFD0] lg:block" />
        </div>
        <div className="mt-5 h-4 w-40 animate-pulse bg-[#E8DFD0]" />
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[3/4] w-full animate-pulse bg-[#E8DFD0]" />
              <div className="mt-3 h-4 w-3/4 animate-pulse bg-[#E8DFD0]" />
              <div className="mt-2 h-4 w-1/4 animate-pulse bg-[#E8DFD0]" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}