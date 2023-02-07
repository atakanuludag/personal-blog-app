import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { IUserEntity } from '@/user/interfaces/user.entity.interface'
import { IEnv } from '@/common/interfaces/env.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(public configService: ConfigService<IEnv>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    })
  }

  async validate(payload: IUserEntity) {
    return { userName: payload.userName, userId: payload.userId }
  }
}
