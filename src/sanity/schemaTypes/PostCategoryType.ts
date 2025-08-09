import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const PostCategoryType = defineType({
  name: 'postCategory',
  title: 'Post Category',
  type: 'document',
  icon: TagIcon,
  description:
    'Defines a category used to organize blog posts, making it easier for users to browse related content.',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'string',
      description: 'The display name of the category (e.g., "Skincare", "Wellness", "Makeup").',
    }),
  ],
})
