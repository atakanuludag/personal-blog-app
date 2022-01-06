import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  HttpStatus,
} from '@nestjs/common'
import { UserService } from './user.service'
import { LocalAuthGuard } from '../common/guards/local-auth.guard'
import { RegisterUserDto } from './dto/register-user.dto'
import { PasswordHelper } from '../common/helpers/password.helper'
import { ExceptionHelper } from '../common/helpers/exception.helper'
import { CoreMessage } from 'src/common/messages/core.message'
import { UserMessage } from 'src/common/messages'

@Controller('user')
export class UserController {
  constructor(
    private readonly service: UserService,
    private passwordHelper: PasswordHelper,
    private readonly userMessage: UserMessage,
    private readonly coreMessage: CoreMessage,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.service.login(req.user)
  }

  @Post('register')
  async create(@Body() body: RegisterUserDto) {
    const userCheck = await this.service.findUser(body.userName, body.email)
    if (userCheck)
      throw new ExceptionHelper(
        this.userMessage.EXISTING_USER,
        HttpStatus.BAD_REQUEST,
      )
    body.password = await this.passwordHelper.passwordHash(body.password)
    await this.service.register(body)
  }
}
