import { getProductBySlug } from "@/sanity/helpers";
import HeroSection from "@/sections/ShopPage/(ProductDetailPage)/HeroSection";
import ProductDetailComponent from "@/sections/ShopPage/(ProductDetailPage)/ProductDetailComponent";
import SaleBanner from "@/sections/ShopPage/SaleBanner";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const {slug} = await params
  const product = await getProductBySlug(slug);

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  return (
    <>
    <HeroSection />
    <ProductDetailComponent product={product} />
    <SaleBanner />
    </>
  );
}