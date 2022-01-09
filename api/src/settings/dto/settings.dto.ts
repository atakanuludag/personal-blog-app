import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { ESettings } from '../interfaces/Enum'

export class SettingsDto {
  @ApiProperty({
    description: 'Name',
    type: String,
  })
  @IsNotEmpty()
  @IsEnum(ESettings)
  name: ESettings

  @ApiProperty({
    description: 'Value',
  })
  @IsNotEmpty()
  @IsString()
  value: string
}
