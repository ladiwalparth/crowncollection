import Link from "next/link";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import { BRAND_NAME, WHATSAPP_NUMBER } from "@/lib/config";
import MenuDrawer from "./MenuDrawer";

export default async function Header() {
  await dbConnect();
  const names = (await Product.distinct("category")).filter(Boolean) as string[];
  const categories = await Promise.all(
    names.map(async (name) => {
      const sample: any = await Product.findOne({ category: name, image: { $ne: "" } }).lean();
      return { name, image: sample?.image ?? "" };
    })
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8DFD0] bg-[#F7F3EC]/95 backdrop-blur">
      <p className="bg-[#2B2622] px-6 py-2 text-center text-[11px] uppercase tracking-[0.25em] text-[#E8DFD0]">
        Handcrafted brass · Ships across India · Order on WhatsApp
      </p>
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-3 items-center px-4 sm:px-6">
        <div className="justify-self-start">
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-[0.2em] text-[#4A3728] hover:text-[#B08D57]">
            <span className="sm:hidden">Chat</span>
            <span className="hidden sm:inline">+ Contact Us</span>
          </a>
        </div>
        <Link href="/" className="justify-self-center whitespace-nowrap font-serif text-base uppercase tracking-[0.3em] text-[#2B2622] sm:text-lg">
          {BRAND_NAME}
        </Link>
        <div className="flex items-center gap-5 justify-self-end">
          <Link href="/shop" aria-label="Search products" className="text-[#2B2622] hover:text-[#B08D57]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          </Link>
          <MenuDrawer categories={categories} />
        </div>
      </div>
    </header>
  );
}