import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from 'src/entities/products';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    const userExist = await this.productRepository.findOne({ name: dto.name });
    if (userExist)
      throw new BadRequestException('User already registered with email');

    const newUser = this.productRepository.create(dto);
    await this.productRepository.persistAndFlush(newUser);

    return newUser;
  }

  async findAll() {
    return await this.productRepository.findAll();
  }

  async getOne(id: number) {
    const product = await this.productRepository.findOne({ id });

    if (!product) throw new NotFoundException('Product does not exists');

    return product;
  }

  findOne(id: number) {
    return this.getOne(id);
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.getOne(id);
    wrap(product).assign(dto);
    await this.productRepository.flush();
    return product;
  }

  async remove(id: number) {
    return this.productRepository.nativeDelete({ id });
  }
}
