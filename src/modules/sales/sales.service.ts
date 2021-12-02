import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Sales } from 'src/entities/sales';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sales)
    private readonly salesRepository: EntityRepository<Sales>,
  ) {}

  async create(dto: CreateSaleDto) {
    const newProduct = this.salesRepository.create(dto);
    await this.salesRepository.persistAndFlush(newProduct);

    return newProduct;
  }

  async findAll() {
    return await this.salesRepository.findAll();
  }

  async getOne(id: number) {
    const user = await this.salesRepository.findOne({ id });

    if (!user) throw new NotFoundException('Sales does not exists');

    return user;
  }

  findOne(id: number) {
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
