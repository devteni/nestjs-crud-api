import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { UserDocument } from '../schemas/user.schema';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly users: Model<UserDocument>,
  ) {}

  async create(user: User): Promise<Record<string, unknown>> {
    const newUser = await (await this.users.create(user)).save();
    return { message: 'New user created', data: newUser };
  }

  async findOne(username: string): Promise<User> {
    return await this.users.findOne({ username: username });
  }
}
