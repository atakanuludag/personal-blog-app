import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEnum, IsNumber, IsOptional } from 'class-validator'
import { OrderType } from '@/common/interfaces/enums'

export class ListQueryDto {
  @ApiProperty({
    description: 'Is paging ?.',
    required: false,
    type: Number,
    enum: [0, 1],
  })
  @IsOptional()
  @IsEnum([0, 1])
  @IsNumber()
  @Type(() => Number)
  paging: number

  @ApiProperty({
    description: 'Search text.',
    required: false,
  })
  @IsOptional()
  s: string

  @ApiProperty({
    description: 'Search object type.',
    required: false,
  })
  @IsOptional()
  sType: string

  @ApiProperty({
    description: 'Order object type.',
    required: false,
  })
  @IsOptional()
  order: string

  @ApiProperty({
    description: 'Order by',
    enum: [1, -1],
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  orderBy: OrderType

  @ApiProperty({
    description: 'Number of data to show on current page.',
    required: false,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  pageSize: number

  //todo: hepsine tip verilecek: @IsNumber()
  @ApiProperty({
    description: 'Current page.',
    required: false,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  page: number
}
