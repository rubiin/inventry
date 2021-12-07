import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from './baseEntity';
import { ProductDetail } from './productDetails';
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
  image: string;

  @Property()
  quantity: number;

  @Property()
  price: number;
}
