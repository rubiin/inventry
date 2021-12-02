import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { Expenses } from 'src/entities/expenses';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([Expenses])],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
