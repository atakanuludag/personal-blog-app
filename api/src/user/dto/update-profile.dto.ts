import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEmail, IsOptional } from 'class-validator'

export class UpdateProfileDto {
  @ApiProperty({
    description: 'Username',
  })
  @IsOptional()
  @IsString()
  userName: string

  @ApiProperty({
    description: 'E-Mail',
  })
  @IsOptional()
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'Password',
  })
  @IsOptional()
  @IsString()
  password: string

  @ApiProperty({
    description: 'Firstname',
  })
  @IsOptional()
  @IsString()
  name: string

  @ApiProperty({
    description: 'Surname',
  })
  @IsOptional()
  @IsString()
  surname: string
}
