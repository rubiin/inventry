import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter, editFileName, paginate } from 'src/utils/helpers';
import { ListQueryBaseDto } from 'src/common/dto';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

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
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const data = await this.productsService.create(
      createProductDto,
      image.filename,
    );

    return { message: 'Product has been created!', data };
  }

  @Get()
  async findAll(@Query() listQuery: ListQueryBaseDto) {
    const { pages, total, product } = await this.productsService.findAll(
      listQuery,
    );
    return { message: 'Products', ...paginate(pages,listQuery.page, total, product) };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.productsService.findOne(+id);

    return { message: 'Product details', data };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const data = await this.productsService.update(+id, updateProductDto);

    return { message: 'Products', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.productsService.remove(+id);

    return { message: 'Products', data };
  }
}
