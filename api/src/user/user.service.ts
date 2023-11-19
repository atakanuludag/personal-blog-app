import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { JwtService } from '@nestjs/jwt'
import { IUser } from '@/user/interfaces/user.interface'
import { IUserEntity } from '@/user/interfaces/user.entity.interface'
import { User, UserDocument } from '@/user/schemas/user.schema'
import { PasswordHelper } from '@/common/helpers/password.helper'
import { ExceptionHelper } from '@/common/helpers/exception.helper'
import { CoreMessage } from '@/common/messages'
import { UserDto } from '@/user/dto/user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly serviceModel: Model<UserDocument>,
    private jwtService: JwtService,
    private passwordHelper: PasswordHelper,
    private readonly coreMessage: CoreMessage,
  ) {}

  async login(user: IUser) {
    try {
      const payload: IUserEntity = { userName: user.userName, userId: user.id }
      return {
        accessToken: this.jwtService.sign(payload),
        userId: user.id,
      }
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async validateUser(
    userName: string,
    password: string,
  ): Promise<IUser | null> {
    try {
      const find = await this.serviceModel
        .findOne({ userName })
        .select('+password')
        .exec()

      if (find) {
        const passwordCheck = await this.passwordHelper.verifyPasswordHash(
          password,
          find.password,
        )
        return passwordCheck ? find : null
      }
      return null
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async findUserById(id: ObjectId): Promise<IUser> {
    try {
      return await this.serviceModel.findById(id).exec()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async findUser(
    userName: string | undefined,
    email: string | undefined,
  ): Promise<boolean> {
    try {
      const exists = await this.serviceModel.exists({
        $or: [{ userName }, { email }],
      })
      return exists?._id ? true : false
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async register(registerUserDto: UserDto): Promise<User> {
    try {
      const create = new this.serviceModel(registerUserDto)
      return create.save()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
