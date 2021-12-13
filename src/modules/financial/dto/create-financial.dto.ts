import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateFinancialDto {
  @IsString()
  @MaxLength(100)
  billNo: string;

  @IsNumber()
  cash: number;

  @IsString()
  @MaxLength(100)
  cheque: string;

  @IsNumber()
  credit: number;

  @IsNumber()
  debit: number;
}
