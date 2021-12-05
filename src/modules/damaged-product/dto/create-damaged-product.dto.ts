import { IsNumberString, IsString, MaxLength } from 'class-validator';

export class CreateDamagedProductDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNumberString()
  quantity: number;

  @IsNumberString()
  product!: number;
}
