import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Product } from './products';

@Entity()
export class DamageProduct {
  @PrimaryKey()
  id!: number;

  @Property({ defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

  @Property({ length: 50 })
  name!: string;

  @Property()
  quantity!: number;

  @ManyToOne({
    entity: () => Product,
    onUpdateIntegrity: 'cascade',
    onDelete: 'cascade',
  })
  product!: Product;
}
