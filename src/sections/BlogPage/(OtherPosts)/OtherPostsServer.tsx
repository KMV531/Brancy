import { getPost } from "@/sanity/helpers";
import React from "react";
import OtherPostsClient from "./OtherPostsClient";

export default async function OtherPostsServer() {
  const data = await getPost(); // Runs only on server
  const posts = data?.otherPosts || [];

  return <OtherPostsClient posts={posts} />;
}
