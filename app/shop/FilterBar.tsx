"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FilterBar({
  categories,
  currentQuery,
  currentSort,
  currentCategory,
}: {
  categories: string[];
  currentQuery: string;
  currentSort: string;
  currentCategory: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(currentQuery);

  function go(q: string, sort: string, category: string) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (sort) params.set("sort", sort);
    if (category) params.set("category", category);
    const qs = params.toString();
    router.push(qs ? `/shop?${qs}` : "/shop");
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    go(query.trim(), currentSort, currentCategory);
  }

  const selectClass =
    "rounded-lg border border-[#D8CDBA] bg-white px-3 py-2.5 text-sm text-[#2B2622]";

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <form onSubmit={handleSearch} className="flex flex-1 gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search diyas, idols, decor…"
          className="w-full rounded-lg border border-[#D8CDBA] bg-white px-4 py-2.5 text-sm text-[#2B2622] placeholder:text-[#9C8F7A] focus:border-[#B08D57] focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-[#B08D57] px-4 py-2.5 text-sm font-medium text-white"
        >
          Search
        </button>
      </form>

      <div className="flex gap-3">
        <select
          value={currentSort}
          onChange={(e) => go(query.trim(), e.target.value, currentCategory)}
          className={selectClass}
        >
          <option value="">Sort: Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>

        <select
          value={currentCategory}
          onChange={(e) => go(query.trim(), currentSort, e.target.value)}
          className={selectClass}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
    </div>
  );
}