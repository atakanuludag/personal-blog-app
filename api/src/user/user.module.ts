import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { IEnv } from '@/common/interfaces/env.interface'

import { UserController } from '@/user/user.controller'
import { User, UserSchema } from '@/user/schemas/user.schema'
import { UserService } from '@/user/user.service'

import { UserMessage } from '@/common/messages'
import { JwtStrategy } from '@/user/strategies/jwt.strategy'
import { LocalStrategy } from '@/user/strategies/local.strategy'
import { PasswordHelper } from '@/common/helpers/password.helper'

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
    UserMessage,
    LocalStrategy,
    JwtStrategy,
    PasswordHelper,
  ],
})
export class UserModule {}
