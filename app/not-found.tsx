import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-[#F7F3EC] px-6 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-[#B08D57]">404</p>
      <h1 className="mt-4 text-4xl text-[#2B2622]">Page not found</h1>
      <p className="mt-3 max-w-md text-[#4A3728]">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="rounded-lg bg-[#B08D57] px-8 py-3 font-medium text-white hover:bg-[#9A7A4A]">Go home</Link>
        <Link href="/shop" className="rounded-lg border border-[#B08D57] px-8 py-3 font-medium text-[#B08D57] hover:bg-white">Browse the shop</Link>
      </div>
    </main>
  );
}