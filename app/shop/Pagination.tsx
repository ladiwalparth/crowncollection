import Link from "next/link";

function getPages(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (current >= total - 3)
    return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}

export default function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  searchParams: { q?: string; sort?: string; category?: string; price?: string };
}) {
  if (totalPages <= 1) return null;

  function pageHref(page: number) {
    const params = new URLSearchParams();
    if (searchParams.q) params.set("q", searchParams.q);
    if (searchParams.sort) params.set("sort", searchParams.sort);
    if (searchParams.category) params.set("category", searchParams.category);
    if (searchParams.price) params.set("price", searchParams.price);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    return qs ? `/shop?${qs}` : "/shop";
  }

  const base =
    "flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm";

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
      aria-label="Pagination"
    >
      {currentPage > 1 && (
        <Link
          href={pageHref(currentPage - 1)}
          className={`${base} border-[#D8CDBA] bg-white text-[#2B2622]`}
        >
          ← Prev
        </Link>
      )}

      {getPages(currentPage, totalPages).map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="px-2 text-[#9C8F7A]">…</span>
        ) : (
          <Link
            key={p}
            href={pageHref(p)}
            className={`${base} ${
              p === currentPage
                ? "border-[#B08D57] bg-[#B08D57] text-white"
                : "border-[#D8CDBA] bg-white text-[#2B2622]"
            }`}
          >
            {p}
          </Link>
        )
      )}

      {currentPage < totalPages && (
        <Link
          href={pageHref(currentPage + 1)}
          className={`${base} border-[#D8CDBA] bg-white text-[#2B2622]`}
        >
          Next →
        </Link>
      )}
    </nav>
  );
}