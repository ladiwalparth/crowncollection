import Link from "next/link";
import { BRAND_NAME, WHATSAPP_NUMBER, INSTAGRAM_URL } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-[#2B2622] px-6 pt-12 text-[#E8DFD0]">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-white">{BRAND_NAME}</p>
          <p className="mt-3 text-sm text-[#C9BBA4]">
            Handcrafted brass artifacts for your home, temple and gifting.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-white">Quick links</p>
          <div className="mt-3 flex flex-col gap-1 text-sm">
            <Link href="/" className="hover:text-[#B08D57]">Home</Link>
            <Link href="/shop" className="hover:text-[#B08D57]">Shop</Link>
            <Link href="/about" className="hover:text-[#B08D57]">About Us</Link>
            <Link href="/shipping-returns" className="hover:text-[#B08D57]">Shipping &amp; Returns</Link>
            <Link href="/contact" className="hover:text-[#B08D57]">Contact</Link>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-white">Contact</p>
          <div className="mt-3 flex flex-col gap-1 text-sm">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#B08D57]">WhatsApp</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#B08D57]">Instagram</a>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl border-t border-[#4A3728] pt-4 text-xs text-[#9C8F7A]">
        © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
      </p>

      <p aria-hidden="true" className="mx-auto mt-8 max-w-full select-none whitespace-nowrap pb-4 text-center font-serif uppercase leading-none tracking-[0.02em] text-[#F7F3EC] text-[clamp(1.3rem,7.5vw,8rem)]">
        {BRAND_NAME}
      </p>
    </footer>
  );
}
