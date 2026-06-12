"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { WHATSAPP_NUMBER, INSTAGRAM_URL } from "@/lib/config";

type CategoryTile = { name: string; image: string };

export default function MenuDrawer({ categories }: { categories: CategoryTile[] }) {
  const [open, setOpen] = useState(false);
  const [showCats, setShowCats] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setShowCats(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    setShowCats(false);
  }

  const itemClass = "block py-3 text-left text-2xl text-[#2B2622] transition hover:text-[#B08D57]";

  const drawer = (
    <>
      <div onClick={close} className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} />

      <aside inert={!open} className={`fixed inset-y-0 right-0 z-[70] w-full bg-[#F7F3EC] transition-transform duration-300 ease-out sm:w-[440px] ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex h-14 items-center justify-end px-5">
          <button onClick={close} aria-label="Close menu" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2B2622] text-white">✕</button>
        </div>

        <div className="relative h-[calc(100%-3.5rem)] overflow-hidden">
          <div className={`flex h-full w-[200%] transition-transform duration-300 ease-out ${showCats ? "-translate-x-1/2" : "translate-x-0"}`}>
            <nav className="h-full w-1/2 overflow-y-auto px-8 py-6">
              <Link href="/" onClick={close} className={itemClass}>Home</Link>
              <Link href="/shop" onClick={close} className={itemClass}>Shop All</Link>
              <button onClick={() => setShowCats(true)} className={`${itemClass} flex w-full items-center justify-between`}>
                Categories <span aria-hidden>›</span>
              </button>
              <Link href="/about" onClick={close} className={itemClass}>About</Link>
              <Link href="/contact" onClick={close} className={itemClass}>Contact</Link>
              <div className="mt-8 border-t border-[#D8CDBA] pt-6">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="block py-2 text-sm uppercase tracking-[0.2em] text-[#4A3728] hover:text-[#B08D57]">WhatsApp</a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="block py-2 text-sm uppercase tracking-[0.2em] text-[#4A3728] hover:text-[#B08D57]">Instagram</a>
              </div>
            </nav>

            <div className="h-full w-1/2 overflow-y-auto px-8 py-6">
              <button onClick={() => setShowCats(false)} className="text-xs uppercase tracking-[0.2em] text-[#4A3728] hover:text-[#B08D57]">‹ Back</button>
              <h2 className="mt-4 text-2xl text-[#2B2622]">Categories</h2>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {categories.map((c) => (
                  <Link key={c.name} href={`/shop?category=${encodeURIComponent(c.name)}`} onClick={close} className="group">
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#E8DFD0]">
                      {c.image && <Image src={c.image} alt={c.name} fill sizes="200px" className="object-cover transition duration-500 group-hover:scale-105" />}
                    </div>
                    <p className="mt-2 text-sm text-[#2B2622]">{c.name}</p>
                  </Link>
                ))}
              </div>
              {categories.length === 0 && (
                <p className="mt-6 text-sm text-[#4A3728]">Add products with categories in /admin and they appear here.</p>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );

  return (
    <>
      <button onClick={() => setOpen(true)} className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#2B2622]" aria-label="Open menu">
        <span className="flex flex-col gap-[5px]">
          <span className="h-px w-5 bg-[#2B2622]" />
          <span className="h-px w-5 bg-[#2B2622]" />
          <span className="h-px w-5 bg-[#2B2622]" />
        </span>
        <span className="hidden sm:inline">Menu</span>
      </button>

      {mounted && createPortal(drawer, document.body)}
    </>
  );
}
