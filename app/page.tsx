import Image from "next/image";
import Link from "next/link";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import { WHATSAPP_NUMBER } from "@/lib/config";

export default async function Home() {
  await dbConnect();

  const featured = await Product.find().sort({ createdAt: -1 }).limit(4).lean();
  const categories = ((await Product.distinct("category")).filter(Boolean) as string[]).slice(0, 4);

  const categoryTiles = await Promise.all(
    categories.map(async (c) => {
      const sample: any = await Product.findOne({ category: c, image: { $ne: "" } }).lean();
      return { name: c, image: sample?.image ?? "" };
    })
  );

  return (
    <main className="bg-[#F7F3EC]">
      {/* Hero */}
      <section className="px-6 py-16 text-center sm:py-24">
        <p className="text-sm uppercase tracking-[0.3em] text-[#B08D57]">Handcrafted Brass</p>
        <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold text-[#2B2622] sm:text-6xl">
          Timeless brass for your home &amp; temple
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[#4A3728]">
          Diyas, idols and decor — handpicked, photographed honestly, delivered with care.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/shop" className="w-full rounded-lg bg-[#B08D57] px-8 py-3.5 font-medium text-white transition hover:bg-[#9A7A4A] sm:w-auto">
            Shop the collection
          </Link>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="w-full rounded-lg border border-[#B08D57] px-8 py-3.5 font-medium text-[#B08D57] transition hover:bg-white sm:w-auto">
            Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* Shop by category */}
      {categoryTiles.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-4">
          <h2 className="text-2xl font-semibold text-[#2B2622]">Shop by category</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {categoryTiles.map((c) => (
              <Link key={c.name} href={`/shop?category=${encodeURIComponent(c.name)}`} className="group relative aspect-square overflow-hidden rounded-lg bg-[#E8DFD0]">
                {c.image && (
                  <Image src={c.image} alt={c.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition duration-300 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <p className="absolute bottom-3 left-3 font-medium text-white">{c.name}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* New arrivals */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-[#2B2622]">New arrivals</h2>
            <Link href="/shop" className="text-sm text-[#B08D57] hover:underline">View all →</Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
            {featured.map((p: any) => (
              <Link key={String(p._id)} href={`/product/${p.slug}`} className="rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md">
                {p.image ? (
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded">
                    <Image src={p.image} alt={p.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                  </div>
                ) : (
                  <div className="aspect-[4/5] w-full rounded bg-[#E8DFD0]" />
                )}
                <h3 className="mt-3 text-sm font-medium text-[#2B2622]">{p.name}</h3>
                <p className="mt-1 text-[#B08D57]">₹{p.price}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Trust strip */}
      <section className="border-t border-[#E8DFD0] bg-white px-6 py-10">
        <div className="mx-auto grid max-w-5xl gap-6 text-center sm:grid-cols-3">
          <div>
            <p className="font-medium text-[#2B2622]">Handcrafted in India</p>
            <p className="mt-1 text-sm text-[#4A3728]">Traditional craftsmanship, honest finishes.</p>
          </div>
          <div>
            <p className="font-medium text-[#2B2622]">Order on WhatsApp</p>
            <p className="mt-1 text-sm text-[#4A3728]">Talk to us directly — no checkout hassle.</p>
          </div>
          <div>
            <p className="font-medium text-[#2B2622]">Quality checked</p>
            <p className="mt-1 text-sm text-[#4A3728]">Every piece inspected before dispatch.</p>
          </div>
        </div>
      </section>
    </main>
  );
}