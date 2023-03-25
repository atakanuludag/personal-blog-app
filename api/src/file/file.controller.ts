import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiBody,
  ApiConsumes,
  ApiParam,
} from '@nestjs/swagger'
import * as fs from 'fs'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'
import { FileService } from '@/file/file.service'
import { CoreMessage, FileMessage } from '@/common/messages'
import { File } from '@/file/schemas/file.schema'
import { ExceptionHelper } from '@/common/helpers/exception.helper'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { ListResultDto } from '@/common/dto/list-result.dto'
import { FileDto } from '@/file/dto/file.dto'
import { FileListQueryDto } from '@/file/dto/file-list-query.dto'
import { DefaultException } from '@/common/dto/default-exception.dto'
import { QueryHelper } from '@/common/helpers/query.helper'
import { FolderDto } from '@/file/dto/folder.dto'
import { IEnv } from '@/common/interfaces/env.interface'
import { slugifyTR } from '@/common/utils/slugify-tr.util'
import { UpdateFileDto } from '@/file/dto/update-file.dto'
import { IdParamsDto } from '@/common/dto/params.dto'
@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(
    private readonly service: FileService,
    private readonly coreMessage: CoreMessage,
    private readonly fileMessage: FileMessage,
    private readonly queryHelper: QueryHelper,
    private configService: ConfigService<IEnv>,
  ) {}

  @ApiOperation({
    summary: 'Get file items.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: ListResultDto,
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Get()
  async list(@Query() query: FileListQueryDto) {
    const q = this.queryHelper.instance(query)
    return await this.service.getItems(q, query.folderId)
  }

  @ApiOperation({
    summary: 'Create file items.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiCreatedResponse({
    description: 'Created',
    type: [FileDto],
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
        },
        file: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('file'))
  async uploadFile(@UploadedFiles() file: Express.Multer.File[], @Body() body) {
    //Todo: @Body() body'e dto tipi verilecek.
    try {
      let folderId = null
      if (body.path && body.path !== '/') {
        const folder = await this.service.getFolderByPath(body.path)
        folderId = folder._id || null
      }

      let data = new Array<File>()
      data = file.map((f) => {
        return {
          isFolder: false,
          title: f.filename,
          description: '',
          filename: f.filename,
          path: body.path === '/' || !body.path ? null : body.path,
          folderId,
          mimetype: f.mimetype,
          size: f.size,
        }
      })
      return this.service.saveFile(data)
    } catch (err) {
      throw new ExceptionHelper(
        this.fileMessage.UPLOAD_ERROR,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  @ApiOperation({
    summary: 'Create folder.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Post('/folder')
  async createFolder(@Body() body: FolderDto) {
    // ** path verilirken ne başında nede sonunda / işareti olmayacak.
    const { title, path } = body
    let folderId = null

    if (body.path && body.path !== '/') {
      const folder = await this.service.getFolderByPath(body.path)
      folderId = folder._id || null
    }

    const folderTitle = slugifyTR(title)
    const uploadFolder = this.configService.get<string>('UPLOAD_FOLDER_PATH')

    const uploadFolderDir = `${uploadFolder}/${
      path === '/' || path === null ? '' : `${path}/`
    }${folderTitle}`

    const newPath = `${
      path === '/' || path === null ? '' : `${path}/`
    }${folderTitle}`

    await fs.promises.mkdir(uploadFolderDir, { recursive: true })
    return await this.service.createFolder(title, newPath, folderId)
  }

  @ApiOperation({
    summary: 'Update file item.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: FileDto,
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Body() body: UpdateFileDto, @Param() params: IdParamsDto) {
    return await this.service.update(body, params.id)
  }
}
