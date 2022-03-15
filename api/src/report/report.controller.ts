import { Controller, Get, UseGuards } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { ReportService } from './report.service'
import { IDashboardReport } from './interfaces/IDashboardReport'
import { DashboardReportDto } from './dto/dashboard-report.dto'
import { DefaultException } from '../common/dto/default-exception.dto'

@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private readonly service: ReportService) {}

  @ApiOperation({
    summary: 'Get dashboard report.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: DashboardReportDto,
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Get('/dashboard')
  async list() {
    let response: IDashboardReport = {
      articleCount: 0,
      pageCount: 0,
      fileCount: 0,
    }
    response.articleCount = await this.service.getArticleCount()
    response.pageCount = await this.service.getPageCount()
    response.fileCount = await this.service.getFileCount()
    return response
  }
}
