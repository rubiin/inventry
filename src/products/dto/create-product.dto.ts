import { IsNumber, MaxLength, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;
}
