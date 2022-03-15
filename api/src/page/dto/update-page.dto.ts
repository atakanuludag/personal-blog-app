import { PartialType } from '@nestjs/swagger'
import { PageDto } from './page.dto'

export class UpdatePageDto extends PartialType(PageDto) {}
