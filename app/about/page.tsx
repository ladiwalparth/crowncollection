import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Crown Collection is a brass manufacturing firm. Every piece is crafted in our own workshop, made to order, and quality-checked before dispatch.",
};

export default function AboutPage() {
  return (
    <main className="min-h-dvh bg-[#F7F3EC]">
      {/* Dark intro band */}
      <section className="bg-[#2B2622] px-6 py-20 text-center sm:py-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-[#D9BE8C]">Our Story</p>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl text-white sm:text-5xl">
            We don&apos;t resell brass. We make it.
          </h1>
        </Reveal>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <Reveal>
          <p className="leading-relaxed text-[#4A3728]">
            Crown Collection is a manufacturing firm. Every diya, idol and artifact in
            this store is shaped, finished and polished in our own workshop — not picked
            from a wholesale market. Because the maker and the seller are the same people,
            nothing leaves our hands unless we would keep it in our own home.
          </p>
          <p className="mt-6 leading-relaxed text-[#4A3728]">
            Brass is a living metal. It is poured, beaten, turned and polished by hand,
            and it rewards patience — which is why we work made-to-order. When you place
            an order, we take about <strong>7 days to prepare your piece</strong> before
            it is packed and dispatched. You are not buying something that sat in a
            godown; you are buying something that was finished for you.
          </p>
          <p className="mt-6 leading-relaxed text-[#4A3728]">
            We keep ordering simple and personal: you choose on the website, and the
            order itself happens on WhatsApp — a real conversation with the people who
            make your piece, where we confirm details, payment and delivery.
          </p>
        </Reveal>
      </section>

      {/* Three promises */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 text-center sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#2B2622]">In-house manufacturing</p>
            <p className="mt-2 text-sm text-[#4A3728]">Made in our own workshop, from raw brass to final polish.</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#2B2622]">Made to order</p>
            <p className="mt-2 text-sm text-[#4A3728]">Around 7 days of crafting before your piece is dispatched.</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#2B2622]">Checked by the maker</p>
            <p className="mt-2 text-sm text-[#4A3728]">Every piece is inspected by us personally before packing.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 text-center">
        <Reveal>
          <p className="font-serif text-2xl text-[#2B2622]">See what we&apos;re making</p>
          <Link
            href="/shop"
            className="mt-6 inline-block bg-[#2B2622] px-10 py-4 text-xs font-medium uppercase tracking-[0.25em] text-white transition hover:bg-[#4A3728]"
          >
            Shop the collection
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
