import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import WhatsAppBuy from "@/components/WhatsAppBuy";
import SaveButton from "@/components/SaveButton";

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
  const inStock = p.stock > 0;

  return (
    <main className="min-h-dvh bg-[#F7F3EC] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <nav className="text-sm text-[#9C8F7A]">
          <Link href="/" className="hover:text-[#B08D57]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-[#B08D57]">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-[#4A3728]">{p.name}</span>
        </nav>

        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#E8DFD0] shadow-sm">
            {p.image && (
              <Image src={p.image} alt={p.name} fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            )}
          </div>

          <div className="flex flex-col">
            {p.category && (
              <Link href={`/shop?category=${encodeURIComponent(p.category)}`} className="w-fit rounded-full bg-[#E8DFD0] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#4A3728] hover:bg-[#DFD3BE]">
                {p.category}
              </Link>
            )}

            <h1 className="mt-3 text-3xl text-[#2B2622] sm:text-4xl">{p.name}</h1>
            <p className="mt-3 text-3xl font-semibold text-[#B08D57]">₹{p.price}</p>

            <span className={`mt-4 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${inStock ? "bg-green-600" : "bg-red-500"}`} />
              {inStock ? `In stock — ${p.stock} available` : "Out of stock"}
            </span>

            <p className="mt-6 leading-relaxed text-[#4A3728]">{p.description}</p>

            <div className="mt-auto pt-8">
              <div className="flex flex-col gap-3 sm:flex-row">
                <WhatsAppBuy name={p.name} price={p.price} slug={p.slug} />
                <SaveButton variant="button" item={{ id: String(p._id), slug: p.slug, name: p.name, price: p.price, image: p.image ?? "" }} />
              </div>
              <p className="mt-3 text-sm text-[#4A3728]">
                Tap the button to chat with us on WhatsApp — we confirm availability, delivery and payment there.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}