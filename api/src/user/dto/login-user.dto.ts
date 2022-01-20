import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginUserDto {
  @ApiProperty({
    description: 'Username',
  })
  @IsNotEmpty()
  @IsString()
  username: string

  @ApiProperty({
    description: 'Password',
  })
  @IsNotEmpty()
  @IsString()
  password: string
}
