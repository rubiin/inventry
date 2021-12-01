import {
  Entity,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from './baseEntity';

@Entity()
export class Expenses extends BaseEntity {
  @Property()
  cost: number;

  @Property({
    length: 250,
  })
  type: string;
}
