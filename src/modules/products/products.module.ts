import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from 'src/entities/products';
import { Sales } from 'src/entities/sales';

@Module({
  imports: [MikroOrmModule.forFeature([Product, Sales])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
