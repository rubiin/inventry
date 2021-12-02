import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserLoginDto } from './dtos/user-login';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { User } from '../../entities/user';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import config from '../../config/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   *
   *
   * @param {UserLoginDto} userDto
   * @return {Promise<ILoginSignupReponse>}
   * @memberof AuthService
   */
  async login(userDto: UserLoginDto): Promise<any> {
    const user = await this.userRepository.findOne({
      email: userDto.email,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      email: userDto.email,
      id: user.id,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: config.jwt.expiresIn,
    });

    if (await argon.verify(user.password, userDto.password)) {
      return {
        message: 'Successfully signed in',
        data: { ...payload, accessToken },
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
