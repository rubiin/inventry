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
import { ProductDetailService } from './product-detail.service';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { ListQueryBaseDto } from 'src/common/dto';
import { paginate } from 'src/utils/helpers';

@Controller('product-detail')
export class ProductDetailController {
  constructor(private readonly productDetailService: ProductDetailService) {}

  @Post()
  create(@Body() createProductDetailDto: CreateProductDetailDto) {
    return this.productDetailService.create(createProductDetailDto);
  }

  @Get()
  async findAll(@Query() listQuery: ListQueryBaseDto) {
    console.log(listQuery);
    const { pages, total, product } = await this.productDetailService.findAll(
      listQuery,
    );
    return {
      message: 'Product detail',
      ...paginate(pages, listQuery.page, total, product),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.productDetailService.findOne(+id);

    return { message: 'Expense', data };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDetailDto: UpdateProductDetailDto,
  ) {
    console.log(updateProductDetailDto);
    const data = await this.productDetailService.update(
      +id,
      updateProductDetailDto,
    );

    return { message: 'Expense', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.productDetailService.remove(+id);

    return { message: 'Expense', data };
  }
}
