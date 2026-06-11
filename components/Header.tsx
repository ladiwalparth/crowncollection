import Link from "next/link";
import { BRAND_NAME, WHATSAPP_NUMBER } from "@/lib/config";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E8DFD0] bg-[#F7F3EC]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-wide text-[#2B2622]">
          {BRAND_NAME}
        </Link>
        <nav className="flex items-center gap-5">
          <Link href="/shop" className="text-sm text-[#4A3728] hover:text-[#B08D57]">
            Shop
          </Link>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#25D366] px-4 py-2 text-sm font-medium text-white hover:bg-[#1FB857]">
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}