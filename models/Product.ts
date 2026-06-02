import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    stock: { type: Number, default: 0 },
    category: { type: String, default: "" },
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);
export default Product;