import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { WHATSAPP_NUMBER } from "@/lib/config";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "How ordering works at Crown Collection: made-to-order crafting in about 7 days, shipping across India with tracking, and our damage-protection policy.",
};

const steps = [
  {
    title: "Choose your piece",
    text: "Browse the collection here on the website and tap “Buy on WhatsApp” on the product you like.",
  },
  {
    title: "Confirm on WhatsApp",
    text: "We confirm the piece, final price and shipping charge for your pincode, and answer any questions.",
  },
  {
    title: "Payment",
    text: "Pay securely by UPI or bank transfer. Crafting begins once payment is received. (No cash on delivery for now.)",
  },
  {
    title: "We craft your piece — about 7 days",
    text: "Every order is made to order in our own workshop. Preparation takes around 7 working days before dispatch.",
  },
  {
    title: "Dispatch & delivery",
    text: "We pack it safely and ship across India. Your tracking number is shared on WhatsApp; delivery usually takes 5–10 days after dispatch depending on your location.",
  },
];

export default function ShippingReturnsPage() {
  return (
    <main className="min-h-dvh bg-[#F7F3EC]">
      <section className="bg-[#2B2622] px-6 py-16 text-center sm:py-20">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-[#D9BE8C]">Good to know</p>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl text-white sm:text-5xl">
            Shipping &amp; Returns
          </h1>
        </Reveal>
      </section>

      {/* How ordering works */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-[#B08D57]">Step by step</p>
          <h2 className="mt-2 text-3xl text-[#2B2622]">How ordering works</h2>

          <ol className="mt-8 space-y-7">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2B2622] font-serif text-sm text-[#D9BE8C]">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#2B2622]">{s.title}</p>
                  <p className="mt-1.5 leading-relaxed text-[#4A3728]">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* Returns policy */}
      <section className="bg-white px-6 py-16">
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-[#B08D57]">Our promise</p>
            <h2 className="mt-2 text-3xl text-[#2B2622]">Damage protection &amp; returns</h2>

            <p className="mt-6 leading-relaxed text-[#4A3728]">
              <strong>If your piece arrives damaged, we make it right</strong> — with a free
              replacement or a full refund, your choice. To claim this, please record a
              clear unboxing video while opening the parcel and send it to us on WhatsApp
              within <strong>48 hours of delivery</strong>. The video is what allows us to
              claim the damage with the courier, so we cannot accept damage claims
              without it.
            </p>

            <p className="mt-6 leading-relaxed text-[#4A3728]">
              Because every piece is made to order and brass is heavy and fragile to ship,
              we are unable to accept returns or exchanges for change of mind. Please feel
              free to ask us for extra photos, videos, sizes or weight of any product on
              WhatsApp before ordering — we are happy to share everything so you can
              decide with confidence.
            </p>

            <p className="mt-6 leading-relaxed text-[#4A3728]">
              Slight variations in shade, weight and finish are natural in handcrafted
              brass — no two pieces are exactly alike, and that is what makes yours yours.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Question CTA */}
      <section className="px-6 py-16 text-center">
        <Reveal>
          <p className="font-serif text-2xl text-[#2B2622]">Have a question before ordering?</p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I have a question about shipping.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-[#25D366] px-10 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-[#1FB857]"
          >
            Ask us on WhatsApp
          </a>
        </Reveal>
      </section>
    </main>
  );
}
