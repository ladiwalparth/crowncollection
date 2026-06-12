import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { WHATSAPP_NUMBER, INSTAGRAM_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Talk directly to the makers. Reach Crown Collection on WhatsApp for orders, questions, sizes, photos and order tracking — or follow us on Instagram.",
};

export default function ContactPage() {
  return (
    <main className="min-h-dvh bg-[#F7F3EC]">
      <section className="bg-[#2B2622] px-6 py-16 text-center sm:py-20">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-[#D9BE8C]">Talk to the makers</p>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl text-white sm:text-5xl">Contact us</h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <Reveal>
          <p className="mx-auto max-w-xl leading-relaxed text-[#4A3728]">
            When you message us, you are talking directly to the people who make your
            piece — not a call centre. WhatsApp is the fastest way to reach us for
            orders, questions, extra photos and videos, sizes, or tracking an order.
          </p>

          <div className="mx-auto mt-10 flex max-w-md flex-col gap-4">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I have a question.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center bg-[#25D366] px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-[#1FB857]"
            >
              Chat on WhatsApp
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center border border-[#2B2622] px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#2B2622] transition hover:bg-[#2B2622] hover:text-white"
            >
              Follow on Instagram
            </a>
          </div>

          <p className="mt-10 text-sm text-[#9C8F7A]">
            We reply as soon as we can — usually within a few hours during the working day.
          </p>
        </Reveal>
      </section>
    </main>
  );
}
