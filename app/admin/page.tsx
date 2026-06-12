"use client";

import { useEffect, useState } from "react";
import ManageProducts from "./ManageProducts";

const CLOUD_NAME = "dkeklsisy";
const UPLOAD_PRESET = "brass_uploads";

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [form, setForm] = useState({
    name: "", slug: "", price: "", stock: "", category: "", description: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("adminKey");
    if (saved) { setAdminKey(saved); setUnlocked(true); }
  }, []);

  function unlock(e: React.FormEvent) {
    e.preventDefault();
    if (!adminKey.trim()) return;
    sessionStorage.setItem("adminKey", adminKey.trim());
    setUnlocked(true);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function uploadOne(file: File): Promise<string> {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: data,
    });
    const json = await res.json();
    return json.secure_url;
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setUploading(true);
    const urls = await Promise.all(files.map(uploadOne));
    setImages((prev) => [...prev, ...urls]);
    setUploading(false);
    e.target.value = "";
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((u) => u !== url));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Saving...");
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-secret": adminKey },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        images,
        image: images[0] ?? "",
      }),
    });
    if (res.status === 401) {
      setMessage("✗ Wrong admin key.");
      return;
    }
    if (res.ok) {
      setMessage("✓ Product added!");
      setForm({ name: "", slug: "", price: "", stock: "", category: "", description: "" });
      setImages([]);
    } else {
      setMessage("✗ Something went wrong.");
    }
  }

  const inputClass = "rounded-none border border-[#D8CDBA] bg-white px-4 py-3";

  if (!unlocked) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#F7F3EC] px-6">
        <form onSubmit={unlock} className="flex w-full max-w-sm flex-col gap-4">
          <h1 className="text-2xl text-[#2B2622]">Admin access</h1>
          <input type="password" value={adminKey} onChange={(e) => setAdminKey(e.target.value)} placeholder="Admin key" className={inputClass} />
          <button type="submit" className="bg-[#2B2622] px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white">Unlock</button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-[#F7F3EC] px-6 py-12">
      <div className="mx-auto max-w-lg">
        <h1 className="text-3xl text-[#2B2622]">Add a Product</h1>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Product name" required className={inputClass} />
          <input name="slug" value={form.slug} onChange={handleChange} placeholder="URL slug (e.g. brass-diya)" required className={inputClass} />
          <input name="price" value={form.price} onChange={handleChange} type="number" placeholder="Price (₹)" required className={inputClass} />

          <label className="text-sm text-[#4A3728]">
            Product photos — select 2 or more. First = main photo, second = hover photo, rest = gallery.
          </label>
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} className={inputClass} />
          {uploading && <p className="text-sm text-[#4A3728]">Uploading…</p>}

          {images.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {images.map((url, i) => (
                <div key={url} className="relative">
                  <img src={url} alt={`photo ${i + 1}`} className="h-24 w-20 object-cover" />
                  <span className="absolute left-0 top-0 bg-[#2B2622] px-1.5 py-0.5 text-[10px] uppercase text-white">
                    {i === 0 ? "Main" : i === 1 ? "Hover" : i + 1}
                  </span>
                  <button type="button" onClick={() => removeImage(url)} className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-red-600 text-xs text-white">×</button>
                </div>
              ))}
            </div>
          )}

          <input name="stock" value={form.stock} onChange={handleChange} type="number" placeholder="Stock quantity" className={inputClass} />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category (e.g. Diya)" className={inputClass} />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={3} className={inputClass} />
          <button type="submit" disabled={uploading || images.length === 0} className="bg-[#B08D57] px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white disabled:opacity-50">
            Add Product
          </button>
        </form>
        {message && <p className="mt-4 text-[#4A3728]">{message}</p>}
        <ManageProducts adminKey={adminKey} />
      </div>
    </main>
  );
}