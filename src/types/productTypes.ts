import { Image } from "sanity";

export type Review = {
  _key: string; // Sanity's key for array items
  reviewerName: string;
  rating: number; // 1–5 stars
  comment: string;
  createdAt: string; // ISO date string
};

export type Variant = {
  _key: string;
  label?: string; // optional if product has sizes
  price: number;
  extraInfo: string;
};

export interface Product {
  _id: string;
  title: string;
  slug: string;
  mainImage: Image;
  isNew?: boolean;
  rating?: number;
  shippingInfo?: string;
  reviewsCount?: number;
  price: number;
  oldPrice?: number;
}
