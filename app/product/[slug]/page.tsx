import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import AddToCart from "@/components/AddToCart";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await dbConnect();
  const product = await Product.findOne({ slug }).lean();
  if (!product) notFound();

  const p = product as any;

  return (
    <main className="min-h-dvh bg-[#F7F3EC] px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/shop" className="text-sm text-[#B08D57]">← Back to shop</Link>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-[#E8DFD0]">
            {p.image && (
              <Image src={p.image} alt={p.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            )}
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-[#2B2622]">{p.name}</h1>
            <p className="mt-2 text-2xl text-[#B08D57]">₹{p.price}</p>
            <p className="mt-4 text-[#4A3728]">{p.description}</p>
            <p className="mt-2 text-sm text-[#4A3728]">
              {p.stock > 0 ? `In stock: ${p.stock}` : "Out of stock"}
            </p>
            <AddToCart product={{ id: String(p._id), name: p.name, price: p.price, image: p.image, slug: p.slug }} />
          </div>
        </div>
      </div>
    </main>
  );
}