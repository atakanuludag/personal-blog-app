import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { IEnv } from '../common/interfaces/env.interface'

import { UserController } from './user.controller'
import { User, UserSchema } from './schemas/user.schema'
import { UserService } from './user.service'

import { CoreMessage, UserMessage } from '../common/messages'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { PasswordHelper } from '../common/helpers/password.helper'
import { ExceptionHelper } from '../common/helpers/exception.helper'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<IEnv>) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    CoreMessage,
    UserMessage,
    ExceptionHelper,
    LocalStrategy,
    JwtStrategy,
    PasswordHelper,
  ],
})
export class UserModule {}
