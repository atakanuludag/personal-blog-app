import {
  Body,
  Controller,
  Get,
  Param,
  HttpStatus,
  Post,
  UseGuards,
  Patch,
  Delete,
  Query,
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
import { ArticleDto } from './dto/article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { ArticleListQueryDto } from './dto/article-list-query.dto'
import { GuidParamsDto, IdParamsDto } from '../common/dto/params.dto'
import { ListQueryDto } from '../common/dto/list-query.dto'
import { ArticleService } from './article.service'
import { ExceptionHelper } from '../common/helpers/exception.helper'
import { QueryHelper } from '../common/helpers/query.helper'
import { CoreMessage, ArticleMessage } from '../common/messages'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { DefaultException } from '../common/dto/default-exception.dto'

//Todo: https://www.npmjs.com/package/reading-time

@ApiTags('Article')
@Controller('article')
export class ArticleController {
  constructor(
    private readonly service: ArticleService,
    private readonly coreMessage: CoreMessage,
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
    type: ArticleListQueryDto,
  })
  @Get()
  async list(@Query() query: ListQueryDto) {
    const q = this.queryHelper.instance(query)
    return await this.service.getItems(q)
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
    const data = await this.service.getItemById(params.id)
    if (!data)
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    return data
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
  async getItemByGuid(@Param() params: GuidParamsDto) {
    const data = await this.service.getItemByGuid(params.guid)
    if (!data)
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
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
    const exists = await this.service.guidExists(body.guid)
    if (exists)
      throw new ExceptionHelper(
        this.articleMessage.EXISTING_GUID,
        HttpStatus.BAD_REQUEST,
      )
    return await this.service.create(body)
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
  async update(@Body() body: UpdateArticleDto, @Param() params: IdParamsDto) {
    return await this.service.update(body, params.id)
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
}
