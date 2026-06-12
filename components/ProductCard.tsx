import Image from "next/image";
import Link from "next/link";
import { productImages } from "@/lib/images";
import SaveButton from "@/components/SaveButton";

export default function ProductCard({ product }: { product: any }) {
  const imgs = productImages(product);
  const main = imgs[0];

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#E8DFD0]">
        {main && (
          <Image src={main} alt={product.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
        )}
        <SaveButton item={{ id: String(product._id), slug: product.slug, name: product.name, price: product.price, image: main ?? "" }} />
      </div>
      <h3 className="mt-3 text-sm text-[#2B2622]">{product.name}</h3>
      <p className="mt-1 text-sm text-[#4A3728]">₹{product.price}</p>
    </Link>
  );
}