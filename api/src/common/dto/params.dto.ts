import { IsString, IsNotEmpty } from 'class-validator'
import { ObjectId } from 'mongoose'

export class IdParamsDto {
  @IsNotEmpty()
  @IsString()
  id: ObjectId
}

export class GuidParamsDto {
  @IsNotEmpty()
  @IsString()
  guid: string
}
