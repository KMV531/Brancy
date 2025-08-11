"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { urlFor } from "@/sanity/lib/image";
import { useUser } from "@clerk/nextjs";
import { useCartStore } from "@/store/useCartSTore";

export default function ProductDetail({ product }: { product: any }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const { user, isSignedIn } = useUser();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  const [activeTab, setActiveTab] = useState("specs");

  const [reviewName, setReviewName] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviews, setReviews] = useState(product.reviews || []);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && reviews.some((r: any) => r.userId === user.id)) {
      setHasReviewed(true);
    }
  }, [user, reviews]);

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      title: product.title,
      image: product.image,
      price: selectedVariant?.price || product.price,
      quantity,
    });
    toast.success("Added to cart!");
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reviewComment || !reviewName || reviewRating === 0) {
      toast.error("Please fill out all review fields");
      return;
    }

    if (!isSignedIn || !user) {
      toast.error("You must be signed in to submit a review.");
      return;
    }

    if (hasReviewed) {
      toast.error("You have already reviewed this product.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          userId: user.id,
          userName: reviewName,
          email: user.emailAddresses[0]?.emailAddress,
          comment: reviewComment,
          rating: reviewRating,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to submit review");
        return;
      }

      toast.success("Review submitted! Awaiting approval.");

      // Update local reviews state immediately
      setReviews((prev: any) => [
        ...prev,
        {
          userId: user.id,
          userName: reviewName,
          comment: reviewComment,
          rating: reviewRating,
          date: new Date().toISOString(),
        },
      ]);

      setHasReviewed(true);
      setReviewComment("");
      setReviewName("");
      setReviewRating(0);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      {/* Product Image */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        <Image
          src={urlFor(product?.mainImage).url()}
          alt={product.title}
          fill
          className="object-contain"
        />
        {product.isNew && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-sm px-2 py-1 rounded">
            New
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col space-y-6">
        <h2 className="text-sm capitalize font-semibold text-gray-500">
          {product.collection || "Premium collection"}
        </h2>
        <h1 className="text-2xl md:text-4xl lg:text-6xl">{product.title}</h1>

        {/* Rating */}
        <div className="flex items-center gap-2">
          {"⭐".repeat(5)}
          <span className="text-sm text-gray-500">
            {product.reviews?.length || 0} reviews
          </span>
        </div>

        <hr />

        {/* Variants */}
        <div className="space-y-2">
          {product.variants?.map((variant: any, i: number) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="variant"
                checked={selectedVariant?.label === variant.label}
                onChange={() => setSelectedVariant(variant)}
              />
              {variant.label} - <strong>${variant.price.toFixed(2)}</strong>
            </label>
          ))}
        </div>

        <hr />

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 border border-red-500 rounded-full w-max px-3 py-1">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
            -
          </button>
          <span>{quantity.toString().padStart(2, "0")}</span>
          <button onClick={() => setQuantity((q) => q + 1)}>+</button>
        </div>

        <hr />

        {/* Shipping */}
        {product.shippingInfo && (
          <p className="text-gray-500 text-sm">{product.shippingInfo}</p>
        )}

        {/* Price + Add to Cart */}
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-bold">
            ${(selectedVariant?.price || product.price).toFixed(2)}
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-red-500 rounded-full text-white px-6 py-3 hover:bg-red-600 cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="col-span-2 mt-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="specs" className="cursor-pointer">
              Specification
            </TabsTrigger>
            <TabsTrigger value="reviews" className="cursor-pointer">
              Review
            </TabsTrigger>
          </TabsList>

          {/* Specifications Tab */}
          <TabsContent value="specs" className="p-4">
            {product.specifications?.map((spec: any, i: number) => (
              <p key={i}>
                <strong>{spec.key}:</strong> {spec.value}
              </p>
            ))}
            <p className="mt-4 text-gray-600">{product.description}</p>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="p-4 space-y-6">
            {/* Existing Reviews */}
            {reviews.length ? (
              reviews.map((review: any, i: number) => (
                <div key={i} className="border p-3 rounded">
                  <p className="font-semibold">{review.userName}</p>
                  <p className="text-sm text-gray-500">{review.comment}</p>
                  <p>Rating: {"⭐".repeat(review.rating)}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet</p>
            )}

            {/* Review Form */}
            {hasReviewed ? (
              <p className="text-red-600 font-semibold">
                You have already reviewed this product.
              </p>
            ) : (
              <form
                onSubmit={handleSubmitReview}
                className="space-y-4 border-t pt-4 max-w-5xl mx-auto"
              >
                <textarea
                  placeholder="Enter your feedback"
                  className="w-full border p-2 rounded resize-none"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  disabled={loading}
                />

                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border p-2 rounded"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                />

                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className={
                        reviewRating >= star ? "text-red-500" : "text-gray-300"
                      }
                      disabled={loading}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
