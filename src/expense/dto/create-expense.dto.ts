import { IsNumber,IsString ,MaxLength} from "class-validator";

export class CreateExpenseDto {

  @IsString()
  @MaxLength(100)
  type: string;

  @IsNumber()
  cost: number;

}
