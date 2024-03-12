import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { JwtService } from '@nestjs/jwt'
import { IUser } from '@/user/interfaces/user.interface'
import { IUserEntity } from '@/user/interfaces/user.entity.interface'
import { User, UserDocument } from '@/user/schemas/user.schema'
import { PasswordHelper } from '@/common/helpers/password.helper'
import { UserDto } from '@/user/dto/user.dto'
import { UpdateProfileDto } from '@/user/dto/update-profile.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly serviceModel: Model<UserDocument>,
    private jwtService: JwtService,
    private passwordHelper: PasswordHelper,
  ) {}

  async login(user: IUser) {
    try {
      const payload: IUserEntity = { userName: user.userName, userId: user.id }
      return {
        accessToken: this.jwtService.sign(payload),
        userId: user.id,
      }
    } catch (err) {
      throw new InternalServerErrorException(err)
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
      throw new InternalServerErrorException(err)
    }
  }

  async findUserById(id: ObjectId): Promise<IUser> {
    try {
      return this.serviceModel.findById(id).exec()
    } catch (err) {
      throw new BadRequestException(err)
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
      throw new BadRequestException(err)
    }
  }

  async register(registerUserDto: UserDto): Promise<User> {
    try {
      const create = new this.serviceModel(registerUserDto)
      return create.save()
    } catch (err) {
      throw new InternalServerErrorException(err)
    }
  }

  async update(updateDto: UpdateProfileDto, id: string): Promise<IUser> {
    try {
      return this.serviceModel.findByIdAndUpdate(id, updateDto, {
        new: true,
      })
    } catch (err) {
      throw new BadRequestException(err)
    }
  }
}
