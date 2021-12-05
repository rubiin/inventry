import { EntityRepository, QueryOrder, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ListQueryBaseDto } from 'src/common/dto';
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

  async findAll(listQuery: ListQueryBaseDto) {
    const { limit, search, page } = listQuery;

    const offset = limit * (page - 1);

    let product: Product[], total: number;

    if (search) {
      [product, total] = await this.productRepository.findAndCount(
        { id: +search },
        { limit, offset, orderBy: { createdAt: QueryOrder.ASC } },
      );
    } else {
      [product, total] = await this.productRepository.findAndCount(
        {},
        { limit, offset, orderBy: { createdAt: QueryOrder.ASC } },
      );
    }

    const pages = Math.ceil(total / limit);

    return { pages, total, product };
  }

  async getOne(id: number) {
    const product = await this.productRepository.findOne({ id });

    if (!product) throw new NotFoundException('Product does not exists');

    return product;
  }

  findOne(id: number) {
    return this.getOne(id);
  }

  async update(id: number, dto: UpdateProductDto, image: string) {
    const product = await this.getOne(id);
    let data: any = dto;
    if (image) {
      data = { ...dto, image };
    }
    wrap(product).assign(data);
    await this.productRepository.flush();
    return product;
  }

  async remove(id: number) {
    await this.getOne(id);
    return this.productRepository.nativeDelete({ id });
  }
}
