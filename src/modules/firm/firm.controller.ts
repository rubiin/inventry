import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FirmService } from './firm.service';
import { CreateFirmDto } from './dto/create-firm.dto';
import { UpdateFirmDto } from './dto/update-firm.dto';
import { ListQueryBaseDto } from '../../common/dto';
import { paginate } from '../../utils/helpers';
import { JwtAuthGuard } from '../../common/jwt.guard';

@Controller('firm')
@UseGuards(JwtAuthGuard)
export class FirmController {
  constructor(private readonly firmService: FirmService) {}

  @Post()
  create(@Body() createFirmDto: CreateFirmDto) {
    return this.firmService.create(createFirmDto);
  }

  @Get()
  async findAll(@Query() listQuery: ListQueryBaseDto) {
    const { pages, total, product } = await this.firmService.findAll(listQuery);
    return {
      message: 'Firm',
      ...paginate(pages, listQuery.page, total, product),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.firmService.findOne(+id);

    return { message: 'Firm details', data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFirmDto: UpdateFirmDto) {
    const data = await this.firmService.update(+id, updateFirmDto);

    return { message: 'Firm', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.firmService.remove(+id);

    return { message: 'Firm', data };
  }
}
