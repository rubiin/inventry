import { EntityRepository, QueryOrder, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ListQueryBaseDto } from 'src/common/dto';
import { Product } from 'src/entities/products';
import { Sales } from 'src/entities/sales';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
    @InjectRepository(Sales)
    private readonly salesRepository: EntityRepository<Sales>,
  ) {}

  async create(dto: CreateSaleDto) {
    await this.salesRepository.nativeDelete({id: {$gt: 0}});
    const product = await this.getOneProduct(+dto.product);
    const newSales = new Sales(
      dto.quantity,
      dto.price,
      product,
      dto.discount,
      dto.vat,
    );
    await this.salesRepository.persistAndFlush(newSales);

    return newSales;
  }
  async getOneProduct(id: number) {
    const product = await this.productRepository.findOne({ id });

    if (!product) throw new NotFoundException('Product does not exists');

    return product;
  }

  async findAll(listQuery: ListQueryBaseDto) {
    const { limit, search, page } = listQuery;

    const offset = limit * (page - 1);

    let product: Sales[], total: number;

    if (search) {
      [product, total] = await this.salesRepository.findAndCount(
        { id: +search },
        {
          populate: ['product'],
          limit,
          offset,
          orderBy: { createdAt: QueryOrder.ASC },
        },
      );
    } else {
      [product, total] = await this.salesRepository.findAndCount(
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
    const user = await this.salesRepository.findOne({ id });

    if (!user) throw new NotFoundException('Sales does not exists');

    return user;
  }

  findOne(id: number) {
 
 return this.salesRepository.findOne({ id });
    return this.getOne(id);
  }

  async update(id: number, dto: UpdateSaleDto) {
    const sales = await this.getOne(id);
    wrap(sales).assign(dto);
    await this.salesRepository.flush();
    return sales;
  }

  async remove(id: number) {
    return this.salesRepository.nativeDelete({ id });
  }
}
