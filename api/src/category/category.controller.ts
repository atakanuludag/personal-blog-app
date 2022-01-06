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
} from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { GuidParamsDto, IdParamsDto } from 'src/common/dto/params.dto'
import { CategoryService } from './category.service'
import { ArticleService } from '../article/article.service'
import { ExceptionHelper } from '../common/helpers/exception.helper'
import { CoreMessage, CategoryMessage } from '../common/messages'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'

@Controller('category')
export class CategoryController {
  constructor(
    private readonly service: CategoryService,
    private readonly articleService: ArticleService,
    private readonly coreMessage: CoreMessage,
    private readonly categoryMessage: CategoryMessage,
  ) {}

  @Get()
  async list() {
    return await this.service.getItems()
  }

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

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateCategoryDto) {
    const exists = await this.service.guidExists(body.guid)
    if (exists)
      throw new ExceptionHelper(
        this.categoryMessage.EXISTING_GUID,
        HttpStatus.BAD_REQUEST,
      )
    await this.service.create(body)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Body() body: UpdateCategoryDto, @Param() params: IdParamsDto) {
    await this.service.update(body, params.id)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params: IdParamsDto) {
    const exists = await this.service.parentExists(params.id)
    if (exists)
      throw new ExceptionHelper(
        this.categoryMessage.USE,
        HttpStatus.BAD_REQUEST,
      )
    await this.service.delete(params.id)
    await this.articleService.categoryRemoveByObjectId(params.id)
  }
}
