import Link from "next/link";
import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import { productImages } from "@/lib/images";
import ProductGallery from "@/components/ProductGallery";
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
  const imgs = productImages(p);
  const inStock = p.stock > 0;

  return (
    <main className="min-h-dvh bg-[#F7F3EC] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <nav className="text-xs uppercase tracking-[0.15em] text-[#9C8F7A]">
          <Link href="/" className="hover:text-[#B08D57]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-[#B08D57]">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-[#4A3728]">{p.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
          <ProductGallery images={imgs} name={p.name} />

          <div className="flex flex-col">
            {p.category && (
              <Link href={`/shop?category=${encodeURIComponent(p.category)}`} className="w-fit border border-[#D8CDBA] px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-[#4A3728] transition hover:border-[#B08D57] hover:text-[#B08D57]">
                {p.category}
              </Link>
            )}

            <h1 className="mt-5 text-3xl text-[#2B2622] sm:text-5xl">{p.name}</h1>
            <p className="mt-4 text-2xl text-[#B08D57]">₹{p.price}</p>

            <p className={`mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.2em] ${inStock ? "text-green-700" : "text-red-600"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${inStock ? "bg-green-600" : "bg-red-500"}`} />
              {inStock ? `In stock — ${p.stock} available` : "Out of stock"}
            </p>

            <div className="mt-8 border-t border-[#E8DFD0] pt-8">
              <p className="text-xs uppercase tracking-[0.25em] text-[#B08D57]">About this piece</p>
              <p className="mt-3 leading-relaxed text-[#4A3728]">{p.description}</p>
            </div>

            <div className="mt-auto pt-10">
              <div className="flex flex-col gap-3 sm:flex-row">
                <WhatsAppBuy name={p.name} price={p.price} slug={p.slug} />
                <SaveButton variant="button" item={{ id: String(p._id), slug: p.slug, name: p.name, price: p.price, image: imgs[0] ?? "" }} />
              </div>
              <p className="mt-4 text-sm text-[#4A3728]">
                Tap the button to chat with us on WhatsApp — we confirm availability, delivery and payment there.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}