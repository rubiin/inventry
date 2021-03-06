import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Sales } from '../../entities/sales';
import { Product } from '../../entities/products';
import { ProductDetail } from '../../entities/productDetails';
import { Bill } from '../../entities/bills';

@Module({
  imports: [MikroOrmModule.forFeature([Sales, Product, Bill, ProductDetail])],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
