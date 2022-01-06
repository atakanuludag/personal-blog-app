import { IsNotEmpty, IsString } from 'class-validator'

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  guid: string
}
