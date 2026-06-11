"use client";

import { useRouter } from "next/navigation";

export default function SortBar({
  categories,
  currentSort,
  currentCategory,
}: {
  categories: string[];
  currentSort: string;
  currentCategory: string;
}) {
  const router = useRouter();

  function go(sort: string, category: string) {
    const params = new URLSearchParams();
    if (sort) params.set("sort", sort);
    if (category) params.set("category", category);
    const qs = params.toString();
    router.push(qs ? `/shop?${qs}` : "/shop");
  }

  const selectClass = "rounded border border-[#D8CDBA] bg-white px-3 py-2 text-sm text-[#2B2622]";

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <select value={currentSort} onChange={(e) => go(e.target.value, currentCategory)} className={selectClass}>
        <option value="">Sort: Newest</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>

      <select value={currentCategory} onChange={(e) => go(currentSort, e.target.value)} className={selectClass}>
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}