import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from './baseEntity';
import { ProductDetail } from './productDetails';
import { Product } from './products';
import { Sales } from './sales';

@Entity()
export class Bill extends BaseEntity {
  @Property()
  quantity: number;

  @Property()
  ratePer: string;

  @Property()
  vat: number;

  @Property()
  discount: number;

  @Property()
  amount: number;

  @ManyToOne({
    entity: () => ProductDetail,
    onUpdateIntegrity: 'cascade',
    onDelete: 'cascade',
  })
  productDetail!: ProductDetail;

  

  @ManyToOne({
    entity: () => Sales,
    onUpdateIntegrity: 'cascade',
    onDelete: 'cascade',
  })
  sale!: Sales;
}
