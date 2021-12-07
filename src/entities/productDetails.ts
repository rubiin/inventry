import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from './baseEntity';
import { Product } from './products';
@Entity()
export class ProductDetail extends BaseEntity {
  @Property({
    length: 50,
  })
  name: string;

  @Property()
  price: number;

  @ManyToOne({
    entity: () => Product,
    onUpdateIntegrity: 'cascade',
    onDelete: 'cascade',
  })
  product!: Product;
}
