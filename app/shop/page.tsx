import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import FilterBar from "./FilterBar";
import Pagination from "./Pagination";
import ProductCard from "@/components/ProductCard";

const PER_PAGE = 12;

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
    <main className="min-h-dvh bg-[#F7F3EC] px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.3em] text-[#B08D57]">The Collection</p>
        <h1 className="mt-2 text-3xl text-[#2B2622] sm:text-4xl">Shop</h1>

        <FilterBar categories={categories} currentQuery={q} currentSort={sort} currentCategory={category} currentPrice={price} />

        <p className="mt-5 text-sm text-[#4A3728]">
          {totalCount} product{totalCount === 1 ? "" : "s"}
          {q ? ` for “${q}”` : ""}
          {totalPages > 1 ? ` · Page ${currentPage} of ${totalPages}` : ""}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p: any) => (
            <ProductCard key={String(p._id)} product={p} />
          ))}
        </div>

        {products.length === 0 && (
          <p className="mt-10 text-[#4A3728]">No products found. Try a different search or clear the filters.</p>
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} searchParams={{ q, sort, category, price }} />
      </div>
    </main>
  );
}