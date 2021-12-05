import {
  EntityManager,
  EntityRepository,
  MikroORM,
  QueryOrder,
  wrap,
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ListQueryBaseDto } from 'src/common/dto';
import { DamageProduct } from 'src/entities/damagedProduct';
import { ProductDetail } from 'src/entities/productDetails';
import { Product } from 'src/entities/products';
import { CreateDamagedProductDto } from './dto/create-damaged-product.dto';

@Injectable()
export class DamagedProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
    @InjectRepository(DamageProduct)
    private readonly damagedProductRepository: EntityRepository<DamageProduct>,
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}

  async create(dto: CreateDamagedProductDto) {
    const productExist = await this.damagedProductRepository.findOne({
      name: dto.name,
    });
    if (productExist)
      throw new BadRequestException('Product with name already exists');
    const product = await this.getOneProduct(dto.product);

    const newDetail = this.damagedProductRepository.create(dto);

    await this.orm.em.transactional(async (em) => {
      product.quantity -= dto.quantity;

      em.persist(product);
      await em.persistAndFlush(newDetail);
    });

    return newDetail;
  }

  async getOneProduct(id: number) {
    const product = await this.productRepository.findOne({ id });

    if (!product) throw new NotFoundException('Product does not exists');

    return product;
  }

  async findAll(listQuery: ListQueryBaseDto) {
    const { limit, search, page } = listQuery;

    const offset = limit * (page - 1);

    let product: DamageProduct[], total: number;

    if (search) {
      [product, total] = await this.damagedProductRepository.findAndCount(
        { name: search },
        {
          limit,
          offset,
          orderBy: { createdAt: QueryOrder.ASC },
          populate: ['product'],
        },
      );
    } else {
      [product, total] = await this.damagedProductRepository.findAndCount(
        {},
        {
          limit,
          offset,
          orderBy: { createdAt: QueryOrder.ASC },
          populate: ['product'],
        },
      );
    }

    const pages = Math.ceil(total / limit);

    return { pages, total, product };
  }

  async getOne(id: number) {
    const detail = await this.damagedProductRepository.findOne({ id });

    if (!detail) throw new NotFoundException('Product does not exists');

    return detail;
  }

  findOne(id: number) {
    return this.getOne(id);
  }

  async remove(id: number) {
    const detail = await this.getOne(id);
    const product = await this.getOneProduct(detail.product.id);

    await this.orm.em.transactional(async (em) => {
      product.quantity += detail.quantity;

      em.persist(product);
      await em.nativeDelete(DamageProduct, { id });
    });

    return detail;
  }
}
