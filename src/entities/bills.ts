import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from './baseEntity';
import { Firm } from './firm';

@Entity()
export class Bill extends BaseEntity {
  @Property()
  firmId: number;

  @Property({
    length: 250,
  })
  image: string;

  @ManyToOne(() => Firm, { eager: true })
  firm: Firm;
}
