import { User } from '../entities/user';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import config from '../config/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: EntityRepository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.secret,
      ignoreExpiration: false,
    });
  }

  async validate(
    payload: { id: number },
    done: (arg0: any, arg1: User) => void,
  ) {
    const { id } = payload;
    const user = await this.usersRepo.findOne({ id });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    done(null, user);
  }
}
