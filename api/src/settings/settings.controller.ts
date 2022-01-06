import { Body, Controller, Get, Post, UseGuards, Param } from '@nestjs/common'
import { SettingsDto } from './dto/settings.dto'
import { SettingsService } from './settings.service'
import { CoreMessage } from '../common/messages'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { ESettings } from './interfaces/Enum'

@Controller('settings')
export class SettingsController {
  constructor(
    private readonly service: SettingsService,
    private readonly coreMessage: CoreMessage,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async post(@Body() body: SettingsDto[] | SettingsDto) {
    return await this.service.post(body)
  }

  @Get()
  async getItems() {
    return await this.service.getItems()
  }

  @Get('getByName/:name')
  async getByName(@Param() params: { name: ESettings }) {
    return await this.service.getByName(params.name)
  }
}
