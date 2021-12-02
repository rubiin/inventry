import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { Bill } from 'src/entities/bills';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([Bill])],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
