import { Transform } from "class-transformer";
import { IsOptional, IsNumber, IsString } from "class-validator";

export class ListQueryBaseDto {
	@IsOptional()
	@Transform(({ value }) => Number(value), { toClassOnly: true })
	@IsNumber()
	page = 1;

	@IsOptional()
	@Transform(({ value }) => Number(value), { toClassOnly: true })
	@IsNumber()
	limit = 10;

	@IsOptional()
	@IsString()
	search = '';

}