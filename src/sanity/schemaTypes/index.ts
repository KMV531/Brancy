import { type SchemaTypeDefinition } from 'sanity'

import {PostCategoryType} from './PostCategoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import productType from './productType'
import { orderType } from './orderTypes'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [PostCategoryType, postType, authorType, productType, orderType],
}
