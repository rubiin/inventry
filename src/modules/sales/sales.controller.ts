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
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async create(
    @Body() createSaleDto: CreateSaleDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const data= await this.salesService.create(createSaleDto, image.filename);

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
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateSaleDto: UpdateSaleDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const data = await this.salesService.update(+id, updateSaleDto,image?.filename);

    return { message: 'Sales', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.salesService.remove(+id);

     return { message: 'Products', data };
  }
}
