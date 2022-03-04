import { Controller, Get } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'

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
  @Get('/dashboard')
  async list() {
    let response: IDashboardReport = {
      articleCount: 0,
    }
    response.articleCount = await this.service.getArticleCount()
    return response
  }
}
