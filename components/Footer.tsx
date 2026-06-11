import Link from "next/link";
import { BRAND_NAME, WHATSAPP_NUMBER, INSTAGRAM_URL } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-[#2B2622] px-6 py-10 text-[#E8DFD0]">
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-white">{BRAND_NAME}</p>
          <p className="mt-2 text-sm text-[#C9BBA4]">
            Handcrafted brass artifacts for your home, temple and gifting.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-white">Quick links</p>
          <div className="mt-2 flex flex-col gap-1 text-sm">
            <Link href="/" className="hover:text-[#B08D57]">Home</Link>
            <Link href="/shop" className="hover:text-[#B08D57]">Shop</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-white">Contact</p>
          <div className="mt-2 flex flex-col gap-1 text-sm">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#B08D57]">WhatsApp</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#B08D57]">Instagram</a>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-5xl border-t border-[#4A3728] pt-4 text-xs text-[#9C8F7A]">
        © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
      </p>
    </footer>
  );
}