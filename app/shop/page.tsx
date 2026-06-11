import Image from "next/image";
import Link from "next/link";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import FilterBar from "./FilterBar";
import Pagination from "./Pagination";

const PER_PAGE = 3;

function escapeRegex(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

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
  await dbConnect();

  const filter: Record<string, unknown> = {};
  if (category) filter.category = category;
  if (q) {
    const regex = { $regex: escapeRegex(q), $options: "i" };
    filter.$or = [{ name: regex }, { description: regex }, { category: regex }];
  }
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

  const totalCount = await Product.countDocuments(filter);
  const totalPages = Math.max(1, Math.ceil(totalCount / PER_PAGE));

  const products = await Product.find(filter)
    .sort(sortOption)
    .skip((currentPage - 1) * PER_PAGE)
    .limit(PER_PAGE)
    .lean();

  const categories = (await Product.distinct("category")).filter(
    Boolean
  ) as string[];

  return (
    <main className="min-h-dvh bg-[#F7F3EC] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-semibold text-[#2B2622]">Shop</h1>

        <FilterBar
          categories={categories}
          currentQuery={q}
          currentSort={sort}
          currentCategory={category}
          currentPrice={price}
        />

        <p className="mt-4 text-sm text-[#4A3728]">
          {totalCount} product{totalCount === 1 ? "" : "s"}
          {q ? ` for “${q}”` : ""}
          {totalPages > 1 ? ` · Page ${currentPage} of ${totalPages}` : ""}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3">
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

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          searchParams={{ q, sort, category, price }}
        />
      </div>
    </main>
  );
}