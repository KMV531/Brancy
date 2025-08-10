import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Product Title",
      type: "string",
      description: "The name of the product as it will appear on the website.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "URL-friendly identifier for the product, usually based on the title.",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "collection",
      title: "Collection / Category",
      type: "string",
      description:
        "Category or collection the product belongs to (e.g., Premium Collection, Skincare).",
    }),
    defineField({
      name: "isNew",
      title: "Is New Product?",
      type: "boolean",
      description:
        "Mark this as true if the product is new and should display a 'New' badge.",
      initialValue: false,
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      description:
        "Primary image displayed for the product on listings and detail page.",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      description:
        "Additional images of the product for a gallery or carousel on the detail page.",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "rating",
      title: "Average Rating",
      type: "number",
      description: "Average customer rating from 0 to 5 stars.",
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: "reviewsCount",
      title: "Reviews Count",
      type: "number",
      description: "Total number of customer reviews for this product.",
      initialValue: 0,
    }),
    defineField({
      name: "variants",
      title: "Product Variants",
      type: "array",
      description:
        "Different options for the product (e.g., size, volume) with their own prices.",
      of: [
        defineField({
          name: "variant",
          title: "Variant",
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              description: "Variant label (e.g., 15ml bottle).",
            },
            {
              name: "price",
              title: "Price",
              type: "number",
              description: "Price for this variant.",
            },
            {
              name: "extraInfo",
              title: "Extra Info",
              type: "string",
              description: "Optional note (e.g., 'extra 25%').",
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "price",
      title: "Current Price",
      type: "number",
      description:
        "Current selling price of the product (for default variant or no variants).",
    }),
    defineField({
      name: "oldPrice",
      title: "Old Price",
      type: "number",
      description: "Previous price of the product for showing discounts.",
    }),
    defineField({
      name: "shippingInfo",
      title: "Shipping Info",
      type: "string",
      description: "Short note about shipping origin, fees, or delivery times.",
    }),
    defineField({
      name: "specifications",
      title: "Specifications",
      type: "array",
      description:
        "Technical or physical details of the product (weight, dimensions, materials, etc.).",
      of: [
        defineField({
          name: "spec",
          title: "Specification",
          type: "object",
          fields: [
            {
              name: "key",
              title: "Key",
              type: "string",
              description: "Specification name (e.g., Weight).",
            },
            {
              name: "value",
              title: "Value",
              type: "string",
              description: "Specification value (e.g., 250g).",
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description:
        "Main descriptive text for the product. Supports basic formatting.",
    }),
    defineField({
      name: "reviews",
      title: "Customer Reviews",
      type: "array",
      description:
        "List of reviews for this product. Only verified buyers can add reviews.",
      of: [
        defineField({
          name: "review",
          title: "Review",
          type: "object",
          fields: [
            {
              name: "userName",
              title: "User Name",
              type: "string",
              description: "Name of the reviewer.",
            },
            {
              name: "userId",
              title: "User ID",
              type: "string",
              description: "Internal ID of the user (to verify purchases).",
            },
            {
              name: "rating",
              title: "Rating",
              type: "number",
              description: "Rating from 1 to 5 stars.",
              validation: (Rule) => Rule.min(1).max(5),
            },
            {
              name: "comment",
              title: "Comment",
              type: "text",
              description: "Customer's feedback on the product.",
            },
            {
              name: "date",
              title: "Review Date",
              type: "datetime",
              description: "When the review was posted.",
            },
          ],
        }),
      ],
    }),
  ],
});
