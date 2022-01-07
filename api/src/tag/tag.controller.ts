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
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { GuidParamsDto, IdParamsDto } from '../common/dto/params.dto'
import { TagService } from './tag.service'
import { ArticleService } from '../article/article.service'
import { ExceptionHelper } from '../common/helpers/exception.helper'
import { CoreMessage, TagMessage } from '../common/messages'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'

@Controller('tag')
export class TagController {
  constructor(
    private readonly service: TagService,
    private readonly articleService: ArticleService,
    private readonly coreMessage: CoreMessage,
    private readonly tagMessage: TagMessage,
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
  async create(@Body() body: CreateTagDto) {
    const exists = await this.service.guidExists(body.guid)
    if (exists)
      throw new ExceptionHelper(
        this.tagMessage.EXISTING_GUID,
        HttpStatus.BAD_REQUEST,
      )
    await this.service.create(body)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Body() body: UpdateTagDto, @Param() params: IdParamsDto) {
    await this.service.update(body, params.id)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params: IdParamsDto) {
    await this.service.delete(params.id)
    await this.articleService.tagRemoveByObjectId(params.id)
  }
}
