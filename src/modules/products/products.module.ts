import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from 'src/entities/products';

@Module({
  imports: [MikroOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
