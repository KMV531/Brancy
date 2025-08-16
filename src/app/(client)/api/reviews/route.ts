import { client, writeClient } from "@/sanity/lib/client";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type ReviewRequestBody = {
  productId: string;
  userId: string;
  userName: string;
  email: string;
  rating: number;
  comment: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: ReviewRequestBody = await request.json();
    const { productId, userId, userName, email, rating, comment } = body;

    if (!productId || !userId || !userName || !email || !rating || !comment) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already reviewed this product
    const existingReviewQuery = `
      *[_type == "product" && _id == $productId && reviews[userId == $userId]][0]{
        _id
      }
    `;
    const alreadyReviewed = await client.fetch(existingReviewQuery, {
      productId,
      userId,
    });
    if (alreadyReviewed) {
      return NextResponse.json(
        { message: "You have already reviewed this product" },
        { status: 400 }
      );
    }

    // Check if user purchased the product
    const purchaseCheckQuery = `
      *[_type == "order" && userId == $userId && $productId in products[]->_id][0]{
        _id
      }
    `;
    const purchase = await client.fetch(purchaseCheckQuery, {
      userId,
      productId,
    });
    if (!purchase) {
      return NextResponse.json(
        { message: "You must purchase the product before reviewing" },
        { status: 403 }
      );
    }

    // Prepare new review object
    const newReview = {
      _key: crypto.randomUUID(), // required by your Review type
      userId,
      reviewName: userName,
      reviewRating: rating,
      reviewComment: comment,
      createdAt: new Date().toISOString(),
    };

    // Append review to product document
    await writeClient
      .patch(productId)
      .setIfMissing({ reviews: [] })
      .append("reviews", [newReview])
      .commit();

    // Update product rating and reviewsCount
    const product = await client.fetch(
      `*[_type == "product" && _id == $productId][0]{reviewsCount, rating}`,
      { productId }
    );

    const updatedReviewsCount = (product?.reviewsCount || 0) + 1;
    const currentAvgRating = product?.rating || 0;
    const newAvgRating =
      (currentAvgRating * (updatedReviewsCount - 1) + rating) /
      updatedReviewsCount;

    await writeClient
      .patch(productId)
      .set({
        reviewsCount: updatedReviewsCount,
        rating: newAvgRating,
      })
      .commit();

    return NextResponse.json(
      { message: "Review submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
