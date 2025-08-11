import { client } from "../lib/client";
import { sanityFetch } from "../lib/live";
import {
  ALL_PRODUCT_QUERY,
  BLOG_DETAIL_QUERY,
  POST_QUERY,
  PRODUCT_QUERY,
  productBySlugQuery,
} from "./query";

export const getPost = async () => {
  try {
    const postData = await sanityFetch({
      query: POST_QUERY,
    });
    return postData?.data || [];
  } catch (error) {
    console.error("Error fetching Posts data:", error);
    return null;
  }
};

export async function fetchBlogDetail(slug: string) {
  const query = BLOG_DETAIL_QUERY(slug);
  return await client.fetch(query);
}

export async function getTopSaleProducts() {
  const query = PRODUCT_QUERY;
  return await client.fetch(query);
}

export async function getAllProducts() {
  const query = ALL_PRODUCT_QUERY;
  return await client.fetch(query);
}

export async function getProductBySlug(slug: string) {
  return await client.fetch(productBySlugQuery, { slug });
}
