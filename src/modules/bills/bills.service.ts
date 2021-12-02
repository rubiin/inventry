import { Bill } from 'src/entities/bills';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, wrap } from '@mikro-orm/core';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: EntityRepository<Bill>,
  ) {}

  async create(dto: CreateBillDto) {
    const newProduct = this.billRepository.create(dto);
    await this.billRepository.persistAndFlush(newProduct);

    return newProduct;
  }

  async findAll() {
    return await this.billRepository.findAll();
  }

  async getOne(id: number) {
    const bill = await this.billRepository.findOne({ id });

    if (!bill) throw new NotFoundException('Sales does not exists');

    return bill;
  }

  findOne(id: number) {
    return this.getOne(id);
  }

  async update(id: number, dto: UpdateBillDto) {
    const bill = await this.getOne(id);
    wrap(bill).assign(dto);
    await this.billRepository.flush();
    return bill;
  }

  async remove(id: number) {
    return this.billRepository.nativeDelete({ id });
  }
}
