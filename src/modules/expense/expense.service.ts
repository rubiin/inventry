import { Expenses } from 'src/entities/expenses';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

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

  async findAll() {
    return await this.expenseRepository.findAll();
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
    return this.expenseRepository.nativeDelete({ id });
  }
}
