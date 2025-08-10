import { Image } from "sanity";

export interface Product {
  _id: string;
  title: string;
  slug: string;
  mainImage: Image;
  isNew?: boolean;
  rating?: number;
  reviewsCount?: number;
  price: number;
  oldPrice?: number;
}
