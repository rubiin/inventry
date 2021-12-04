import {  IsNumberString, IsOptional } from 'class-validator';

export class CreateSaleDto {
  @IsNumberString()
  price: number;

  @IsNumberString()
  quantity: number;

  @IsOptional()
  @IsNumberString()
  discount: number;

  @IsOptional()
  @IsNumberString()
  vat: number;

  @IsNumberString()
  product: number;
}
