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
import { TagDto } from '@/tag/dto/tag.dto'
import { UpdateTagDto } from '@/tag/dto/update-tag.dto'
import { GuidParamsDto, IdParamsDto } from '@/common/dto/params.dto'
import { DefaultException } from '@/common/dto/default-exception.dto'
import { TagService } from '@/tag/tag.service'
import { ArticleService } from '@/article/article.service'
import { ExceptionHelper } from '@/common/helpers/exception.helper'
import { CoreMessage, TagMessage } from '@/common/messages'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { ListQueryDto } from '@/common/dto/list-query.dto'
import { QueryHelper } from '@/common/helpers/query.helper'
@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor(
    private readonly service: TagService,
    private readonly articleService: ArticleService,
    private readonly coreMessage: CoreMessage,
    private readonly tagMessage: TagMessage,
    private readonly queryHelper: QueryHelper,
  ) {}

  @ApiOperation({
    summary: 'Get tag items.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: [TagDto],
  })
  @Get()
  async list(@Query() query: ListQueryDto) {
    const q = this.queryHelper.instance(query)
    return await this.service.getItems(q)
  }

  @ApiOperation({
    summary: 'Get tag item by id.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: TagDto,
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
    summary: 'Get tag item by guid name.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: TagDto,
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
    summary: 'Create tag item.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiCreatedResponse({
    description: 'Created',
    type: TagDto,
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: TagDto) {
    const exists = await this.service.guidExists(body.guid)
    if (exists)
      throw new ExceptionHelper(
        this.tagMessage.EXISTING_GUID,
        HttpStatus.BAD_REQUEST,
      )
    return await this.service.create(body)
  }

  @ApiOperation({
    summary: 'Update tag item.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: TagDto,
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Body() body: UpdateTagDto, @Param() params: IdParamsDto) {
    return await this.service.update(body, params.id)
  }

  @ApiOperation({
    summary: 'Delete tag item.',
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
    await this.articleService.tagRemoveByObjectId(params.id)
  }

  @ApiOperation({
    summary:
      'Kategoride guid bilgisinin daha önce kullanılıp kullanılmadığını kontrol eder.',
  })
  @ApiParam({ name: 'guid', type: String, required: true })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Get(`/guidExists/:guid`)
  async getGuidExists(@Param() params: GuidParamsDto) {
    const exists = await this.service.guidExists(params.guid)
    return { exists }
  }
}
