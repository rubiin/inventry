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
import { Bill } from './bills';

@Entity()
export class Firm {
  @PrimaryKey()
  id!: number;

  @Property({
    length: 50,
  })
  phone: string;

  @Property({
    length: 50,
  })
  address: string;

  @Property({
    length: 60,
    unique: true,
  })
  email: string;

  @OneToMany(() => Bill, (bill) => bill.firm, {
    eager: true,
    orphanRemoval: true,
  })
  sales = new Collection<Bill>(this);

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
