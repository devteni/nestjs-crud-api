import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/interfaces/user.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  SECRET = this.configService.get('jwt.secret');
  EXPIRY = this.configService.get('jwt.expiry');

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      return user['_doc'];
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user._id };
    const access_token = await this.generateAccessToken(payload);
    if (access_token)
      return {
        data: {
          message: 'login successful',
          token: access_token,
        },
      };
    throw new UnauthorizedException();
  }

  async generateAccessToken(payload: any) {
    const secret = this.SECRET;
    const expiresIn = this.EXPIRY;
    return await this.jwtService.signAsync(payload, { expiresIn, secret });
  }
}
