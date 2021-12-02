import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { BaseEntity } from './baseEntity';
import { Product } from './products';

@Entity()
export class Sales extends BaseEntity {
  @Property()
  quantity: number;

  @Property()
  price: number;

  @Property({ nullable: true })
  discount?: number;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Property({ nullable: true })
  vat?: number;
}
