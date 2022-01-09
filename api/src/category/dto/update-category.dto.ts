import { PartialType } from '@nestjs/swagger'
import { CategoryDto } from './category.dto'

export class UpdateCategoryDto extends PartialType(CategoryDto) {}
