import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { getTopSaleProducts } from "@/sanity/helpers";
import { Product } from "@/types/productTypes";

export default async function TopSaleSection() {
  const products = await getTopSaleProducts();

  return (
    <section className="py-10 max-w-6xl mx-auto">
      <div className="flex flex-col items-center justify-center space-y-4 mb-8">
        <h1 className="text-2xl md:text-4xl lg:text-6xl text-gray-700">
          Top Sale
        </h1>
        <p className="max-w-[500px] text-center text-gray-500 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
          purus sit amet luctus venenatis
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <Link
            href={`/shop/${product.slug}`}
            key={product._id}
            className="group rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="relative">
              {product.isNew && (
                <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 text-sm rounded-full">
                  new
                </span>
              )}
              <Image
                src={urlFor(product.mainImage).width(400).height(400).url()}
                alt={product.title}
                width={400}
                height={400}
                className="w-full object-cover"
              />
            </div>

            <div className="p-4">
              {/* Rating + reviews */}
              <div className="flex items-center justify-between mb-2">
                {"★".repeat(product.rating || 0)}
                {"☆".repeat(5 - (product.rating || 0))}
                <span className="ml-2 text-sm text-gray-500">
                  {product.reviewsCount} reviews
                </span>
              </div>

              {/* Product name */}
              <Link href={`/shop/${product.slug}`}>
                <h3 className="font-semibold text-lg hover:text-red-500 text-gray-700">
                  {product.title}
                </h3>
              </Link>

              {/* Prices */}
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-gray-700 font-bold text-lg">
                  ${product.price.toFixed(2)}
                </span>
                {product.oldPrice && (
                  <span className="text-gray-400 line-through">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
