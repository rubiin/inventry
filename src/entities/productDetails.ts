import {
  Collection,
  Entity,
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

  @OneToOne(() => Product, (product) => product.productDetail, {
    onDelete: 'cascade',
  })
  product!: Product;
}
