import { ApiProperty } from '@nestjs/swagger'
import { OrderBy } from '../interfaces/query.interface'

export class ListQueryDto {
  @ApiProperty({
    description: 'Search text.',
    required: false,
  })
  s: string

  @ApiProperty({
    description: 'Search object type.',
    required: false,
  })
  sType: string

  @ApiProperty({
    description: 'Order object type.',
    required: false,
  })
  order: string

  @ApiProperty({
    description: 'Order by',
    enum: ['asc', 'desc'],
    required: false,
  })
  orderBy: OrderBy

  @ApiProperty({
    description: 'Number of data to show on current page.',
    required: false,
  })
  pageSize: number

  @ApiProperty({
    description: 'Current page.',
    required: false,
  })
  page: number
}
