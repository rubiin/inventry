import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
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
}
