import { IsNotEmpty, IsString, IsEmail } from 'class-validator'

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  userName: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  surname: string
}
