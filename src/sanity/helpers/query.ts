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

export const PRODUCT_QUERY =
  defineQuery(`*[_type == "product" && isNew == true]{
  _id,
  title,
  "slug": slug.current,
  mainImage,
  price,
  oldPrice,
  rating,
  reviewsCount,
  isNew,
  shippingInfo
} | order(_createdAt desc)[0...6]`);

export const ALL_PRODUCT_QUERY = defineQuery(`*[_type == "product"]{
  _id,
  title,
  "slug": slug.current,
  mainImage,
  price,
  oldPrice,
  rating,
  reviewsCount,
  shippingInfo,
  isNew
} | order(_createdAt desc)`);

export const productBySlugQuery = defineQuery(`
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    title,
    description,
    price,
    isNew,
    shippingInfo,
     mainImage,
    variants[]{
      label,
      price,
      extraInfo
    },
    specifications[]{
      key,
      value
    },
    "reviews": *[_type == "review" && references(^._id)] | order(_createdAt desc){
      _id,
      name,
      email,
      rating,
      comment,
      _createdAt
    }
  }
`);
