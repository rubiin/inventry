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
import { ProductDetail } from 'src/entities/productDetails';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';

@Injectable()
export class ProductDetailService {
  constructor(
    @InjectRepository(ProductDetail)
    private readonly productDetailRepository: EntityRepository<ProductDetail>,
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}

  async create(dto: CreateProductDetailDto) {
    const productExist = await this.productDetailRepository.findOne({
      name: dto.name,
    });
    if (productExist)
      throw new BadRequestException('Product with name already exists');

    const newDetail = this.productDetailRepository.create(dto);
    await this.productDetailRepository.persistAndFlush(newDetail);

    return newDetail;
  }

  async findAll(listQuery: ListQueryBaseDto) {
    const { limit, search, page } = listQuery;

    console.log('here', listQuery);

    const offset = limit * (page - 1);

    let product: ProductDetail[], total: number;

    if (search) {
      [product, total] = await this.productDetailRepository.findAndCount(
        {
          name: {
            $ilike: `${search}%`,
          },
        },
        {
          populate: ['product'],
          limit,
          offset,
          orderBy: { createdAt: QueryOrder.ASC },
        },
      );
    } else {
      [product, total] = await this.productDetailRepository.findAndCount(
        {},
        {
          populate: ['product'],
          limit,
          offset,
          orderBy: { createdAt: QueryOrder.ASC },
        },
      );
    }

    const pages = Math.ceil(total / limit);

    return { pages, total, product };
  }

  async getOne(id: number) {
    const detail = await this.productDetailRepository.findOne({ id });

    if (!detail) throw new NotFoundException('Product does not exists');

    return detail;
  }

  findOne(id: number) {
    return this.getOne(id);
  }

  async update(id: number, dto: UpdateProductDetailDto) {
    const detail = await this.getOne(id);
    wrap(detail).assign(dto);
    await this.productDetailRepository.flush();
    return detail;
  }

  async remove(id: number) {
    await this.getOne(id);
    return this.productDetailRepository.nativeDelete({ id });
  }
}
