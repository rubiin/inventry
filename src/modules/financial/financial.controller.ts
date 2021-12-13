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
import { FinancialService } from './financial.service';
import { CreateFinancialDto } from './dto/create-financial.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { paginate } from 'src/utils/helpers';
import { ListQueryBaseDto } from 'src/common/dto';
import { JwtAuthGuard } from 'src/common/jwt.guard';

@Controller('expense')
@UseGuards(JwtAuthGuard)
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  @Post()
  create(@Body() CreateFinancialDto: CreateFinancialDto) {
    return this.financialService.create(CreateFinancialDto);
  }

  @Get()
  async findAll(@Query() listQuery: ListQueryBaseDto) {
    const { pages, total, product } = await this.financialService.findAll(
      listQuery,
    );
    return {
      message: 'Expense',
      ...paginate(pages, listQuery.page, total, product),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.financialService.findOne(+id);

    return { message: 'Expense details', data };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    const data = await this.financialService.update(+id, updateExpenseDto);

    return { message: 'Expense', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.financialService.remove(+id);

    return { message: 'Expense', data };
  }
}
