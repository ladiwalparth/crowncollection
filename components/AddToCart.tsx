"use client";

import { useState } from "react";
import { useCart, type CartItem } from "@/store/cart";

export default function AddToCart({ product }: { product: Omit<CartItem, "qty"> }) {
  const addItem = useCart((s) => s.addItem);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleAdd}
      className="mt-6 w-full rounded bg-[#B08D57] px-6 py-3 font-medium text-white sm:w-auto"
    >
      {added ? "✓ Added to cart" : "Add to cart"}
    </button>
  );
}