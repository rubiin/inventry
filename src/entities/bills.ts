import {
  BeforeCreate,
  BeforeUpdate,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Firm } from './firm';

@Entity()
export class Bill {
  @PrimaryKey()
  id!: number;

  @Property()
  firmId: number;

  @Property({
    length: 250,
  })
  image: string;

  @ManyToOne(() => Firm, { eager: true })
  firm: Firm;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
