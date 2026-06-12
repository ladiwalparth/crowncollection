import Image from "next/image";
import Link from "next/link";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import ProductCard from "@/components/ProductCard";
import { WHATSAPP_NUMBER, HERO_IMAGE } from "@/lib/config";

export default async function Home() {
  await dbConnect();

  const featured = await Product.find().sort({ createdAt: -1 }).limit(4).lean();
  const categories = ((await Product.distinct("category")).filter(Boolean) as string[]).slice(0, 6);

  const categoryTiles = await Promise.all(
    categories.map(async (c) => {
      const sample: any = await Product.findOne({ category: c, image: { $ne: "" } }).lean();
      return { name: c, image: sample?.image ?? "" };
    })
  );

  const heroImage = HERO_IMAGE || (featured[0] as any)?.image || "";

  return (
    <main className="bg-[#F7F3EC]">
      {/* Hero */}
      <section className="relative flex h-[75vh] min-h-[520px] w-full items-center justify-center overflow-hidden bg-[#2B2622] text-center">
        {heroImage && (
          <Image src={heroImage} alt="Handcrafted brass" fill priority sizes="100vw" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 px-6">
          <p className="text-xs uppercase tracking-[0.35em] text-[#D9BE8C]">Handcrafted Brass</p>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl text-white sm:text-6xl">
            Timeless brass for your home &amp; temple
          </h1>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/shop" className="w-full bg-white px-10 py-4 text-xs font-medium uppercase tracking-[0.25em] text-[#2B2622] transition hover:bg-[#E8DFD0] sm:w-auto">
              Shop the collection
            </Link>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="w-full border border-white px-10 py-4 text-xs font-medium uppercase tracking-[0.25em] text-white transition hover:bg-white hover:text-[#2B2622] sm:w-auto">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Campaign category tiles */}
      {categoryTiles.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs uppercase tracking-[0.3em] text-[#B08D57]">Explore</p>
          <h2 className="mt-2 text-3xl text-[#2B2622]">Shop by category</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoryTiles.map((c) => (
              <Link key={c.name} href={`/shop?category=${encodeURIComponent(c.name)}`} className="group relative aspect-[4/5] overflow-hidden bg-[#E8DFD0] sm:aspect-[3/4]">
                {c.image && (
                  <Image src={c.image} alt={c.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <p className="text-lg uppercase tracking-[0.2em] text-white">{c.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.25em] text-white/80 transition group-hover:text-[#D9BE8C]">Explore →</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* New arrivals */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#B08D57]">Just in</p>
              <h2 className="mt-2 text-3xl text-[#2B2622]">New arrivals</h2>
            </div>
            <Link href="/shop" className="text-xs uppercase tracking-[0.2em] text-[#4A3728] hover:text-[#B08D57]">View all →</Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
            {featured.map((p: any) => (
              <ProductCard key={String(p._id)} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Editorial band */}
      <section className="bg-[#2B2622] px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-[#D9BE8C]">Our promise</p>
        <p className="mx-auto mt-6 max-w-2xl font-serif text-2xl leading-relaxed text-[#F7F3EC] sm:text-3xl">
          Every piece is shaped by hand, finished with care, and chosen to last for generations.
        </p>
      </section>

      {/* Trust strip */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 text-center sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#2B2622]">Handcrafted in India</p>
            <p className="mt-2 text-sm text-[#4A3728]">Traditional craftsmanship, honest finishes.</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#2B2622]">Order on WhatsApp</p>
            <p className="mt-2 text-sm text-[#4A3728]">Talk to us directly — no checkout hassle.</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#2B2622]">Quality checked</p>
            <p className="mt-2 text-sm text-[#4A3728]">Every piece inspected before dispatch.</p>
          </div>
        </div>
      </section>
    </main>
  );
}