import { ApiProperty } from '@nestjs/swagger'
import { ObjectId } from 'mongoose'

export class DashboardReportDto {
  @ApiProperty({
    description: 'Article count',
  })
  articleCount: number
}
