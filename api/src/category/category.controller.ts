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
import { CategoryDto } from '@/category/dto/category.dto'
import { UpdateCategoryDto } from '@/category/dto/update-category.dto'
import { GuidParamsDto, IdParamsDto } from '@/common/dto/params.dto'
import { DefaultException } from '@/common/dto/default-exception.dto'
import { CategoryService } from '@/category/category.service'
import { ArticleService } from '@/article/article.service'
import { CategoryMessage } from '@/common/messages'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { ListQueryDto } from '@/common/dto/list-query.dto'
import { QueryHelper } from '@/common/helpers/query.helper'

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly service: CategoryService,
    private readonly articleService: ArticleService,
    private readonly categoryMessage: CategoryMessage,
    private readonly queryHelper: QueryHelper,
  ) {}

  @ApiOperation({
    summary: 'Get category items.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: [CategoryDto],
  })
  @Get()
  async list(@Query() query: ListQueryDto) {
    const q = this.queryHelper.instance(query)
    return this.service.getItems(q)
  }

  @ApiOperation({
    summary: 'Get category item by id.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: CategoryDto,
  })
  @ApiParam({ name: 'id', type: String })
  @Get('getById/:id')
  async getItemById(@Param() params: IdParamsDto) {
    return this.service.getItemById(params.id)
  }

  @ApiOperation({
    summary: 'Get category item by guid name.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: CategoryDto,
  })
  @ApiParam({ name: 'guid', type: String })
  @Get('getByGuid/:guid')
  async getItemByGuid(@Param() params: GuidParamsDto) {
    return this.service.getItemByGuid(params.guid)
  }

  @ApiOperation({
    summary: 'Create category item.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiCreatedResponse({
    description: 'Created',
    type: CategoryDto,
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CategoryDto) {
    const exists = await this.service.guidExists(body.guid)
    if (exists)
      throw new BadRequestException(this.categoryMessage.EXISTING_GUID)
    return this.service.create(body)
  }

  @ApiOperation({
    summary: 'Update category item.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: CategoryDto,
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Body() body: UpdateCategoryDto, @Param() params: IdParamsDto) {
    return this.service.update(body, params.id)
  }

  @ApiOperation({
    summary: 'Delete category item.',
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
    const exists = await this.service.parentExists(params.id)
    if (exists) throw new BadRequestException(this.categoryMessage.USE)
    await this.service.delete(params.id)
    await this.articleService.categoryRemoveByObjectId(params.id)
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
