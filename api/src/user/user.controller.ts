import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  HttpStatus,
  HttpCode,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { UserService } from '@/user/user.service'
import { LocalAuthGuard } from '@/common/guards/local-auth.guard'
import { LoginUserDto } from '@/user/dto/login-user.dto'
import { UserDto } from '@/user/dto/user.dto'
import { TokenDto } from '@/user/dto/token.dto'
import { PasswordHelper } from '@/common/helpers/password.helper'
import { ExceptionHelper } from '@/common/helpers/exception.helper'
import { CoreMessage } from '@/common/messages/core.message'
import { UserMessage } from '@/common/messages'
import { DefaultException } from '@/common/dto/default-exception.dto'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly service: UserService,
    private passwordHelper: PasswordHelper,
    private readonly userMessage: UserMessage,
    private readonly coreMessage: CoreMessage,
  ) {}

  @ApiOperation({
    summary: 'Auth login.',
  })
  @ApiBody({ type: LoginUserDto })
  @ApiOkResponse({
    description: 'Login successful.',
    type: TokenDto,
  })
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Request() req) {
    return this.service.login(req.user)
  }

  @ApiOperation({
    summary: 'User register',
  })
  @ApiCreatedResponse({ description: 'Register successful.', type: UserDto })
  @ApiBadRequestResponse({
    description:
      'Register error. There is a registered user with the same username or email.',
    type: DefaultException,
  })
  @Post('register')
  async create(@Body() body: UserDto) {
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
