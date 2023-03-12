import { ApiProperty } from '@nestjs/swagger'
import { ListQueryDto } from '@/common/dto/list-query.dto'
import { IsOptional, IsString } from 'class-validator'

export class FileListQueryDto extends ListQueryDto {
  @ApiProperty({
    description: 'Folder Path',
    required: false,
  })
  @IsOptional()
  @IsString()
  path: string
}
