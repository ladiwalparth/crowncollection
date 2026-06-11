import Image from "next/image";
import Link from "next/link";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import FilterBar from "./FilterBar";

function escapeRegex(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string; category?: string }>;
}) {
  const { q = "", sort = "", category = "" } = await searchParams;
  await dbConnect();

  const filter: Record<string, unknown> = {};
  if (category) filter.category = category;
  if (q) {
    const regex = { $regex: escapeRegex(q), $options: "i" };
    filter.$or = [{ name: regex }, { description: regex }, { category: regex }];
  }

  let sortOption: Record<string, 1 | -1> = { createdAt: -1 };
  if (sort === "price_asc") sortOption = { price: 1 };
  if (sort === "price_desc") sortOption = { price: -1 };

  const products = await Product.find(filter).sort(sortOption).lean();
  const categories = (await Product.distinct("category")).filter(Boolean) as string[];

  return (
    <main className="min-h-dvh bg-[#F7F3EC] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-semibold text-[#2B2622]">Shop</h1>

        <FilterBar
          categories={categories}
          currentQuery={q}
          currentSort={sort}
          currentCategory={category}
        />

        {q && (
          <p className="mt-4 text-sm text-[#4A3728]">
            {products.length} result{products.length === 1 ? "" : "s"} for “{q}”
          </p>
        )}

        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
          {products.map((p: any) => (
            <Link
              key={String(p._id)}
              href={`/product/${p.slug}`}
              className="rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              {p.image ? (
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-[4/5] w-full rounded bg-[#E8DFD0]" />
              )}
              <h2 className="mt-3 text-sm font-medium text-[#2B2622]">{p.name}</h2>
              <p className="mt-1 text-[#B08D57]">₹{p.price}</p>
            </Link>
          ))}
        </div>

        {products.length === 0 && (
          <p className="mt-8 text-[#4A3728]">
            No products found. Try a different search or clear the filters.
          </p>
        )}
      </div>
    </main>
  );
}