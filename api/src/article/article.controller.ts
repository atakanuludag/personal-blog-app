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
  HttpCode,
  BadRequestException,
} from '@nestjs/common'
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
import { ArticleDto } from '@/article/dto/article.dto'
import { ListResultDto } from '@/common/dto/list-result.dto'
import { GuidParamsDto, IdParamsDto } from '@/common/dto/params.dto'
import { DefaultException } from '@/common/dto/default-exception.dto'
import { ArticleService } from '@/article/article.service'
import { PageService } from '@/page/page.service'
import { QueryHelper } from '@/common/helpers/query.helper'
import { ArticleMessage } from '@/common/messages'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { IpAddress } from '@/common/decorators/ip.decorator'
import { ArticleListQueryDto } from '@/article/dto/article-list-query.dto'
import { IArticle } from '@/article/interfaces/article.interface'

@ApiTags('Article')
@Controller('article')
export class ArticleController {
  constructor(
    private readonly service: ArticleService,
    private readonly pageService: PageService,
    private readonly articleMessage: ArticleMessage,
    private readonly queryHelper: QueryHelper,
  ) {}

  @ApiOperation({
    summary: 'Get article items.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: ListResultDto<IArticle[]>,
  })
  @Get()
  async list(@Query() query: ArticleListQueryDto) {
    const q = this.queryHelper.instance(query)
    return this.service.getItems(q, query.category, query.tag)
  }

  @ApiOperation({
    summary: 'Get article item by id.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: ArticleDto,
  })
  @ApiParam({ name: 'id', type: String })
  @Get('getById/:id')
  async getItemById(@Param() params: IdParamsDto) {
    return this.service.getItemById(params.id)
  }

  @ApiOperation({
    summary: 'Get article item by guid name.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: ArticleDto,
  })
  @ApiParam({ name: 'guid', type: String })
  @Get('getByGuid/:guid')
  async getItemByGuid(@Param() params: GuidParamsDto, @IpAddress() ipAddress) {
    const data = await this.service.getItemByGuid(params.guid)
    if (data) await this.service.updateIPViewByGuid(params.guid, ipAddress)
    return data
  }

  @ApiOperation({
    summary: 'Create article item.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiCreatedResponse({
    description: 'Created',
    type: ArticleDto,
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: ArticleDto) {
    const articleGuidExists = await this.service.guidExists(body.guid)
    const pageGuidExists = await this.pageService.guidExists(body.guid)

    if (articleGuidExists || pageGuidExists)
      throw new BadRequestException(this.articleMessage.EXISTING_GUID)
    return this.service.create(body)
  }

  @ApiOperation({
    summary:
      'Sayfa ve makalelerde guid bilgisinin daha önce kullanılıp kullanılmadığını kontrol eder.',
  })
  @ApiParam({ name: 'guid', type: String, required: true })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Get(`/guidExists/:guid`)
  async getGuidExists(@Param() params: GuidParamsDto) {
    const articleGuidExists = await this.service.guidExists(params.guid)
    const pageGuidExists = await this.pageService.guidExists(params.guid)
    return { exists: articleGuidExists || pageGuidExists }
  }

  @ApiOperation({
    summary: 'Update article item.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: ArticleDto,
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Body() body: ArticleDto, @Param() params: IdParamsDto) {
    return this.service.update(body, params.id)
  }

  @ApiOperation({
    summary: 'Delete article item.',
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

  @ApiOperation({
    summary: 'Like article item by id.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Liked count',
    type: Number,
  })
  @ApiParam({ name: 'id', type: String })
  @Post('/like/:id')
  @HttpCode(200)
  async likeItemById(@Param() params: IdParamsDto, @IpAddress() ipAddress) {
    return this.service.updateIPLikeById(params.id, ipAddress)
  }

  /*
   * Bu servis NextJS tarafında Server side olarak çağrıldığı için IP'yi direkt alamıyoruz.
   * o nedenle ip adresini query'den alıp kontrol ediyoruz.
   */
  @ApiOperation({
    summary: 'Like article item by id.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: Boolean,
  })
  @ApiParam({ name: 'guid', type: String })
  @ApiQuery({ name: 'ip', type: String })
  @Get('/likeIpCheck/:guid')
  async getTopicLikeIpCheck(
    @Param() params: GuidParamsDto,
    @Query() query: { ip: string },
  ) {
    return this.service.searchByIpAndGuid(params.guid, query.ip)
  }
}
