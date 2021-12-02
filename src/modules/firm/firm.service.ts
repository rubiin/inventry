import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
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
    const newFirm = this.firmRepository.create(dto);
    await this.firmRepository.persistAndFlush(newFirm);

    return newFirm;
  }

  async findAll() {
    return await this.firmRepository.findAll();
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
    return this.firmRepository.nativeDelete({ id });
  }
}
