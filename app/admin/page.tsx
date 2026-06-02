"use client";

import { useState } from "react";

const CLOUD_NAME = "dkeklsisy";        // from your Cloudinary dashboard
const UPLOAD_PRESET = "brass_uploads";  // the unsigned preset you created

export default function AdminPage() {
  const [form, setForm] = useState({
    name: "", slug: "", price: "", image: "", stock: "", category: "", description: "",
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: data,
    });
    const json = await res.json();
    setForm((prev) => ({ ...prev, image: json.secure_url }));
    setUploading(false);
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

          <label className="text-sm text-[#4A3728]">Product photo</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className={inputClass} />
          {uploading && <p className="text-sm text-[#4A3728]">Uploading image…</p>}
          {form.image && <img src={form.image} alt="preview" className="h-32 w-32 rounded object-cover" />}

          <input name="stock" value={form.stock} onChange={handleChange} type="number" placeholder="Stock quantity" className={inputClass} />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category (e.g. Diya)" className={inputClass} />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={3} className={inputClass} />
          <button type="submit" disabled={uploading} className="rounded bg-[#B08D57] px-4 py-3 font-medium text-white disabled:opacity-50">
            Add Product
          </button>
        </form>
        {message && <p className="mt-4 text-[#4A3728]">{message}</p>}
      </div>
    </main>
  );
}