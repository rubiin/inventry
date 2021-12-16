import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from '../../entities/products';
import { Sales } from '../../entities/sales';

@Module({
  imports: [MikroOrmModule.forFeature([Product, Sales])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
