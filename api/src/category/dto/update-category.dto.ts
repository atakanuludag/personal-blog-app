import { PartialType } from '@nestjs/swagger'
import { CategoryDto } from '@/category/dto/category.dto'

export class UpdateCategoryDto extends PartialType(CategoryDto) {}
