import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";

function authorized(request: Request) {
  const secret = request.headers.get("x-admin-secret");
  return Boolean(secret && secret === process.env.ADMIN_SECRET);
}

export async function GET() {
  await dbConnect();
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ count: products.length, products });
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await dbConnect();
  const data = await request.json();
  const product = await Product.create(data);
  revalidatePath("/", "layout");
  return NextResponse.json(product, { status: 201 });
}
