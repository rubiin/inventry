import { IsArray, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateSaleDto {
  @IsNumberString()
  cashReturned: number;

  @IsNumberString()
  total: number;

  @IsNumberString()
  cashReceived: number;

  @IsString()
  clientName: string;

  @IsString()
  clientAddress: string;

  @IsArray()
  items: any[];
}
