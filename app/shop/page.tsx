import Image from "next/image";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import SortBar from "./SortBar";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; category?: string }>;
}) {
  const { sort = "", category = "" } = await searchParams;

  await dbConnect();

  const filter: Record<string, unknown> = {};
  if (category) filter.category = category;

  let sortOption: Record<string, 1 | -1> = { createdAt: -1 }; // default: newest first
  if (sort === "price_asc") sortOption = { price: 1 };
  if (sort === "price_desc") sortOption = { price: -1 };

  const products = await Product.find(filter).sort(sortOption).lean();
  const categories = (await Product.distinct("category")).filter(Boolean) as string[];

  return (
    <main className="min-h-dvh bg-[#F7F3EC] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-semibold text-[#2B2622]">Shop</h1>

        <SortBar categories={categories} currentSort={sort} currentCategory={category} />

        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
          {products.map((p: any) => (
            <div key={String(p._id)} className="rounded-lg bg-white p-4 shadow-sm">
              {p.image ? (
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded">
                  <Image src={p.image} alt={p.name} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
                </div>
              ) : (
                <div className="aspect-[4/5] w-full rounded bg-[#E8DFD0]" />
              )}
              <h2 className="mt-3 text-sm font-medium text-[#2B2622]">{p.name}</h2>
              <p className="mt-1 text-[#B08D57]">₹{p.price}</p>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <p className="mt-8 text-[#4A3728]">No products match. Try clearing the filters.</p>
        )}
      </div>
    </main>
  );
}