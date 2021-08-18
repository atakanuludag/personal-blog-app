import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUserEntity } from '../interfaces/user.entity.interface';
import { Config } from '../../app.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Config.jwtSecretKey,
    });
  }

  async validate(payload: IUserEntity) {
    return { userName: payload.userName, userId: payload.userId };
  }
}