import { TypedObject } from "sanity";
import { BlogComment } from "./commentType";

export interface Image {
  asset: { url: string };
  alt?: string;
}

// Represents a Sanity image reference
export interface SanityImage {
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
    url?: string; // Added this
  };
  alt?: string;
}

// Represents a single block in Portable Text
export interface PortableTextSpan {
  _key: string;
  _type: "span";
  marks: string[];
  text: string;
}

export interface PortableTextBlock {
  _key: string;
  _type: string;
  style?: string;
  children: PortableTextSpan[];
  markDefs?: {
    _key: string;
    _type: string;
    key: string;
  }[];
}

// Full BlogPost type without any `any`
export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  category: {
    title: string;
    slug: { current: string };
  };
  author: {
    name: string;
    slug: { current: string };
    image?: SanityImage;
  };
  coverImage?: SanityImage;
  content?: TypedObject[];
  comments?: BlogComment[];
  _createdAt: string;
  _updatedAt: string;
}

export interface BlogPost2 {
  _id: string;
  title: string;
  slug: string; // Changed from { current: string } to match direct slug.current projection
  category: {
    name: string;
    slug: { current: string }; // Changed to match direct slug.current projection
  };
  author: {
    name: string;
    _id: string; // Added to match your query
  };
  coverImage?: {
    url: string;
    alt?: string;
  }; // Changed from SanityImage to match direct asset->url projection
  isFeatured?: boolean; // Added to match your query
  comments?: BlogComment[];
  _createdAt: string;
  _updatedAt: string;
}