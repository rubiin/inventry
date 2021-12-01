import {
  BeforeCreate,
  BeforeUpdate,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { hashString } from '../utils/helpers';
import { Sales } from './sales';

@Entity()
export class Product {
  @PrimaryKey()
  id!: number;

  @Property({
    length: 50,
  })
  name: string;

  @Property({
    length: 250,
  })
  description: string;

  @Property()
  quantity: number;

  @Property()
  price: number;

  @OneToMany(() => Sales, (sale) => sale.product, {
    eager: true,
    orphanRemoval: true,
  })
  sales = new Collection<Sales>(this);

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
