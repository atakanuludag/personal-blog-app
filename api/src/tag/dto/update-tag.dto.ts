import { PartialType } from '@nestjs/swagger'
import { TagDto } from '@/tag/dto/tag.dto'

export class UpdateTagDto extends PartialType(TagDto) {}
