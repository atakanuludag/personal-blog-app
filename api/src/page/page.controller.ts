import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Patch,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'
import { PageDto } from '@/page/dto/page.dto'
import { UpdatePageDto } from '@/page/dto/update-page.dto'
import { ListResultDto } from '@/common/dto/list-result.dto'
import { GuidParamsDto, IdParamsDto } from '@/common/dto/params.dto'
import { ListQueryDto } from '@/common/dto/list-query.dto'
import { DefaultException } from '@/common/dto/default-exception.dto'
import { PageService } from '@/page/page.service'
import { ArticleService } from '@/article/article.service'
import { QueryHelper } from '@/common/helpers/query.helper'
import { PageMessage } from '@/common/messages'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { IpAddress } from '@/common/decorators/ip.decorator'
import { IPage } from '@/page/interfaces/page.interface'

@ApiTags('Page')
@Controller('page')
export class PageController {
  constructor(
    private readonly service: PageService,
    private readonly articleService: ArticleService,
    private readonly pageMessage: PageMessage,
    private readonly queryHelper: QueryHelper,
  ) {}

  @ApiOperation({
    summary: 'Get page items.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: ListResultDto<IPage[]>,
  })
  @Get()
  async list(@Query() query: ListQueryDto) {
    const q = this.queryHelper.instance(query)
    return this.service.getItems(q)
  }

  @ApiOperation({
    summary: 'Get page item by id.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: PageDto,
  })
  @ApiParam({ name: 'id', type: String, required: true })
  @Get('getById/:id')
  async getItemById(@Param() params: IdParamsDto) {
    return this.service.getItemById(params.id)
  }

  @ApiOperation({
    summary: 'Get page item by guid name.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: PageDto,
  })
  @ApiParam({ name: 'guid', type: String })
  @Get('getByGuid/:guid')
  async getItemByGuid(@Param() params: GuidParamsDto, @IpAddress() ipAddress) {
    const data = await this.service.getItemByGuid(params.guid)
    if (data) await this.service.updateIPViewByGuid(params.guid, ipAddress)
    return data
  }

  @ApiOperation({
    summary: 'Create page item.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiCreatedResponse({
    description: 'Created',
    type: PageDto,
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: PageDto) {
    const articleGuidExists = await this.articleService.guidExists(body.guid)
    const pageGuidExists = await this.service.guidExists(body.guid)
    if (articleGuidExists || pageGuidExists)
      throw new BadRequestException(this.pageMessage.EXISTING_GUID)
    return this.service.create(body)
  }

  @ApiOperation({
    summary: 'Update page item.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: PageDto,
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Body() body: UpdatePageDto, @Param() params: IdParamsDto) {
    return this.service.update(body, params.id)
  }

  @ApiOperation({
    summary: 'Delete page item.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params: IdParamsDto) {
    await this.service.delete(params.id)
  }
}
