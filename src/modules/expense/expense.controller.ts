import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { paginate } from 'src/utils/helpers';
import { ListQueryBaseDto } from 'src/common/dto';
import { JwtAuthGuard } from 'src/common/jwt.guard';

@Controller('expense')
@UseGuards(JwtAuthGuard)
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  async findAll(@Query() listQuery: ListQueryBaseDto) {
    const { pages, total, product } = await this.expenseService.findAll(
      listQuery,
    );
    return {
      message: 'Expense',
      ...paginate(pages, listQuery.page, total, product),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.expenseService.findOne(+id);

    return { message: 'Expense details', data };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    const data = await this.expenseService.update(+id, updateExpenseDto);

    return { message: 'Expense', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.expenseService.remove(+id);

    return { message: 'Expense', data };
  }
}
