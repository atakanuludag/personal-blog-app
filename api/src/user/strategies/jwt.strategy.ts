import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUserEntity } from '../interfaces/user.entity.interface';
//import { Config } from '../../app.config.tsss';
import { EnvironmentVariables } from '../../common/interfaces/environment-variables.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(public configService: ConfigService<EnvironmentVariables>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY')
    });
  }

  async validate(payload: IUserEntity) {
    return { userName: payload.userName, userId: payload.userId };
  }
}