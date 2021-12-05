import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ListQueryBaseDto } from 'src/common/dto';
import { paginate } from 'src/utils/helpers';
import { DamagedProductService } from './damaged-product.service';
import { CreateDamagedProductDto } from './dto/create-damaged-product.dto';

@Controller('damaged-product')
export class DamagedProductController {
  constructor(private readonly damagedProductService: DamagedProductService) {}

  @Post()
  create(@Body() createDamagedProductDto: CreateDamagedProductDto) {
    return this.damagedProductService.create(createDamagedProductDto);
  }

  @Get()
  async findAll(@Query() listQuery: ListQueryBaseDto) {
    const { pages, total, product } = await this.damagedProductService.findAll(
      listQuery,
    );
    return {
      message: 'Product detail',
      ...paginate(pages, listQuery.page, total, product),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.damagedProductService.findOne(+id);

    return { message: 'Damaged product', data };
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.damagedProductService.remove(+id);

    return { message: 'Damaged product', data };
  }
}
