import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { UserDocument } from '../schemas/user.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly users: Model<UserDocument>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async create(user: User): Promise<Record<string, unknown> | Error> {
    const existingUser = await this.users.findOne({ email: user.email });
    if (existingUser) {
      throw new BadRequestException('User with this email already exist');
    }
    const newUser = await (await this.users.create(user)).save();
    const { username, _id } = newUser;
    const token = await this.generateAccessToken({ username, _id });
    return { message: 'New user created', data: { ...newUser['_doc'], token } };
  }

  async findOne(username: string): Promise<User> {
    return await this.users.findOne({ username: username });
  }

  async generateAccessToken(payload: any) {
    const secret = this.configService.get('jwt.secret');
    const expiresIn = this.configService.get('jwt.expiry');
    return await this.jwtService.signAsync(payload, { expiresIn, secret });
  }
}
