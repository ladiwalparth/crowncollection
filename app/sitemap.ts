import type { MetadataRoute } from "next";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import { SITE_URL } from "@/lib/config";

// The sitemap rebuilds itself every hour, so new products
// are announced to Google automatically.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await dbConnect();
  const products = await Product.find({}, "slug updatedAt").lean();

  const productUrls = (products as any[]).map((p) => ({
    url: `${SITE_URL}/product/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
  }));

  return [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/shop`, lastModified: new Date() },
    { url: `${SITE_URL}/about`, lastModified: new Date() },
    { url: `${SITE_URL}/shipping-returns`, lastModified: new Date() },
    { url: `${SITE_URL}/contact`, lastModified: new Date() },
    ...productUrls,
  ];
}
