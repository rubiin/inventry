import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../entities/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const userExist = await this.userRepository.findOne({ email: dto.email });
    if (userExist)
      throw new BadRequestException('User already registered with email');

    const newUser = this.userRepository.create(dto);
    await this.userRepository.persistAndFlush(newUser);

    return newUser;
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async getOne(id: number) {
    const user = await this.userRepository.findOne({ id });

    if (!user) throw new NotFoundException('User does not exists');

    return user;
  }

  findOne(id: number) {
    return this.getOne(id);
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.getOne(id);
    wrap(user).assign(dto);
    await this.userRepository.flush();
    return user;
  }

  async remove(id: number) {
    return this.userRepository.nativeDelete({id});
  }
}
