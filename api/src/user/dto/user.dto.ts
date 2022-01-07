import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEmail } from 'class-validator'

export class UserDto {
  @ApiProperty({
    description: 'Username',
  })
  @IsNotEmpty()
  @IsString()
  userName: string

  @ApiProperty({
    description: 'E-Mail',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'Password',
  })
  @IsNotEmpty()
  @IsString()
  password: string

  @ApiProperty({
    description: 'Firstname',
  })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({
    description: 'Surname',
  })
  @IsNotEmpty()
  @IsString()
  surname: string
}
