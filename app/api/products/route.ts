import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
  await dbConnect();
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ count: products.length, products });
}

export async function POST(request: Request) {
  await dbConnect();
  const data = await request.json();
  const product = await Product.create(data);
  return NextResponse.json(product, { status: 201 });
}