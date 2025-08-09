import { defineQuery } from "next-sanity";

export const POST_QUERY = defineQuery(`
{
"NewPost": *[_type == "blog" && isNew == true] | order(_createdAt desc) [0...6] {
  title,
  slug,
  coverImage,
  category->{title},
  author->{name},
  _createdAt
},
  "otherPosts": *[_type == "blog" && isNew != true] | order(_createdAt desc) {
    title,
    slug,
    coverImage,
    category->{title},
    author->{name, image},
    _createdAt
  },
}
`);

export const BLOG_DETAIL_QUERY = (slug: string) =>
  defineQuery(`
{
  "post": *[_type == "blog" && slug.current == "${slug}"][0]{
     _id,
    title,
    slug,
    _createdAt,
    coverImage,
    category->{title},
    author->{name, image},
    content,
    comments[isApproved == true]{
      clerkUserId,
      content,
      postedAt,
      author {
        name,
        username,
        profileImage
      }
    }
  }
}
`);