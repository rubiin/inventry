import {
  BeforeCreate,
  BeforeUpdate,
  Entity,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

@Entity()
export class Expenses {
  @PrimaryKey()
  id!: number;

  @Property()
  cost: number;

  @Property({
    length: 250,
  })
  type: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
