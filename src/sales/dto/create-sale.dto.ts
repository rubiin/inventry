import { IsNumber, IsOptional } from "class-validator";

export class CreateSaleDto {
  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNumber()
  discount: number;

  @IsOptional()
  @IsNumber()
  vat: number;


}
