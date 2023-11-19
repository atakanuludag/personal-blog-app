import { ApiProperty } from '@nestjs/swagger'
import { ObjectId } from 'mongoose'
import { ListQueryDto } from '@/common/dto/list-query.dto'
import { IsMongoId, IsOptional } from 'class-validator'

export class ArticleListQueryDto extends ListQueryDto {
  @ApiProperty({
    description: 'Category ID',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  category: ObjectId

  @ApiProperty({
    description: 'Tag ID',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  tag: ObjectId
}
