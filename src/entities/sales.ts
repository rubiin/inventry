import { Collection, Entity, ManyToMany, ManyToOne, OneToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './baseEntity';
import { Bill } from './bills';
import { Product } from './products';

@Entity()
export class Sales extends BaseEntity {
  @Property()
  quantity: number;

  @Property()
  price: number;

  @Property({ nullable: true })
  discount?: number;

  @ManyToMany(() => Product)
  books1 = new Collection<Product>(this);

  @OneToOne(() => Bill, (bill) => bill.sale, {
    onDelete: 'cascade',
    nullable: true,
  })
  bill!: Bill;

  @Property({ nullable: true })
  vat?: number;
}
