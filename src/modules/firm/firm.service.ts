import { EntityRepository, QueryOrder, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ListQueryBaseDto } from 'src/common/dto';
import { Firm } from 'src/entities/firm';
import { CreateFirmDto } from './dto/create-firm.dto';
import { UpdateFirmDto } from './dto/update-firm.dto';

@Injectable()
export class FirmService {
  constructor(
    @InjectRepository(Firm)
    private readonly firmRepository: EntityRepository<Firm>,
  ) {}

  async create(dto: CreateFirmDto) {
    const firmExist = await this.firmRepository.findOne({
      supplierName: dto.supplierName,
    });
    if (firmExist)
      throw new BadRequestException('Firm with name already exists');

    const newFirm = this.firmRepository.create(dto);
    await this.firmRepository.persistAndFlush(newFirm);

    return newFirm;
  }

  async findAll(listQuery: ListQueryBaseDto) {
    const { limit, search, page } = listQuery;

    const offset = limit * (page - 1);

    let product: Firm[], total: number;

    if (search) {
      [product, total] = await this.firmRepository.findAndCount(
        { supplierName: search },
        { limit, offset, orderBy: { createdAt: QueryOrder.ASC } },
      );
    } else {
      [product, total] = await this.firmRepository.findAndCount(
        {},
        { limit, offset, orderBy: { createdAt: QueryOrder.ASC } },
      );
    }

    const pages = Math.ceil(total / limit);

    return { pages, total, product };
  }

  async getOne(id: number) {
    const firm = await this.firmRepository.findOne({ id });

    if (!firm) throw new NotFoundException('Firm does not exists');

    return firm;
  }

  findOne(id: number) {
    return this.getOne(id);
  }

  async update(id: number, dto: UpdateFirmDto) {
    const firm = await this.getOne(id);
    wrap(firm).assign(dto);
    await this.firmRepository.flush();
    return firm;
  }

  async remove(id: number) {
    await this.getOne(id);
    return this.firmRepository.nativeDelete({ id });
  }
}
