import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from './baseEntity';
import { Sales } from './sales';

@Entity()
export class Product extends BaseEntity {
  @Property({
    length: 50,
  })
  name: string;

  @Property({
    length: 250,
  })
  description: string;

  @Property({
    length: 250,
  })
  image: string;

  @Property()
  quantity: number;

  @Property()
  price: number;

  @OneToMany(() => Sales, (sale) => sale.product, {
    orphanRemoval: true,
  })
  sales = new Collection<Sales>(this);
}
