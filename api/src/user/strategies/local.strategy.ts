import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { UserService } from '@/user/user.service'
import { UserMessage } from '@/common/messages/user.message'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly service: UserService,
    private readonly userMessage: UserMessage,
  ) {
    super()
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.service.validateUser(username, password)
    if (!user)
      throw new UnauthorizedException(this.userMessage.WRONG_USERNAME_PASSWORD)
    return user
  }
}
