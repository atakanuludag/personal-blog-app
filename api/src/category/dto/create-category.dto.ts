import { IsNotEmpty, IsString, IsOptional } from 'class-validator'
import { ObjectId } from 'mongoose'

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  guid: string

  @IsOptional()
  @IsString()
  parent?: ObjectId
}
