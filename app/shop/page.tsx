import type { Metadata } from "next";
import Image from "next/image";
import Fuse from "fuse.js";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import { getCategoryTiles } from "@/lib/categories";
import FilterBar from "./FilterBar";
import Pagination from "./Pagination";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Browse handcrafted brass diyas, idols, urlis, lamps and more. Order directly on WhatsApp.",
};

const PER_PAGE = 12;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    sort?: string;
    category?: string;
    price?: string;
    page?: string;
  }>;
}) {
  const { q = "", sort = "", category = "", price = "", page = "1" } =
    await searchParams;
  const query = q.trim();
  await dbConnect();

  // Filters that are NOT the search box (category + price)
  const filter: Record<string, unknown> = {};
  if (category) filter.category = category;
  if (price) {
    const [minStr, maxStr] = price.split("-");
    const range: Record<string, number> = {};
    const min = Number(minStr);
    const max = Number(maxStr);
    if (minStr !== "" && !isNaN(min)) range.$gte = min;
    if (maxStr !== "" && !isNaN(max)) range.$lte = max;
    if (Object.keys(range).length > 0) filter.price = range;
  }

  let sortOption: Record<string, 1 | -1> = { createdAt: -1 };
  if (sort === "price_asc") sortOption = { price: 1 };
  if (sort === "price_desc") sortOption = { price: -1 };

  const currentPage = Math.max(1, Number(page) || 1);

  let products: any[] = [];
  let totalCount = 0;

  if (query) {
    // SMART SEARCH: load the candidates that pass category/price,
    // then fuzzy-match so small spelling mistakes still find the right items.
    const candidates = (await Product.find(filter).sort(sortOption).lean()) as any[];

    const fuse = new Fuse(candidates, {
      keys: [
        { name: "name", weight: 0.6 },
        { name: "category", weight: 0.25 },
        { name: "description", weight: 0.15 },
      ],
      threshold: 0.4,        // how forgiving: 0 = exact only, 1 = matches anything
      ignoreLocation: true,  // a match counts anywhere in the text
      minMatchCharLength: 2,
    });

    let matched = fuse.search(query).map((r) => r.item);

    // Fuse returns best-match-first; only re-sort if the user chose a price sort
    if (sort === "price_asc") matched = [...matched].sort((a, b) => a.price - b.price);
    if (sort === "price_desc") matched = [...matched].sort((a, b) => b.price - a.price);

    totalCount = matched.length;
    products = matched.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  } else {
    // No search text: let the database do the heavy lifting (fast pagination)
    totalCount = await Product.countDocuments(filter);
    products = (await Product.find(filter)
      .sort(sortOption)
      .skip((currentPage - 1) * PER_PAGE)
      .limit(PER_PAGE)
      .lean()) as any[];
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / PER_PAGE));

  const categoryTiles = await getCategoryTiles();
  const categories = categoryTiles.map((c) => c.name);
  const categoryHero = category
    ? categoryTiles.find((c) => c.name === category)?.image ?? ""
    : "";

  return (
    <main className="min-h-dvh bg-[#F7F3EC] pb-14">
      {category && (
        <section className="relative flex h-[40vh] min-h-[280px] w-full items-center justify-center overflow-hidden bg-[#2B2622] text-center">
          {categoryHero && (
            <Image src={categoryHero} alt={category} fill priority sizes="100vw" className="object-cover" />
          )}
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 px-6">
            <p className="text-xs uppercase tracking-[0.35em] text-[#D9BE8C]">Category</p>
            <h1 className="mt-3 text-4xl text-white sm:text-5xl">{category}</h1>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-6xl px-6 pt-10">
        {!category && (
          <>
            <p className="text-xs uppercase tracking-[0.3em] text-[#B08D57]">The Collection</p>
            <h1 className="mt-2 text-3xl text-[#2B2622] sm:text-4xl">Shop</h1>
          </>
        )}

        <FilterBar categories={categories} currentQuery={q} currentSort={sort} currentCategory={category} currentPrice={price} />

        <p className="mt-5 text-sm text-[#4A3728]">
          {totalCount} product{totalCount === 1 ? "" : "s"}
          {query ? ` for “${query}”` : ""}
          {totalPages > 1 ? ` · Page ${currentPage} of ${totalPages}` : ""}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p: any) => (
            <ProductCard key={String(p._id)} product={p} />
          ))}
        </div>

        {products.length === 0 && (
          <p className="mt-10 text-[#4A3728]">
            No products found{query ? ` for “${query}”` : ""}. Try a shorter word or clear the filters.
          </p>
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} searchParams={{ q, sort, category, price }} />
      </div>
    </main>
  );
}
