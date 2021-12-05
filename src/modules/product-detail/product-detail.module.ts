import { Module } from '@nestjs/common';
import { ProductDetailService } from './product-detail.service';
import { ProductDetailController } from './product-detail.controller';
import { ProductDetail } from 'src/entities/productDetails';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([ProductDetail])],
  controllers: [ProductDetailController],
  providers: [ProductDetailService],
})
export class ProductDetailModule {}
