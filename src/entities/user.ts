import {
  BeforeCreate,
  BeforeUpdate,
  Entity,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { hashString } from '../utils/helpers';
import { BaseEntity } from './baseEntity';

@Entity()
export class User extends BaseEntity {
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
}
