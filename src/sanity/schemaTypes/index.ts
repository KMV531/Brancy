import { type SchemaTypeDefinition } from 'sanity'

import {PostCategoryType} from './PostCategoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import productType from './productType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [PostCategoryType, postType, authorType, productType],
}
