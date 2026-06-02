import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
  await dbConnect();
  const products = await Product.find().lean();
  return NextResponse.json({ count: products.length, products });
}