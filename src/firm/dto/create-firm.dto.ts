import { IsString, MaxLength, IsOptional, IsEmail } from 'class-validator';

export class CreateFirmDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  phone: string;

  @IsString()
  @MaxLength(255)
  address: string;

  @IsEmail()
  @MaxLength(100)
  email: string;
}
