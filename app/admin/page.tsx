"use client";

import { useState } from "react";

export default function AdminPage() {
  const [form, setForm] = useState({
    name: "", slug: "", price: "", image: "", stock: "", category: "", description: "",
  });
  const [message, setMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Saving...");
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock) }),
    });
    if (res.ok) {
      setMessage("✓ Product added!");
      setForm({ name: "", slug: "", price: "", image: "", stock: "", category: "", description: "" });
    } else {
      setMessage("✗ Something went wrong.");
    }
  }

  const inputClass = "rounded border border-[#D8CDBA] bg-white px-4 py-3";

  return (
    <main className="min-h-dvh bg-[#F7F3EC] px-6 py-12">
      <div className="mx-auto max-w-lg">
        <h1 className="text-3xl font-semibold text-[#2B2622]">Add a Product</h1>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Product name" required className={inputClass} />
          <input name="slug" value={form.slug} onChange={handleChange} placeholder="URL slug (e.g. brass-diya)" required className={inputClass} />
          <input name="price" value={form.price} onChange={handleChange} type="number" placeholder="Price (₹)" required className={inputClass} />
          <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className={inputClass} />
          <input name="stock" value={form.stock} onChange={handleChange} type="number" placeholder="Stock quantity" className={inputClass} />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category (e.g. Diya)" className={inputClass} />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={3} className={inputClass} />
          <button type="submit" className="rounded bg-[#B08D57] px-4 py-3 font-medium text-white">Add Product</button>
        </form>
        {message && <p className="mt-4 text-[#4A3728]">{message}</p>}
      </div>
    </main>
  );
}