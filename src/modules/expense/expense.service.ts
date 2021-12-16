import { Expenses } from '../../entities/expenses';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { EntityRepository, QueryOrder, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ListQueryBaseDto } from '../../common/dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expenses)
    private readonly expenseRepository: EntityRepository<Expenses>,
  ) {}

  async create(dto: CreateExpenseDto) {
    const newExpense = this.expenseRepository.create(dto);
    await this.expenseRepository.persistAndFlush(newExpense);

    return newExpense;
  }

  async findAll(listQuery: ListQueryBaseDto) {
    const { limit, search, page } = listQuery;

    const offset = limit * (page - 1);

    let product: Expenses[], total: number;

    if (search) {
      [product, total] = await this.expenseRepository.findAndCount(
        { type: search },
        { limit, offset, orderBy: { createdAt: QueryOrder.ASC } },
      );
    } else {
      [product, total] = await this.expenseRepository.findAndCount(
        {},
        { limit, offset, orderBy: { createdAt: QueryOrder.ASC } },
      );
    }

    const pages = Math.ceil(total / limit);

    return { pages, total, product };
  }

  async getOne(id: number) {
    const expense = await this.expenseRepository.findOne({ id });

    if (!expense) throw new NotFoundException('Expense does not exists');

    return expense;
  }

  findOne(id: number) {
    return this.getOne(id);
  }

  async update(id: number, dto: UpdateExpenseDto) {
    const expense = await this.getOne(id);
    wrap(expense).assign(dto);
    await this.expenseRepository.flush();
    return expense;
  }

  async remove(id: number) {
    await this.getOne(id);
    return this.expenseRepository.nativeDelete({ id });
  }
}
