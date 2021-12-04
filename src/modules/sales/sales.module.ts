import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Sales } from 'src/entities/sales';
import { Product } from 'src/entities/products';

@Module({
  imports: [MikroOrmModule.forFeature([Sales, Product])],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
