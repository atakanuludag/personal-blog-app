import { Body, Controller, Get, Param, HttpStatus, Post, UseGuards, Patch, Delete } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { GuidParamsDto, IdParamsDto } from 'src/common/dto/params.dto';
import { ArticleService } from './article.service';
import { ExceptionHelper } from '../common/helpers/exception.helper';
import { CoreMessage, ArticleMessage } from '../common/messages';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('article')
export class ArticleController {
    constructor(
        private readonly service: ArticleService,
        private readonly coreMessage: CoreMessage,
        private readonly articleMessage: ArticleMessage,
    ) { }

    @Get()
    async list() {
        return await this.service.getItems();
    }

    @Get("getById/:id")
    async getItemById(@Param() params: IdParamsDto) {
        const data = await this.service.getItemById(params.id);
        if (!data) throw new ExceptionHelper(this.coreMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
        return data;
    }

    @Get("getByGuid/:guid")
    async getItemByGuid(@Param() params: GuidParamsDto) {
        const data = await this.service.getItemByGuid(params.guid);
        if (!data) throw new ExceptionHelper(this.coreMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
        return data;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() body: CreateArticleDto) {
        const exists = await this.service.guidExists(body.guid);
        if (exists) throw new ExceptionHelper(this.articleMessage.EXISTING_GUID, HttpStatus.BAD_REQUEST);
        await this.service.create(body);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() body: UpdateArticleDto, @Param() params: IdParamsDto) {
        await this.service.update(body, params.id);
    }

    @Delete(':id')
    async delete(@Param() params: IdParamsDto) {
        await this.service.delete(params.id);
    }
}
