import { client } from "../lib/client";
import { sanityFetch } from "../lib/live";
import { BLOG_DETAIL_QUERY, POST_QUERY } from "./query";

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