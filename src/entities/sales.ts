import {
  BeforeCreate,
  BeforeUpdate,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Product } from './products';

@Entity()
export class Sales {
  @PrimaryKey()
  id!: number;

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

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
