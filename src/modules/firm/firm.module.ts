import { Module } from '@nestjs/common';
import { FirmService } from './firm.service';
import { FirmController } from './firm.controller';
import { Firm } from 'src/entities/firm';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([Firm])],
  controllers: [FirmController],
  providers: [FirmService],
})
export class FirmModule {}
