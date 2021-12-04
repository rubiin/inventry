import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from './baseEntity';
import { Sales } from './sales';

@Entity()
export class Bill extends BaseEntity {
  @Property({
    length: 250,
  })
  image: string;

  @OneToOne(() => Sales, (sale) => sale.bill, {
    owner: true,
    orphanRemoval: true,
  })
  sale!: Sales;
}
