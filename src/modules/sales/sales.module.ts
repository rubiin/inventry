import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Sales } from 'src/entities/sales';

@Module({
  imports: [MikroOrmModule.forFeature([Sales])],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
