import { ApiProperty } from '@nestjs/swagger'

export class DashboardReportDto {
  @ApiProperty({
    description: 'Article count',
  })
  articleCount: number

  @ApiProperty({
    description: 'Page count',
  })
  pageCount: number

  @ApiProperty({
    description: 'File count',
  })
  fileCount: number
}
