"use client";

import { useEffect, useState } from "react";

export default function ManageProducts({ adminKey }: { adminKey: string }) {
  const [products, setProducts] = useState<any[]>([]);
  const [prices, setPrices] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");

  async function load() {
    const res = await fetch("/api/products");
    const json = await res.json();
    setProducts(json.products);
    const next: Record<string, string> = {};
    json.products.forEach((p: any) => {
      next[p._id] = String(p.price);
    });
    setPrices(next);
  }

  useEffect(() => {
    load();
  }, []);

  async function savePrice(id: string) {
    setStatus("Saving…");
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-admin-secret": adminKey },
      body: JSON.stringify({ price: Number(prices[id]) }),
    });
    setStatus(res.ok ? "✓ Price updated" : "✗ Failed — check admin key");
    if (res.ok) load();
  }

  async function removeProduct(id: string) {
    if (!confirm("Delete this product permanently?")) return;
    setStatus("Deleting…");
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: { "x-admin-secret": adminKey },
    });
    setStatus(res.ok ? "✓ Deleted" : "✗ Failed — check admin key");
    if (res.ok) load();
  }

  return (
    <section className="mt-14">
      <h2 className="text-2xl text-[#2B2622]">Manage Products</h2>
      {status && <p className="mt-2 text-sm text-[#4A3728]">{status}</p>}
      <div className="mt-6 flex flex-col gap-3">
        {products.map((p) => (
          <div key={p._id} className="flex items-center gap-3 border border-[#D8CDBA] bg-white p-3">
            {p.image ? (
              <img src={p.image} alt={p.name} className="h-14 w-12 object-cover" />
            ) : (
              <div className="h-14 w-12 bg-[#E8DFD0]" />
            )}
            <p className="flex-1 text-sm text-[#2B2622]">{p.name}</p>
            <input type="number" value={prices[p._id] ?? ""} onChange={(e) => setPrices({ ...prices, [p._id]: e.target.value })} className="w-24 border border-[#D8CDBA] px-2 py-1.5 text-sm" />
            <button onClick={() => savePrice(p._id)} className="bg-[#2B2622] px-3 py-1.5 text-xs uppercase tracking-wide text-white">Save</button>
            <button onClick={() => removeProduct(p._id)} className="px-2 py-1.5 text-xs uppercase tracking-wide text-red-600">Delete</button>
          </div>
        ))}
        {products.length === 0 && <p className="text-sm text-[#4A3728]">No products yet.</p>}
      </div>
    </section>
  );
}