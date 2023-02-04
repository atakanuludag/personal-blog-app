import { PartialType } from '@nestjs/swagger'
import { PageDto } from '@/page/dto/page.dto'

export class UpdatePageDto extends PartialType(PageDto) {}
