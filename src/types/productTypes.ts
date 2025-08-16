import { Image } from "sanity";

export type Review = {
  _key: string; // Sanity's key for array items
  userId: string;
  reviewName: string;
  reviewRating: number; // 1–5 stars
  reviewComment: string;
  createdAt: string; // ISO date string
};

export type Variant = {
  _key: string;
  label?: string; // optional if product has sizes
  price: number;
  extraInfo: string;
};

export type Specifications = {
  key: string;
  value?: string; // optional if product has sizes
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
  variants?: Variant[];
  reviews?: Review[];
  collection?: string;
  specifications?: Specifications[];
  description?: string;
  price: number;
  oldPrice?: number;
}