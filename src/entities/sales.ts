import {
  Collection,
  Entity,
  LoadStrategy,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from './baseEntity';
import { Bill } from './bills';
import { Product } from './products';

@Entity()
export class Sales extends BaseEntity {
  @Property()
  clientName: string;

  @Property()
  clientAddress: string;

  @Property()
  total: number;

  @Property()
  cashReceived: number;

  @Property()
  cashReturned: number;

  @OneToMany({
    entity: () => Bill,
    mappedBy: 'sale',
    nullable: true,
  })
  bills = new Collection<Bill>(this);
}
