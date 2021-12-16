import { Module } from '@nestjs/common';
import { DamagedProductService } from './damaged-product.service';
import { DamagedProductController } from './damaged-product.controller';
import { DamageProduct } from '../../entities/damagedProduct';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from '../../entities/products';

@Module({
  imports: [MikroOrmModule.forFeature([DamageProduct, Product])],
  controllers: [DamagedProductController],
  providers: [DamagedProductService],
})
export class DamagedProductModule {}
