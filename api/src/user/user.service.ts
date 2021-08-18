import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { IUser } from './interfaces/user.interface';
import { IUserEntity } from './interfaces/user.entity.interface';
import { User, UserDocument } from './schemas/user.schema';
import { PasswordHelper } from '../common/helpers/password.helper';
import { ExceptionHelper } from '../common/helpers/exception.helper';
import { CoreMessage } from '../common/messages';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private passwordHelper: PasswordHelper,
    private readonly coreMessage: CoreMessage
  ) { }

  async login(user: IUser) {
    try {
      const payload: IUserEntity = { userName: user.userName, userId: user.id };
      return { 
        accessToken: this.jwtService.sign(payload),
        userId: user.id
      };
    } catch (err) {
      throw new ExceptionHelper(this.coreMessage.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async validateUser(userName: string, password: string): Promise<IUser | null> {
    try {
      const find = await this.userModel.findOne({ userName }).select('+password').exec();

      if (find) {
        const passwordCheck = await this.passwordHelper.verifyPasswordHash(password, find.password);
        return passwordCheck ? find : null;
      }
      return null;
    } catch (err) {
      throw new ExceptionHelper(this.coreMessage.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUserById(id: string): Promise<IUser> {
    try {
      return await this.userModel.findById(id).exec();
    } catch (err) {
      throw new ExceptionHelper(this.coreMessage.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUser(userName: string | undefined, email: string | undefined): Promise<boolean> {
    try {
      return await this.userModel.exists({ $or: [{ userName }, { email }] });
    } catch (err) {
      throw new ExceptionHelper(this.coreMessage.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async register(registerUserDto: RegisterUserDto): Promise<User> {
    try {
      const create = new this.userModel(registerUserDto);
      return create.save();
    } catch (err) {
      throw new ExceptionHelper(this.coreMessage.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}