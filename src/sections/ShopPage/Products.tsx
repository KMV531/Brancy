import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { getAllProducts } from "@/sanity/helpers";
import { Product } from "@/types/productTypes";

export default async function AllProducts({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  // Fetch all products at once
  const allProducts = await getAllProducts();

  // Pagination configuration
  const itemsPerPage = 9;
  const currentPage = parseInt(searchParams?.page || "1");
  const totalPages = Math.ceil(allProducts?.length / itemsPerPage);

  // Get products for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const products = allProducts.slice(startIndex, endIndex);

  return (
    <section className="py-10 max-w-6xl mx-auto px-5 lg:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <Link
            href={`/shop/${product.slug}`}
            key={product._id}
            className="group rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
          >
            {/* Your existing product card JSX */}
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
              <div className="flex items-center justify-between mb-2">
                {"★".repeat(product.rating || 0)}
                {"☆".repeat(5 - (product.rating || 0))}
                <span className="ml-2 text-sm text-gray-500">
                  {product.reviewsCount} reviews
                </span>
              </div>

              <Link href={`/shop/${product.slug}`}>
                <h3 className="font-semibold text-lg hover:text-red-500 text-gray-700">
                  {product.title}
                </h3>
              </Link>

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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <nav className="flex items-center gap-1">
            {currentPage > 1 && (
              <Link
                href={`?page=${currentPage - 1}`}
                className="px-3 py-1 rounded hover:bg-gray-100"
              >
                &lt;
              </Link>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`?page=${page}`}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-red-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {page}
              </Link>
            ))}

            {currentPage < totalPages && (
              <Link
                href={`?page=${currentPage + 1}`}
                className="px-3 py-1 rounded hover:bg-gray-100"
              >
                &gt;
              </Link>
            )}
          </nav>
        </div>
      )}
    </section>
  );
}
