import {
  BeforeCreate,
  BeforeUpdate,
  Entity,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { hashString } from '../utils/helpers';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property({
    length: 50,
  })
  firstName: string;

  @Property({
    length: 50,
    nullable: true,
  })
  middleName?: string;

  @Property({
    length: 50,
  })
  lastName: string;

  @Property({
    length: 60,
    unique: true,
  })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Property()
  password: string;

  @BeforeCreate()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await hashString(this.password);
  }

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
