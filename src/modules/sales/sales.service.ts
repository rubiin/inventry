import {
  EntityManager,
  EntityRepository,
  LoadStrategy,
  MikroORM,
  QueryOrder,
  wrap,
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ListQueryBaseDto } from 'src/common/dto';
import { Bill } from 'src/entities/bills';
import { Product } from 'src/entities/products';
import { Sales } from 'src/entities/sales';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
    @InjectRepository(Bill)
    private readonly billRepository: EntityRepository<Bill>,
    @InjectRepository(Sales)
    private readonly salesRepository: EntityRepository<Sales>,
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}

  async create(dto: CreateSaleDto) {
    const sale = new Sales();
    sale.clientName = dto.clientName;
    sale.clientAddress = dto.clientAddress;
    sale.cashReceived = dto.cashReceived;
    sale.cashReturned = dto.cashReturned;
    sale.total = dto.total;
    await this.orm.em.transactional(async (em) => {
      await em.persistAndFlush(sale);

      const billsArray: Bill[] = dto.items.map((item) => {
        const bill = new Bill();
        bill.productDetail = item.id;
        bill.quantity = item.quantity;
        bill.ratePer = item.ratePer;
        bill.vat = item.vat;
        bill.amount = item.amount;
        bill.sale = sale;
        return bill;
      });
      await em.persistAndFlush(billsArray);
    });

    return sale;
  }

  async getOneProduct(id: number) {
    const product = await this.productRepository.findOne({ id });

    if (!product) throw new NotFoundException('Product does not exists');

    return product;
  }

  async findAll(listQuery: ListQueryBaseDto) {
    const { limit, search, page } = listQuery;

    const offset = limit * (page - 1);

    let product: any[], total: number;

    if (search) {
      [product, total] = await this.salesRepository.findAndCount(
        { id: +search },
        {
          limit,
          offset,
          orderBy: { createdAt: QueryOrder.ASC },
        },
      );
    } else {
      [product, total] = await this.salesRepository.findAndCount(
        {},
        {
          limit,
          offset,
          orderBy: { createdAt: QueryOrder.ASC },
        },
      );
    }

    const pages = Math.ceil(total / limit);

    return { pages, total, product };
  }

  async getOne(id: number) {
    const user = await this.salesRepository.findOne(id, ['bills']);

    if (!user) throw new NotFoundException('Sales does not exists');

    return user;
  }

  findOne(id: number) {
    return this.getOne(id);
  }

  async update(id: number, dto: UpdateSaleDto) {
    const sales = await this.getOne(id);
    wrap(sales).assign(dto);
    await this.salesRepository.flush();
    return sales;
  }

  async remove(id: number) {
    return this.salesRepository.nativeDelete({ id });
  }
}
