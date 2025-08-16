import { defineField, defineType } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({
      name: "transactionId",
      title: "Transaction ID",
      type: "string",
    }),
    defineField({
      name: "transactionRef",
      title: "Merchant Transaction Reference",
      type: "string",
    }),
    defineField({ name: "resourceId", title: "Resource ID", type: "string" }),
    defineField({
      name: "partnerTransactionId",
      title: "Partner Transaction ID",
      type: "string",
    }),
    defineField({
      name: "clerkUserId",
      title: "Clerk User ID",
      type: "string",
    }),
    defineField({
      name: "paymentStatus",
      title: "Payment Status",
      type: "string",
      options: { list: ["pending", "completed", "failed"] },
    }),
    defineField({
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
    }),
    defineField({ name: "amount", title: "Amount", type: "number" }),
    defineField({ name: "currency", title: "Currency", type: "string" }),
    {
      name: "customer",
      title: "Customer Info",
      type: "object",
      fields: [
        defineField({ name: "firstName", title: "First Name", type: "string" }),
        defineField({ name: "lastName", title: "Last Name", type: "string" }),
        defineField({ name: "company", title: "Company", type: "string" }),
        defineField({ name: "email", title: "Email", type: "string" }),
        defineField({ name: "phone", title: "Phone", type: "string" }),
        defineField({
          name: "address",
          title: "Street Address",
          type: "string",
        }),
        defineField({ name: "district", title: "District", type: "string" }),
        defineField({ name: "country", title: "Country", type: "string" }),
        defineField({ name: "postcode", title: "Postcode", type: "string" }),
      ],
    },
    defineField({
      name: "items",
      title: "Ordered Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Product Name",
              type: "string",
            }),
            defineField({
              name: "variantLabel",
              title: "Variant Label",
              type: "string",
            }),
            defineField({ name: "price", title: "Price", type: "number" }),
            defineField({
              name: "quantity",
              title: "Quantity",
              type: "number",
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: ["pending", "paid", "shipped", "delivered", "cancelled"],
      },
      initialValue: "pending",
    }),
    defineField({ name: "createdAt", title: "Created At", type: "datetime" }),
  ],
  preview: {
    select: {
      title: "transactionRef",
      subtitle: "customer.email",
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `Customer: ${selection.subtitle}`,
      };
    },
  },
});
