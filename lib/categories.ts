import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";

export type CategoryTile = { name: string; image: string };

// One single DB query that returns every category with one product image each.
// (Replaces the old pattern of 1 distinct() + 1 findOne() PER category.)
export async function getCategoryTiles(limit = 0): Promise<CategoryTile[]> {
  await dbConnect();

  const pipeline: any[] = [
    { $match: { category: { $nin: [null, ""] } } },
    { $group: { _id: "$category", image: { $max: { $ifNull: ["$image", ""] } } } },
    { $sort: { _id: 1 } },
  ];
  if (limit > 0) pipeline.push({ $limit: limit });
  pipeline.push({ $project: { _id: 0, name: "$_id", image: 1 } });

  const rows = await Product.aggregate(pipeline);
  return rows as CategoryTile[];
}
