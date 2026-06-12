import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";

function authorized(request: Request) {
  const secret = request.headers.get("x-admin-secret");
  return Boolean(secret && secret === process.env.ADMIN_SECRET);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await dbConnect();
  const data = await request.json();
  const updated = await Product.findByIdAndUpdate(id, data, { new: true });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await dbConnect();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}