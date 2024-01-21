import { ApiProperty } from '@nestjs/swagger'
import { ObjectId } from 'mongoose'
import { ListQueryDto } from '@/common/dto/list-query.dto'
import { IsOptional } from 'class-validator'

export class FileListQueryDto extends ListQueryDto {
  @ApiProperty({
    description: 'Folder ID',
    type: String,
    required: false,
  })
  @IsOptional()
  folderId: ObjectId
}
