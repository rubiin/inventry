import { IsString, MaxLength, IsNumber } from 'class-validator';

export class CreateProductDetailDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNumber()
  price: number;
}
