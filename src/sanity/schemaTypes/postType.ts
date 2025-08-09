import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "blog",
  title: "Blog Post",
  type: "document",
  description:
    "Represents an individual blog post, including its title, slug, category, author, cover image, main content, and associated comments.",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description:
        "The main title of the blog post, displayed on listings and detail pages.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      description:
        "A unique, URL-friendly identifier for the blog post. Auto-generated from the title.",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      description:
        "The category this post belongs to, helping organize content for readers.",
      to: [{ type: "postCategory" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      description: "The author who wrote this blog post.",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      type: "image",
      title: "Cover Image",
      description: "The main image displayed at the top of the blog post.",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description:
            "A short description of the image for accessibility and SEO.",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      type: "array",
      title: "Content",
      description:
        "The main body of the blog post, which can include text, images, and image galleries.",
      of: [
        { type: "block" },
        {
          type: "image",
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              description:
                "A description of the image for accessibility and SEO.",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        {
          type: "object",
          name: "imageGalleryBlock",
          title: "Image Gallery Block",
          description:
            "A collection of images displayed together in a gallery format.",
          fields: [
            defineField({
              name: "images",
              title: "Gallery Images",
              type: "array",
              of: [
                {
                  type: "image",
                  options: { hotspot: true },
                  fields: [
                    {
                      name: "alt",
                      type: "string",
                      title: "Alt text",
                      description:
                        "A description for the gallery image, used for accessibility and SEO.",
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                },
              ],
              validation: (Rule) => Rule.min(2).max(10),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isNew",
      title: "New Post",
      type: "boolean",
      description:
        "Indicates whether this post is newly published. Useful for highlighting recent content on the site.",
      initialValue: false,
    }),

    defineField({
      name: "comments",
      type: "array",
      title: "Comments",
      description:
        "User-submitted comments for this post, including author info, content, and approval status.",
      of: [
        {
          type: "object",
          name: "embeddedComment",
          title: "Embedded Comment",
          description: "A single comment associated with the post.",
          fields: [
            defineField({
              name: "clerkUserId",
              type: "string",
              title: "Clerk User ID",
              description:
                "The unique identifier for the commenting user from Clerk authentication.",
              validation: (Rule) => Rule.required(),
              readOnly: true,
            }),
            defineField({
              name: "author",
              type: "object",
              title: "Author Info",
              description: "Profile information of the commenting user.",
              readOnly: true,
              fields: [
                defineField({
                  name: "profileImage",
                  type: "url",
                  title: "Profile Image URL",
                  description: "Link to the author's profile picture.",
                  readOnly: true,
                }),
                defineField({
                  name: "username",
                  type: "string",
                  title: "Username",
                  description: "The display name of the commenting user.",
                  readOnly: true,
                }),
              ],
            }),
            defineField({
              name: "content",
              type: "text",
              title: "Content",
              description: "The text of the comment.",
              validation: (Rule) => Rule.required().min(5).max(1000),
              readOnly: true,
            }),
            defineField({
              name: "postedAt",
              type: "datetime",
              title: "Posted At",
              description: "The date and time when the comment was posted.",
              initialValue: () => new Date().toISOString(),
              readOnly: true,
            }),
            defineField({
              name: "isApproved",
              type: "boolean",
              title: "Approved",
              description:
                "Indicates whether the comment is visible to the public.",
              initialValue: false,
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
      subtitle: "category.title",
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `Category: ${selection.subtitle || "Uncategorized"}`,
        media: selection.media,
      };
    },
  },
});
