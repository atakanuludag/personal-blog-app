import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class TokenDto {
  @ApiProperty({
    description: 'Access Token',
  })
  @IsNotEmpty()
  @IsString()
  access_token: string
}
