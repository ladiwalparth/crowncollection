import Link from "next/link";
import { BRAND_NAME, WHATSAPP_NUMBER } from "@/lib/config";
import { getCategoryTiles } from "@/lib/categories";
import MenuDrawer from "./MenuDrawer";
import SavedDrawer from "./SavedDrawer";

export default async function Header() {
  const categories = await getCategoryTiles();

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8DFD0]">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#F7F3EC]/95 backdrop-blur" />

      <p className="bg-[#2B2622] px-4 py-2 text-center text-[10px] uppercase tracking-[0.18em] text-[#E8DFD0] sm:px-6 sm:text-[11px] sm:tracking-[0.25em]">
        Handcrafted brass · Ships across India · Order on WhatsApp
      </p>

      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 sm:grid-cols-3 sm:gap-0 sm:px-6">
        <div className="justify-self-start">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="flex items-center text-[#4A3728] hover:text-[#B08D57]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5 sm:hidden"
              aria-hidden="true"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span className="hidden text-xs uppercase tracking-[0.2em] sm:inline">+ Contact Us</span>
          </a>
        </div>

        <Link
          href="/"
          className="justify-self-center whitespace-nowrap text-center font-serif text-xs uppercase tracking-[0.12em] text-[#2B2622] sm:text-lg sm:tracking-[0.3em]"
        >
          {BRAND_NAME}
        </Link>

        <div className="flex items-center gap-4 justify-self-end sm:gap-5">
          <Link href="/shop" aria-label="Search products" className="text-[#2B2622] hover:text-[#B08D57]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </Link>
          <SavedDrawer />
          <MenuDrawer categories={categories} />
        </div>
      </div>
    </header>
  );
}
