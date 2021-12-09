import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Sales } from 'src/entities/sales';
import { Product } from 'src/entities/products';
import { ProductDetail } from 'src/entities/productDetails';
import { Bill } from 'src/entities/bills';

@Module({
  imports: [MikroOrmModule.forFeature([Sales, Product, Bill, ProductDetail])],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
