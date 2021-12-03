import { EntityRepository, QueryOrder, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ListQueryBaseDto } from 'src/common/dto';
import { Sales } from 'src/entities/sales';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sales)
    private readonly salesRepository: EntityRepository<Sales>,
  ) {}

  async create(dto: CreateSaleDto,image:string) {

    const newSales = this.salesRepository.create({ ...dto, image });
    await this.salesRepository.persistAndFlush(newSales);

    return newSales;
  }

  async findAll(listQuery: ListQueryBaseDto) {
    const { limit, search, page } = listQuery;

    const offset = limit * (page - 1);

    let product: Sales[], total: number;

    if (search) {
      [product, total] = await this.salesRepository.findAndCount(
        { id: +search },
        { limit, offset, orderBy: { createdAt: QueryOrder.ASC } },
      );
    } else {
      [product, total] = await this.salesRepository.findAndCount(
        {},
        { limit, offset, orderBy: { createdAt: QueryOrder.ASC } },
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
    return this.getOne(id);
  }

  async update(id: number, dto: UpdateSaleDto,image: string) {
 
      const sales = await this.getOne(id);
      let data: any = dto;
      if (image) {
        data = { ...dto, image };
      }
      wrap(sales).assign(data);
      await this.salesRepository.flush();
      return sales;
  }

  async remove(id: number) {
    return this.salesRepository.nativeDelete({ id });
  }
}
