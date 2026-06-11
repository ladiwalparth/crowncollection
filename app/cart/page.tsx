"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/cart";

export default function CartPage() {
  const { items, removeItem, updateQty, total } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // avoid a mismatch between server and saved cart

  if (items.length === 0) {
    return (
      <main className="min-h-dvh bg-[#F7F3EC] px-6 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold text-[#2B2622]">Your cart</h1>
          <p className="mt-4 text-[#4A3728]">Your cart is empty.</p>
          <Link href="/shop" className="mt-4 inline-block text-[#B08D57]">Browse products →</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-[#F7F3EC] px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold text-[#2B2622]">Your cart</h1>
        <div className="mt-8 flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 rounded-lg bg-white p-4">
              <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded bg-[#E8DFD0]">
                {item.image && <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />}
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-medium text-[#2B2622]">{item.name}</h2>
                <p className="text-[#B08D57]">₹{item.price}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} className="h-7 w-7 rounded border border-[#D8CDBA]">−</button>
                  <span className="w-6 text-center text-sm">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} className="h-7 w-7 rounded border border-[#D8CDBA]">+</button>
                </div>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-sm text-[#4A3728] underline">Remove</button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-[#D8CDBA] pt-4">
          <span className="text-lg text-[#2B2622]">Total</span>
          <span className="text-lg font-semibold text-[#2B2622]">₹{total()}</span>
        </div>

        <Link href="/checkout" className="mt-6 block rounded bg-[#B08D57] px-6 py-3 text-center font-medium text-white">
          Proceed to checkout
        </Link>
      </div>
    </main>
  );
}