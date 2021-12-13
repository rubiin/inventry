import { PartialType } from '@nestjs/mapped-types';
import { CreateFinancialDto } from './create-financial.dto';

export class UpdateExpenseDto extends PartialType(CreateFinancialDto) {}
