import { Module } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { FinancialController } from './financial.controller';
import { Expenses } from 'src/entities/expenses';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([Expenses])],
  controllers: [FinancialController],
  providers: [FinancialService],
})
export class FinancialModule {}
