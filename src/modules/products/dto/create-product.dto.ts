import { IsNumber, MaxLength, IsString, IsNumberString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  description: string;

  @IsNumberString({
    no_symbols: false,
  })
  price: number;

  @IsNumberString({
    no_symbols: false,
  })
  quantity: number;
}
