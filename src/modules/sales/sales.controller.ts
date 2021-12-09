import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter, editFileName, paginate } from 'src/utils/helpers';
import { ListQueryBaseDto } from 'src/common/dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto) {

    console.log(createSaleDto);
    const data = await this.salesService.create(createSaleDto);

    return { message: 'Sale has been created!', data };
  }

  @Get()
  async findAll(@Query() listQuery: ListQueryBaseDto) {
    const { pages, total, product } = await this.salesService.findAll(
      listQuery,
    );
    return {
      message: 'Sales',
      ...paginate(pages, listQuery.page, total, product),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.salesService.findOne(+id);

    return { message: 'Sale details', data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    const data = await this.salesService.update(+id, updateSaleDto);

    return { message: 'Sales', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.salesService.remove(+id);

    return { message: 'Products', data };
  }
}
