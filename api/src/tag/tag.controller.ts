import { Body, Controller, Get, Param, Query, HttpStatus, Post, UseGuards, Patch } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { GuidParamsDto, IdParamsDto } from 'src/common/dto/params.dto';
import { TagService } from './tag.service';
import { ExceptionHelper } from '../common/helpers/exception.helper';
import { CoreMessage, TagMessage } from '../common/messages';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('tag')
export class TagController {
    constructor(
        private readonly service: TagService,
        private readonly coreMessage: CoreMessage,
        private readonly categoryMessage: TagMessage,
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
    async create(@Body() body: CreateTagDto) {
        const exists = await this.service.guidExists(body.guid);
        if (exists) throw new ExceptionHelper(this.categoryMessage.EXISTING_GUID, HttpStatus.BAD_REQUEST);
        await this.service.create(body);
    }
}
