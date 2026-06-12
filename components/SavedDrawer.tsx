"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSaved } from "@/store/saved";
import { WHATSAPP_NUMBER, SITE_URL } from "@/lib/config";

export default function SavedDrawer() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { items, remove } = useSaved();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const count = mounted ? items.length : 0;

  const message = `Hi! I'd like to enquire about these saved items:\n\n${items
    .map((i) => `• ${i.name} — ₹${i.price}\n${SITE_URL}/product/${i.slug}`)
    .join("\n\n")}`;
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="Saved items" className="relative text-[#2B2622] hover:text-[#B08D57]">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
        {count > 0 && (
          <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#B08D57] text-[10px] text-white">{count}</span>
        )}
      </button>

      <div onClick={() => setOpen(false)} className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} />

      <aside className={`fixed inset-y-0 right-0 z-[70] flex w-full flex-col bg-[#F7F3EC] transition-transform duration-300 ease-out sm:w-[420px] ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex h-14 items-center justify-between px-5">
          <p className="text-xs uppercase tracking-[0.25em] text-[#2B2622]">
            Saved items{count > 0 ? ` (${count})` : ""}
          </p>
          <button onClick={() => setOpen(false)} aria-label="Close" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2B2622] text-white">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {count === 0 ? (
            <div className="mt-16 text-center">
              <p className="text-[#4A3728]">Nothing saved yet.</p>
              <Link href="/shop" onClick={() => setOpen(false)} className="mt-4 inline-block text-xs uppercase tracking-[0.2em] text-[#B08D57]">Browse the collection →</Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((i) => (
                <div key={i.id} className="flex items-center gap-4 border border-[#E8DFD0] bg-white p-3">
                  <Link href={`/product/${i.slug}`} onClick={() => setOpen(false)} className="relative h-20 w-16 shrink-0 overflow-hidden bg-[#E8DFD0]">
                    {i.image && <Image src={i.image} alt={i.name} fill sizes="64px" className="object-cover" />}
                  </Link>
                  <div className="flex-1">
                    <Link href={`/product/${i.slug}`} onClick={() => setOpen(false)} className="text-sm text-[#2B2622] hover:text-[#B08D57]">{i.name}</Link>
                    <p className="mt-1 text-sm text-[#4A3728]">₹{i.price}</p>
                  </div>
                  <button onClick={() => remove(i.id)} aria-label="Remove" className="text-xs text-[#9C8F7A] transition hover:text-red-600">✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {count > 0 && (
          <div className="border-t border-[#E8DFD0] p-5">
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center bg-[#25D366] px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-[#1FB857]">
              Enquire on WhatsApp
            </a>
          </div>
        )}
      </aside>
    </>
  );
}