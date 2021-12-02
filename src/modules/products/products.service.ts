import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Product } from 'src/entities/products';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
  ) {}

  async create(dto: CreateProductDto, image: string) {
    const productExist = await this.productRepository.findOne({
      name: dto.name,
    });
    if (productExist)
      throw new BadRequestException('Product with name already exists');

    const newProduct = this.productRepository.create({ ...dto, image });
    await this.productRepository.persistAndFlush(newProduct);

    return newProduct;
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
