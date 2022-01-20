import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsOptional } from 'class-validator'
import { ObjectId } from 'mongoose'

export class CategoryDto {
  @ApiProperty({
    description: 'Title',
  })
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty({
    description: 'Description',
  })
  @IsNotEmpty()
  @IsString()
  description: string

  @ApiProperty({
    description: 'Guid link',
  })
  @IsNotEmpty()
  @IsString()
  guid: string

  @ApiProperty({
    description: 'Parent',
    type: String,
  })
  @IsOptional()
  @IsString()
  parent?: ObjectId
}
