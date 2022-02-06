import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { ESettings } from '../interfaces/Enum'
import { ValueType } from '../../common/interfaces/enums'

export class SettingsDto {
  @ApiProperty({
    description: 'Name',
    type: String,
    enum: ESettings,
  })
  @IsNotEmpty()
  @IsEnum(ESettings)
  name: ESettings

  @ApiProperty({
    description: 'Title',
  })
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty({
    description: 'Value',
  })
  @IsNotEmpty()
  @IsString()
  value: string

  @ApiProperty({
    description: 'Type',
    type: String,
    enum: ValueType,
  })
  @IsNotEmpty()
  @IsEnum(ValueType)
  type: string
}
