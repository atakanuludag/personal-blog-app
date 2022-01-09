import {
  Body,
  Controller,
  Get,
  HttpStatus,
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
} from '@nestjs/swagger'
import { FilesInterceptor } from '@nestjs/platform-express'
import { FileService } from './file.service'
import { CoreMessage, FileMessage } from '../common/messages'
import { File } from './schemas/file.schema'
import { ExceptionHelper } from '../common/helpers/exception.helper'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { ListQueryDto } from '../common/dto/list-query.dto'
import { ListResultDto } from '../common/dto/list-result.dto'
import { FileDto } from './dto/file.dto'
import { DefaultException } from '../common/dto/default-exception.dto'
import { QueryHelper } from '../common/helpers/query.helper'

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(
    private readonly service: FileService,
    private readonly coreMessage: CoreMessage,
    private readonly fileMessage: FileMessage,
    private readonly queryHelper: QueryHelper,
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
  @UseGuards(JwtAuthGuard)
  @Get()
  async list(@Query() query: ListQueryDto) {
    const q = this.queryHelper.instance(query)
    return await this.service.getItems(q)
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
  uploadFile(@UploadedFiles() file: Express.Multer.File[]) {
    try {
      let data = new Array<File>()

      data = file.map((f) => {
        return {
          title: f.filename,
          description: '',
          filename: f.filename,
          path: f.path,
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
}
