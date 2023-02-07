import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  HttpCode,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'
import { SettingsDto } from '@/settings/dto/settings.dto'
import { DefaultException } from '@/common/dto/default-exception.dto'
import { SettingsService } from '@/settings/settings.service'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { ESettings } from '@/settings/interfaces/Enum'

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly service: SettingsService) {
    this.service.setInitialItems()
  }

  @ApiOperation({
    summary: 'Create/Update setting items.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Created/Updated',
    type: [SettingsDto],
  })
  @ApiBody({ type: [SettingsDto] })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post()
  async post(@Body() body: SettingsDto[]) {
    return await this.service.post(body)
  }

  @ApiOperation({
    summary: 'Get settings items.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: [SettingsDto],
  })
  @Get()
  async getItems() {
    return await this.service.getItems()
  }

  @ApiOperation({
    summary: 'Get settings item by name.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: DefaultException,
  })
  @ApiOkResponse({
    description: 'Success',
    type: SettingsDto,
  })
  @ApiParam({ name: 'name', type: String })
  @Get('getByName/:name')
  async getByName(@Param() params: { name: ESettings }) {
    return await this.service.getByName(params.name)
  }
}
