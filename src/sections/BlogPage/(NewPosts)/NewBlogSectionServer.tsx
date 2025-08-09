import { getPost } from "@/sanity/helpers";
import BlogSectionClient from "./NewBlog";

export default async function NewBlogSectionServer() {
  const data = await getPost(); // Runs only on server
  const posts = data?.NewPost || [];

  return <BlogSectionClient posts={posts} />;
}
