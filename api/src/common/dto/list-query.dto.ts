import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsEnum } from 'class-validator'
import { OrderBy } from '../interfaces/query.interface'

export class ListQueryDto {
  @ApiProperty({
    description: 'Search text.',
  })
  @IsOptional()
  @IsString()
  s: string

  @ApiProperty({
    description: 'Search object type.',
  })
  @IsOptional()
  @IsString()
  sType: string

  @ApiProperty({
    description: 'Order object type.',
  })
  @IsOptional()
  @IsString()
  order: string

  @ApiProperty({
    description: 'Order by: ASC, DESC',
  })
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy: OrderBy

  @ApiProperty({
    description: 'Number of data to show on current page.',
  })
  @IsOptional()
  @IsString()
  pageSize: number

  @ApiProperty({
    description: 'Current page.',
  })
  @IsOptional()
  @IsString()
  page: number
}
